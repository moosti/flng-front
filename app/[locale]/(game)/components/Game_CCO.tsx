"use client";

import ExitAnimation from "@/app/[locale]/(game)/components/AnswersCardAnimation";
import AudioButton from "@/app/components/buttons/AudioButton";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { ConfirmBtn } from "./ConfirmBtn";
import { question } from "@/types/game/RepetitiveGameTyping";
import { CCOGameType } from "@/types/game/CCOGameType";
import { CheckAnswerCCOGameType } from "../utils/CheckAnswerCCOGameType";
import { shuffleWithoutOriginalOrder } from "@/app/utils/utils";
import { motion } from "framer-motion";

type Props = {
  gameData: question<CCOGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
};

type PropsSelected = {
  index: number;
  id: string;
};

export default function Game_CCO({ gameData, updateGameState }: Props) {
  const [selected, setSelected] = useState<PropsSelected[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [correct, setCorrect] = useState(false);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [answerId] = useState<string[]>(
    gameData.game_content.content.trueAnswer.map(
      (item) => gameData.game_content.content.choices[item]?.id
    )
  );

  const [shuffledData] = useState(() =>
    shuffleWithoutOriginalOrder(gameData.game_content.content.choices)
  );

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

  const handleSelect = (index: number, id: string) => {
    setSelected((prevSelected) => {
      if (gameData.game_content.content.isMultipleChoice) {
        const exists = prevSelected.find(
          (item) => item.index === index && item.id === id
        );
        if (exists) {
          return prevSelected.filter(
            (item) => item.index !== index || item.id !== id
          );
        } else {
          return [...prevSelected, { index, id }];
        }
      } else {
        return prevSelected.some(
          (item) => item.index === index && item.id === id
        )
          ? []
          : [{ index, id }];
      }
    });
  };

  const handleConfirm = () => {
    const reqData = selected.map((item) => item.id);
    startTransition(async () => {
      const checkAnser = CheckAnswerCCOGameType({
        selectAnswer: reqData,
        answer: gameData.game_content.content.trueAnswer.map(
          (item) => gameData.game_content.content.choices[item].id
        ),
      });

      if (checkAnser === "correct") {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setOpenCard(true);
    });
  };

  return (
    <div className="w-full h-full overflow-hidden grid grid-col-1 grid-rows-12 gap-5 px-5">
      <div className="row-span-2 flex justify-center items-center gap-4">
        <h2>{gameData.game_question}</h2>
        {gameData.game_attachments?.voice && (
          <AudioButton audioSrc={gameData.game_attachments.voice.path} />
        )}
      </div>

      {gameData.game_attachments?.image && (
        <div className="row-span-3 sm:row-span-4 relative flex justify-center items-center">
          <Image
            src={gameData.game_attachments?.image.path}
            alt={gameData.game_attachments?.image.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="row-span-5 sm:row-span-4 gap-10 grid grid-cols-4 max-w-4xl w-full mx-auto">
        {shuffledData.map((choicesItem, choicesIndex) => {
          const isSelected = selected.some(
            (item) => item.index === choicesIndex && item.id === choicesItem.id
          );

          return (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: choicesIndex / shuffledData.length + 0.05,
              }}
              key={choicesIndex}
              className="col-span-2 lg:col-span-1"
            >
              <div
                className={`w-full h-full p-2 rounded-2xl transition-all ease-linear duration-300  ${
                  isSelected
                    ? openCard
                      ? correct
                        ? "bg-success"
                        : _.includes(answerId, choicesItem.id)
                        ? "bg-success"
                        : "bg-error"
                      : "bg-info"
                    : openCard
                    ? !correct
                      ? _.includes(answerId, choicesItem.id)
                        ? "bg-success"
                        : "bg-disable/20"
                      : "bg-disable/20"
                    : "bg-disable/20"
                }`}
              >
                <button
                  className={`w-full h-full relative rounded-2xl flex justify-center items-center ${
                    isSelected && "shadow-card-sm"
                  } cursor-pointer bg-base-card`}
                  onClick={() => handleSelect(choicesIndex, choicesItem.id)}
                >
                  <h3>{choicesItem.text}</h3>
                  {choicesItem?.image && (
                    <Image
                      src={choicesItem.image.path}
                      alt={choicesItem.image.title}
                      fill
                      className="object-contain"
                    />
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {!openCard && (
        <div className="row-span-2 w-full absolute bottom-4 flex justify-center items-center translate-x-5">
          <ConfirmBtn
            onClick={handleConfirm}
            loading={isPending}
            disabled={selected.length === 0}
          />
        </div>
      )}
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
