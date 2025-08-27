"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MemoryCard } from "./MemoryCard";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { MatchingProps } from "@/types/game/MCGameType";
interface Props {
  initialCards: MatchingProps[];
  wrongAnswerFun: () => void;
  confirm: () => void;
}

export default function Matching({
  initialCards,
  wrongAnswerFun,
  confirm,
}: Props) {
  const t = useTranslations("game");
  const [cards, setCards] = useState<MatchingProps[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, isFlipped: false }))
      );
      setCanFlip(true);
      setGameStarted(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstId, secondId] = selectedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard && secondCard) {
        if (firstCard.pairId === secondCard.pairId) {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );

          setSelectedCards([]);
        } else {
          setTimeout(async () => {
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setSelectedCards([]);
            await wrongAnswerFun();
          }, 1000);
        }
      }
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    if (cards) {
      const allMatched = _.every(cards, { isMatched: true });
      if (allMatched) {
        const confirmData = async () => {
          try {
            await confirm();
          } catch (error) {
            console.error("Error fetching game data:", error);
          }
        };
        confirmData();
      }
    }
  }, [cards]);

  const handleCardClick = (cardId: number) => {
    if (!canFlip) return;

    const card = cards.find((c) => c.id === cardId);
    if (
      !card ||
      card.isMatched ||
      card.isFlipped ||
      selectedCards.length >= 2 ||
      selectedCards.includes(cardId)
    ) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );
    setSelectedCards((prev) => [...prev, cardId]);
  };
  return (
    <motion.div
      className="max-w-4xl mx-auto w-full h-full row-span-11"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h4
        className="text-center h-fit min-h-10 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!gameStarted &&
          t("memorize_the_cards_They_will_flip_in_time_seconds", { time: 3 })}
      </motion.h4>

      <motion.div
        className="grid grid-cols-2 gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            text={card.text}
            image={card.image}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
