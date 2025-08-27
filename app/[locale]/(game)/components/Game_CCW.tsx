"use client";

import StaggeredDropDown from "@/app/components/dropdown/StaggeredDropdown";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import ExitAnimation from "./AnswersCardAnimation";
import { ConfirmBtn } from "./ConfirmBtn";
import { CCWGameType } from "@/types/game/CCWGameType";
import { question } from "@/types/game/RepetitiveGameTyping";
import _ from "lodash";

interface Props {
  gameData: question<CCWGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
}

export default function Game_CCW({ gameData, updateGameState }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [correctAnswer, setCorrectAnswer] = useState<(string | null)[]>([]);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [openCard]);

  const handleSelect = (value: string, oldValue: string, index: number) => {
    setSelected((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleConfirm = async () => {
    startTransition(async () => {
      const answer: (string | null)[] = [];
      let isCorrect = true;

      gameData.game_content.content.phrase.forEach((phraseItem, index) => {
        if (!phraseItem.dialog) {
          answer.push(null);
        } else {
          const selectedValue = selected[index];
          const correctValue =
            phraseItem.dialog.choices[phraseItem.dialog.trueAnswer];

          answer.push(correctValue);

          if (selectedValue !== correctValue) {
            isCorrect = false;
          }
        }
      });

      setCorrectAnswer(answer);
      setCorrect(isCorrect);
      setOpenCard(true);
    });
  };

  return (
    <div className="w-full h-full grid grid-col-1 grid-rows-12 gap-10 px-5">
      <h2 className="row-span-2 text-center">{gameData.game_question}</h2>

      {gameData.game_attachments?.image && (
        <div className="row-span-4 relative flex justify-center items-center">
          <Image
            src={gameData.game_attachments?.image.path}
            alt={gameData.game_attachments?.image.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="row-span-4">
        <div className="flex justify-center items-center gap-2 flex-wrap ">
          {gameData.game_content.content.phrase.map(
            (phraseItem, phraseIndex) => {
              if (phraseItem.dialog) {
                return (
                  <div
                    className="flex justify-center items-center flex-col"
                    key={phraseIndex}
                  >
                    <StaggeredDropDown
                      value={selected[phraseIndex] || ""}
                      option={_.uniq(phraseItem.dialog.choices)}
                      onChange={(value, oldValue) =>
                        handleSelect(value, oldValue, phraseIndex)
                      }
                      correct={
                        openCard
                          ? correct
                            ? correct
                            : selected[phraseIndex] ==
                              correctAnswer[phraseIndex]
                          : null
                      }
                    />
                    {selected[phraseIndex] !== correctAnswer[phraseIndex] &&
                      openCard &&
                      !correct && (
                        <h4 className="text-success mt-2">
                          {correctAnswer[phraseIndex] || ""}
                        </h4>
                      )}
                  </div>
                );
              } else {
                return <h4 key={phraseIndex}>{phraseItem.text}</h4>;
              }
            }
          )}
        </div>
      </div>

      {!openCard && (
        <div className="row-span-2 w-full absolute bottom-4 flex justify-center items-center translate-x-5">
          <ConfirmBtn
            onClick={handleConfirm}
            loading={isPending}
            disabled={
              _.compact(selected).length !==
              gameData.game_content.content.phrase.filter((item) => item.dialog)
                .length
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
