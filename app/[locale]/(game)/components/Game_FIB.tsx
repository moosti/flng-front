"use client";

import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
import ExitAnimation from "./AnswersCardAnimation";
import _ from "lodash";
import { ConfirmBtn } from "./ConfirmBtn";
import { question } from "@/types/game/RepetitiveGameTyping";
import { choices, FIBGameType, questionWords } from "@/types/game/FIBGameType";
import { motion } from "framer-motion";

interface choicesType {
  id: string;
  text: string;
}

interface Props {
  gameData: question<FIBGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
}

export default function Game_FIB({ gameData, updateGameState }: Props) {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [currentPhrase, setCurrentPhrase] = useState<questionWords[]>([]);
  const [availableAnswers, setAvailableAnswers] = useState<choices[]>([]);
  const [allBlanksFilled, setAllBlanksFilled] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let timer: NodeJS.Timeout;

    if (!openCard) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [openCard]);

  useEffect(() => {
    const allChoices = _.compact(
      _.map(
        _.filter(
          gameData.game_content.content.phrase,
          (item) => item.blank !== null
        ),
        ({ id, blank }) => ({ id, text: blank || "" })
      )
    );

    const transformedQuestionWords = gameData.game_content.content.phrase.map(
      (item) => ({
        id: item.id,
        text: item.text,
        correctAnswer: item.blank || "",
        blank: null,
        blank_id: null,
      })
    );
    setCurrentPhrase(transformedQuestionWords);
    setAvailableAnswers(
      _.concat(allChoices, gameData.game_content.content.extraAnswers)
    );
  }, []);

  useEffect(() => {
    const allFilled = currentPhrase.every(
      (item) => item.text !== null || item.blank !== null
    );
    setAllBlanksFilled(allFilled);
  }, [currentPhrase]);

  const handleAnswerClick = (answer: choicesType) => {
    const emptyBlankIndex = currentPhrase.findIndex(
      (item) => item.text === null && item.blank === null
    );

    if (emptyBlankIndex !== -1) {
      const updatedPhrase = [...currentPhrase];
      updatedPhrase[emptyBlankIndex] = {
        ...updatedPhrase[emptyBlankIndex],
        blank: answer.text,
        blank_id: answer.id,
      };

      setCurrentPhrase(updatedPhrase);
      setAvailableAnswers(availableAnswers.filter((a) => a.id !== answer.id));
    }
  };

  const handleBlankClick = (index: number) => {
    if (currentPhrase[index].blank) {
      const removedAnswer = {
        id: Date.now().toString(),
        text: currentPhrase[index].blank!,
      };

      const updatedPhrase = [...currentPhrase];
      updatedPhrase[index] = {
        ...updatedPhrase[index],
        blank: null,
      };

      setCurrentPhrase(updatedPhrase);
      setAvailableAnswers([...availableAnswers, removedAnswer]);
    }
  };

  const handleConfirm = async () => {
    startTransition(async () => {
      const isValid = currentPhrase.every((item) => {
        if (item.text === null) {
          return item.blank === item.correctAnswer;
        }
        return true;
      });
      setCorrect(isValid);
      setOpenCard(true);
    });
  };

  return (
    <div className="w-full h-full grid grid-col-1 grid-rows-12 gap-10 px-5">
      <h2 className="row-span-1 text-center">{gameData.game_question}</h2>

      {gameData.game_attachments?.image && (
        <div className="row-span-3 relative flex justify-center items-center">
          <Image
            src={gameData.game_attachments?.image.path}
            alt={gameData.game_attachments?.image.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="flex justify-center items-center row-span-3 gap-3 flex-wrap">
        {currentPhrase.map((phraseItem, phraseIndex) => {
          if (phraseItem.text === null) {
            return (
              <div
                key={phraseIndex}
                className="flex justify-center items-center flex-col"
              >
                <div
                  className={`p-1 rounded-4xl transition-all duration-300 ease-in-out ${
                    phraseItem.blank
                      ? openCard
                        ? !correct &&
                          phraseItem.blank !== phraseItem.correctAnswer
                          ? "bg-error"
                          : "bg-success"
                        : "bg-info-content"
                      : "bg-disable/20"
                  }`}
                >
                  <button
                    className={`min-w-20 px-2 w-auto  h-10 rounded-4xl flex justify-center items-center cursor-pointer bg-base-card ${
                      phraseItem.blank && "shadow-card-xs"
                    }`}
                    onClick={() => handleBlankClick(phraseIndex)}
                  >
                    <h4>{phraseItem.blank || "-----"}</h4>
                  </button>
                </div>
                {openCard &&
                  !correct &&
                  phraseItem.blank !== phraseItem.correctAnswer && (
                    <h4 className="text-success mt-2">
                      {phraseItem.correctAnswer}
                    </h4>
                  )}
              </div>
            );
          }

          return <h3 key={phraseIndex}>{phraseItem.text}</h3>;
        })}
      </div>

      <div className="flex justify-center items-center row-span-3 gap-5 flex-wrap">
        {availableAnswers.map((extraAnswersItem, extraAnswersIndex) => {
          return (
            <motion.div
              key={extraAnswersIndex}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: extraAnswersIndex / availableAnswers.length + 0.02,
              }}
            >
              <div
                className={`p-1 rounded-2xl transition-all duration-200 ease-in-out bg-disable/20`}
              >
                <button
                  className={`min-w-20 px-2 w-auto  h-14 rounded-2xl flex justify-center items-center cursor-pointer bg-base-card `}
                  onClick={() => handleAnswerClick(extraAnswersItem)}
                >
                  <h3>{extraAnswersItem.text}</h3>
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
            disabled={!allBlanksFilled}
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
