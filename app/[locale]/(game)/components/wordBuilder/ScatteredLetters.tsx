"use client";

import { useEffect, useState } from "react";
import { LetterTile } from "./LetterTile";
import { motion } from "framer-motion";
interface ScatteredLettersProps {
  letters: string[];
  onLetterClick: (letter: string, index: number) => void;
  usedLetterIndices: number[];
}

interface LetterPosition {
  rotation: number;
  translateX: number;
  translateY: number;
}

export function ScatteredLetters({
  letters,
  onLetterClick,
  usedLetterIndices,
}: ScatteredLettersProps) {
  const [positions, setPositions] = useState<LetterPosition[]>([]);

  useEffect(() => {
    const newPositions = letters.map(() => ({
      rotation: Math.random() * 15 - 15,
      translateX: Math.random() * 40 - 20,
      translateY: Math.random() * 60,
    }));
    setPositions(newPositions);
  }, [letters]);

  return (
    <div className="relative min-h-[200px] flex flex-wrap gap-10 justify-center items-center p-1">
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: index / letters.length + 0.05,
          }}
        >
          <div
            className="transition-all duration-300 hover:z-10"
            style={{
              transform: `rotate(${positions[index]?.rotation || 0}deg) 
                       translate(${positions[index]?.translateX || 0}px, 
                               ${positions[index]?.translateY || 0}px)`,
            }}
          >
            <LetterTile
              letter={letter}
              isSelected={usedLetterIndices.includes(index)}
              onClick={() => onLetterClick(letter, index)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
