"use client";

import { cn, shuffleWithoutOriginalOrder } from "@/utils/utils";
import Icon from "@/app/components/base/Icon";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import ExitAnimation from "./AnswersCardAnimation";
import _ from "lodash";
import { ConfirmBtn } from "./ConfirmBtn";
import Image from "next/image";
import { SBGameType } from "@/types/game/SBGameType";
import { question } from "@/types/game/RepetitiveGameTyping";
import { motion } from "framer-motion";

interface Props {
  gameData: question<SBGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
}

export default function Game_SB({ gameData, updateGameState }: Props) {
  const t = useTranslations("game");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [correct, setCorrect] = useState(false);
  const [selectedWords, setSelectedWords] = useState<
    { id: string; text: string }[]
  >([]);
  const [shuffledData] = useState(
    shuffleWithoutOriginalOrder(gameData.game_content.content.answers)
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

  const handleWordClick = (word: { id: string; text: string }) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const removeWord = (index: number) => {
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const resetSentence = () => {
    setSelectedWords([]);
  };

  const isWordSelected = (word: { id: string; text: string }) =>
    selectedWords.includes(word);

  const handleConfirm = () => {
    startTransition(async () => {
      if (_.isEqual(selectedWords, gameData.game_content.content.answers)) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setOpenCard(true);
    });
  };

  return (
    <div className="w-full h-full grid grid-col-1 grid-rows-12 gap-5 px-5">
      <h2 className="row-span-1 text-center">{gameData.game_question}</h2>

      {gameData.game_attachments?.image && (
        <div className="row-span-2 sm:row-span-4 relative flex justify-center items-center">
          <Image
            src={gameData.game_attachments?.image.path}
            alt={gameData.game_attachments?.image.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="row-span-4 sm:row-span-3 flex justify-center items-center gap-5 flex-col">
        <div className="flex justify-center items-center flex-wrap gap-2">
          {selectedWords.length > 0 ? (
            selectedWords.map((word, index) => (
              <div
                key={index}
                className={`flex justify-center items-center gap-1 border-3 ${
                  openCard
                    ? correct
                      ? "border-success"
                      : "border-error"
                    : "border-info-content"
                }  px-2 py-2 rounded-full`}
              >
                <h3>{word.text}</h3>
                <button
                  onClick={() => removeWord(index)}
                  className="hover:text-error flex justify-center items-start transition-colors cursor-pointer"
                >
                  <Icon size="sm" name="close" />
                </button>
              </div>
            ))
          ) : (
            <h5 className="text-base-card-content text-center w-full">
              {t("choose_the_words_to_make_sentence")}
            </h5>
          )}
        </div>
        {!openCard && selectedWords.length > 0 && (
          <button
            className="btn btn-neutral btn-outline"
            onClick={() => {
              resetSentence();
            }}
          >
            <h3 className="text-inherit">{t("clean")}</h3>
          </button>
        )}
        {openCard && !correct && (
          <div className="flex justify-center items-center flex-wrap gap-2">
            <h3>{t("correct_sentence")} :</h3>

            {gameData.game_content.content.answers.map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex  justify-center items-center gap-3 border-3 border-success px-4 py-2 rounded-full"
                >
                  <h3>{item.text}</h3>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!openCard && (
        <div className="row-span-3 sm:row-span-2 flex justify-center items-center flex-wrap gap-2">
          {shuffledData.map((word, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: index / shuffledData.length + 0.03,
              }}
            >
              <button
                onClick={() => handleWordClick(word)}
                disabled={isWordSelected(word)}
                className={cn(
                  "px-2 py-2 transition-colors rounded-2xl border-4",
                  isWordSelected(word)
                    ? "border-info-content  cursor-not-allowed"
                    : "border-disable/20 hover:border-info-content cursor-pointer"
                )}
              >
                <h3>{word.text}</h3>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {!openCard && (
        <div className="row-span-2 w-full absolute bottom-4 flex justify-center items-center translate-x-5">
          <ConfirmBtn
            onClick={handleConfirm}
            loading={isPending}
            disabled={
              selectedWords.length !==
              gameData.game_content.content.answers.length
            }
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
