"use client";

import Matching from "@/components/matchingCards/Matching";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ExitAnimation from "./AnswersCardAnimation";
import { useEffect, useState } from "react";
import { MatchingProps, MCGameType } from "@/types/game/MCGameType";
import { question } from "@/types/game/RepetitiveGameTyping";
import { shuffleWithoutOriginalOrder } from "@/app/utils/utils";

interface Props {
  gameData: question<MCGameType>;
  setHeart: () => void;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
}

export default function Game_MC({
  gameData,
  setHeart,
  updateGameState,
}: Props) {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchingCards, setMatchingCards] = useState<MatchingProps[]>([]);

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
    const transformedData: MatchingProps[] =
      gameData.game_content.content.pairingItems.flatMap(
        ({ innerItems }, index) => {
          const [first, second] = innerItems;
          const pairId = index + 1;

          return [
            {
              id: pairId * 2 - 1,
              text: first.text || "",
              image: first.image?.path || undefined,
              pairId,
              isFlipped: true,
              isMatched: false,
            },
            {
              id: pairId * 2,
              text: second.text || "",
              image: second.image?.path || undefined,
              pairId,
              isFlipped: true,
              isMatched: false,
            },
          ];
        }
      );
    setMatchingCards(shuffleWithoutOriginalOrder(transformedData));
  }, []);

  const confirm = async () => {
    setOpenCard(true);
  };

  const t = useTranslations("game");
  return (
    <div className="w-full h-full grid grid-col-1 grid-rows-12 px-5 gap-5">
      <motion.h2
        className="text-center flex justify-center items-center row-span-1"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {t("move_and_arrange_the_cards")}
      </motion.h2>
      {matchingCards.length > 0 && (
        <Matching
          initialCards={matchingCards}
          wrongAnswerFun={setHeart}
          confirm={confirm}
        />
      )}

      <ExitAnimation
        correct={true}
        isVisible={openCard}
        onClick={() => {
          updateGameState(true, gameData.game_id, elapsedTime);
        }}
      />
    </div>
  );
}
