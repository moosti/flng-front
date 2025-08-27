"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { ScatteredLetters } from "./wordBuilder/ScatteredLetters";
import ExitAnimation from "./AnswersCardAnimation";
import Icon from "@/app/components/base/Icon";
import { ConfirmBtn } from "./ConfirmBtn";
import { GameState, JLGameType } from "@/types/game/JLGameType";
import { question } from "@/types/game/RepetitiveGameTyping";
import _ from "lodash";
import { shuffleWithoutOriginalOrder } from "@/app/utils/utils";

interface Props {
  gameData: question<JLGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
}

const processGameContent = (content: JLGameType) => {
  const wordsSpec: { index: number; length: number }[] = [];
  const trueWords: string[] = [];

  content.words.forEach((wordObj, i) => {
    let newWord = "";
    wordsSpec.push({
      index: i,
      length: wordObj.chars.length,
    });

    wordObj.chars.forEach((charObj) => {
      newWord += charObj.char;
    });

    trueWords.push(newWord);
  });

  const chars = content.words.flatMap((wordObj) =>
    wordObj.chars.map((charObj) => charObj.char)
  );

  return { wordsSpec, chars, trueWords };
};

export default function Game_JL({ gameData, updateGameState }: Props) {
  const t = useTranslations("game");
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [gameState, setGameState] = useState<GameState>({
    words: [],
    chars: [],
    selectedLetters: {},
    trueWords: [],
  });

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

  useEffect(() => {
    const { wordsSpec, chars, trueWords } = processGameContent(
      gameData.game_content.content
    );
    setGameState({
      words: wordsSpec,
      chars: shuffleWithoutOriginalOrder(chars),
      selectedLetters: Object.fromEntries(wordsSpec.map((p) => [p.index, []])),
      trueWords: trueWords,
    });
    setLoading(false);
  }, []);

  if (isLoading || !gameState) {
    return <div className="w-full h-full bg-disable/40 skeleton rounded-2xl" />;
  }

  const handleLetterClick = (letter: string, letterIndex: number) => {
    const isLetterUsed = Object.values(gameState.selectedLetters).some((word) =>
      word.some((l) => l.letterIndex === letterIndex)
    );

    if (isLetterUsed) return;
    const targetWordIndex = gameState.words.find(
      (p) => gameState.selectedLetters[p.index].length < p.length
    )?.index;

    if (targetWordIndex !== undefined) {
      setGameState((prev) => ({
        ...prev,
        selectedLetters: {
          ...prev.selectedLetters,
          [targetWordIndex]: [
            ...prev.selectedLetters[targetWordIndex],
            { letter, letterIndex },
          ],
        },
      }));
    }
  };

  const handleSlotLetterClick = (wordIndex: number, slotIndex: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedLetters: {
        ...prev.selectedLetters,
        [wordIndex]: prev.selectedLetters[wordIndex].filter(
          (_, i) => i !== slotIndex
        ),
      },
    }));
  };

  const handleReset = () => {
    setGameState((prev) => ({
      ...prev,
      selectedLetters: Object.fromEntries(
        gameState.words.map((p) => [p.index, []])
      ),
    }));
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      const selectedWords = gameState.words.map((p) =>
        gameState.selectedLetters[p.index].map((l) => l.letter).join("")
      );

      if (_.isEqual(gameState.trueWords, selectedWords)) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setOpenCard(true);
    });
  };

  const isComplete = gameState.words.every(
    (p) => gameState.selectedLetters[p.index].length === p.length
  );

  const usedLetterIndices =
    gameState &&
    Object.values(gameState.selectedLetters)
      .flat()
      .map((l) => l.letterIndex);

  return (
    <div className="w-full h-full grid grid-col-1 grid-rows-12 gap-5 px-5">
      <h2 className="row-span-2 text-center flex justify-center items-center">
        {t("make_words_by_connecting_jumbled_letters")}
      </h2>

      <div className="flex justify-center items-center gap-2 flex-col row-span-4">
        <div className="flex justify-center items-center gap-5 flex-col">
          {gameState.words.map((pattern) => (
            <div key={pattern.index} className="flex flex-col gap-2">
              <div className="flex gap-2">
                {Array.from({ length: pattern.length }).map((_, index) => {
                  const letterData =
                    gameState.selectedLetters[pattern.index][index];

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        handleSlotLetterClick(pattern.index, index)
                      }
                      className={`w-16 h-16 border-4 border-disable/20 rounded-2xl flex items-center justify-center
                        ${
                          letterData
                            ? openCard
                              ? correct
                                ? "border-success"
                                : "border-error"
                              : "border-info-content"
                            : "border-dashed border-muted-foreground bg-background"
                        }
                         transition-all hover:border-primary`}
                    >
                      {letterData && (
                        <span className="text-lg font-bold">
                          {letterData.letter}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-neutral btn-outline mt-2"
          onClick={() => {
            handleReset();
          }}
        >
          <h3 className="text-inherit">{t("clean")}</h3>
        </button>
      </div>

      <div className="border-t border-disable/40 pt-10 pb-10 row-span-4">
        <ScatteredLetters
          letters={gameState.chars}
          onLetterClick={handleLetterClick}
          usedLetterIndices={usedLetterIndices || []}
        />
      </div>

      {!openCard && (
        <div className="row-span-2 w-full absolute bottom-4 flex justify-center items-center translate-x-5">
          <ConfirmBtn
            onClick={handleSubmit}
            loading={isPending}
            disabled={!isComplete}
          />
        </div>
      )}

      <ExitAnimation
        correct={correct}
        isVisible={openCard}
        onClick={() => {
          updateGameState(correct, gameData.game_id, elapsedTime);
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2">
          <Icon size="md" name="check_circle" className="text-success" />
          <h3>{t("correct_words")} :</h3>
          {gameState.trueWords.map((item, key) => {
            return <h4 key={key}>{item},</h4>;
          })}
        </div>
      </ExitAnimation>
    </div>
  );
}
