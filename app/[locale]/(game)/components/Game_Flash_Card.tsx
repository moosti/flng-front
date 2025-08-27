"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Icon from "@/app/components/base/Icon";
import Image from "next/image";
import AudioButton from "@/app/components/buttons/AudioButton";
import { useRouter } from "next/navigation";
import { ConfirmBtn } from "./ConfirmBtn";
import { updateStepState } from "../game/hook/updateStepState";
import { TransformedFlashcardType } from "@/types/game/flashcardType";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";

interface CardProps {
  card: TransformedFlashcardType;
  frontCard: boolean;
  index?: number;
  setIndex?: (index: number) => void;
  drag?: boolean | "x" | "y";
  cards: TransformedFlashcardType[];
}

function Card({
  card,
  frontCard,
  index,
  setIndex,
  drag = false,
  cards,
}: CardProps) {
  const [exitX, setExitX] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom: number) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    }),
  };

  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 0 },
    animate: { scale: 0.9, y: 30, opacity: 0.5 },
  };

  const handleDragEnd = (_: never, info: PanInfo) => {
    if (!setIndex || typeof index === "undefined") return;

    if (info.offset.x < -100) {
      setExitX(-250);
      setIndex(index + 1);
      const newCards = [...cards];
      const [removed] = newCards.splice(index, 1);
      newCards.push(removed);
    }
    if (info.offset.x > 100) {
      setExitX(250);
      setIndex(index + 1);
      const newCards = [...cards];
      const [removed] = newCards.splice(index, 1);
      newCards.push(removed);
    }
  };

  return (
    <motion.div
      className="w-full h-full "
      style={{
        position: "absolute",
        top: 0,
        x,
        rotate: frontCard ? rotate : 0,
        cursor: frontCard ? "grab" : "default",
      }}
      whileTap={{ cursor: "grabbing" }}
      drag={drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      variants={frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={
        frontCard
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
      }
      onClick={() => frontCard && setIsFlipped(!isFlipped)}
    >
      <motion.div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          scale,
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
          }}
          className="bg-base-card  w-full h-full rounded-xl  ring-4 ring-prime p-6 flex flex-col gap-5 items-center justify-center"
        >
          {card.question.question_title && (
            <h2 className="text-base-card-content text-center">
              {card.question.question_title}
            </h2>
          )}

          {card.question?.attachments?.voice && (
            <AudioButton audioSrc={card.question?.attachments.voice.path} />
          )}
          {card.question?.attachments?.image && (
            <div className="relative w-full h-full">
              <Image
                src={card.question?.attachments.image.path}
                alt={card.question?.attachments.image.title}
                fill
                className="object-contain"
                draggable={false}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            rotateY: 180,
          }}
          className="bg-base-card w-full h-full rounded-xl ring-4 ring-success p-6 flex items-center flex-col gap-5 justify-center"
        >
          {card.answer?.text && (
            <h3 className="text-base-card-content text-center">
              {card.answer.text}
            </h3>
          )}

          {card.answer?.image && (
            <div className="relative w-full h-full">
              <Image
                src={card.answer.image.path}
                alt={card.answer.image.title}
                fill
                className="object-contain"
                draggable={false}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Game_Flash_Card({
  cards,
}: {
  cards: TransformedFlashcardType[];
}) {
  const router = useRouter();
  const t = useTranslations("game");
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full h-full grid grid-col-1 grid-rows-12 gap-10">
      <h2 className="row-span-1 text-center">{t("flash_card")}</h2>
      <div className="row-span-2 flex justify-center items-center w-full gap-5 opacity-70">
        <div className="flex justify-center items-center gap-2">
          <p>{t("click_to_flip")}</p>
          <Icon size="sm" name="left_click" />
        </div>
        <div className="w-0.5 h-2/4 bg-disable rounded-4xl" />
        <div className="flex justify-center items-center gap-2">
          <p>{t("drag_cards")}</p>
          <Icon size="sm" name="drag_pan" />
        </div>
      </div>
      <motion.div
        className="max-w-96 w-full max-h-80 h-full mx-auto row-span-7"
        style={{ position: "relative" }}
      >
        <AnimatePresence initial={false}>
          <Card
            key={(index + 1) * 2}
            frontCard={false}
            card={cards[(index + 1) % cards.length]}
            cards={cards}
          />
          <Card
            key={index}
            frontCard={true}
            index={index}
            setIndex={setIndex}
            drag="x"
            card={cards[index % cards.length]}
            cards={cards}
          />
        </AnimatePresence>
      </motion.div>

      <div className="row-span-2 w-full absolute bottom-4 flex justify-center items-center translate-x-5">
        <ConfirmBtn
          onClick={async () => {
            if (cards[0].step_id === "review") {
              router.back();
              setTimeout(() => {
                router.refresh();
              }, 100);
            } else {
              await updateStepState({
                unit_id: cards[0].unit_id,
                lesson_id: cards[0].lesson_id,
                step_id: cards[0].step_id,
                newState: "completed",
                review: cards[0].step_id === "review",
              });
              await FetcherClientSide({
                url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/games/finish_flashcard/${cards[0].step_id}/`,
                method: "POST",
              });
              router.back();
              setTimeout(() => {
                router.refresh();
              }, 100);
            }
          }}
        />
      </div>
    </div>
  );
}
