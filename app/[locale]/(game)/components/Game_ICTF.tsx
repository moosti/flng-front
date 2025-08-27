"use client";
import { useTranslations } from "next-intl";
import UseTransformCard from "./UseTransformCard";
import { Indicator } from "@/components/Indicator/Indicator";
import Image from "next/image";
import AudioButton from "@/app/components/buttons/AudioButton";
import { useEffect, useState, useTransition } from "react";
import ExitAnimation from "./AnswersCardAnimation";
import { question } from "@/types/game/RepetitiveGameTyping";
import { ICTFGameType } from "@/types/game/ICTFGameType";
import { CheckAnswerICFTGameType } from "../utils/CheckAnswerICFTGameType";
import { motion } from "framer-motion";

type Props = {
  gameData: question<ICTFGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
};

export default function Game_ICTF({ gameData, updateGameState }: Props) {
  const t = useTranslations("game");
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [correct, setCorrect] = useState(true);

  useEffect(() => {
    if (!openCard) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
    return () => {};
  }, [openCard]);

  const handleConfirm = (answer: boolean) => {
    startTransition(async () => {
      const checkAnswer = CheckAnswerICFTGameType({
        selectAnswer: answer,
        answer: gameData.game_content.content.answer === "درست" ? true : false,
      });

      if (checkAnswer === "correct") {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setOpenCard(true);
    });
  };

  return (
    <div className="w-full h-full overflow-hidden grid grid-col-1 grid-rows-12 gap-8 px-5">
      <div className="row-span-2 flex justify-center items-center gap-4">
        <h2>{t("game_type_ICTF")}</h2>
      </div>

      <div
        className="relative row-span-10 max-w-lg w-full mx-auto group"
        dir="rtl"
      >
        <h4 className="absolute -top-8 right-0 left-0 group-hover:opacity-100 group-focus:opacity-100 opacity-0 bg-amber-300 transition-all duration-200 ease-in-out w-fit p-2 mx-auto rounded-2xl mb-5">
          {t("swipe_right_or_left")}
        </h4>
        <Indicator
          bg_color="bg-transparent"
          className="-top-10 start-4 sm:-start-8 flex justify-center items-center flex-col gap-2 "
        >
          <h3 className="text-accent">{t("true")}</h3>
          <Image
            src="/svg/game/arrow-true.svg"
            alt="arrow-true"
            width={50}
            height={30}
          />
        </Indicator>
        <Indicator
          bg_color="bg-transparent"
          className="-top-10 end-4 sm:-end-8 flex justify-center items-center flex-col gap-2"
        >
          <h3 className="text-error">{t("false")}</h3>
          <Image
            src="/svg/game/arrow-false.svg"
            alt="arrow-false"
            width={50}
            height={30}
          />
        </Indicator>
        <UseTransformCard
          onDrag={(e) => {
            handleConfirm(e);
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className={`ring-4 relative w-full h-full flex justify-around items-center flex-col gap-5  rounded-2xl ${
              openCard
                ? correct
                  ? "ring-success"
                  : "ring-error"
                : "ring-disable/20"
            }  p-2 cursor-grab`}
          >
            {!isPending ? (
              <>
                <div className="flex justify-center items-center gap-3">
                  <h4 className="bg-base-card w-fit p-2 mx-auto rounded-2xl">
                    {gameData.game_question}
                  </h4>
                  {gameData.game_attachments &&
                    gameData.game_attachments?.voice && (
                      <AudioButton
                        audioSrc={gameData.game_attachments?.voice?.path}
                      />
                    )}
                </div>
                <div className="w-full relative flex justify-center items-center h-50">
                  {gameData.game_attachments &&
                    gameData.game_attachments?.image && (
                      <Image
                        src={gameData.game_attachments?.image?.path}
                        alt={gameData.game_attachments?.image?.title}
                        fill
                        className="object-contain"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    )}
                </div>
              </>
            ) : (
              <div className="bg-disable/30 skeleton" />
            )}
          </motion.div>
        </UseTransformCard>
      </div>
      <ExitAnimation
        correct={correct}
        isVisible={openCard}
        onClick={() => {
          updateGameState(correct, gameData.game_id, elapsedTime);
        }}
      />
    </div>
  );
}
