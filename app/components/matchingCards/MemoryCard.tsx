"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MemoryCardProps {
  text: string | undefined;
  image: string | undefined;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MemoryCard({
  text,
  isFlipped,
  isMatched,
  image,
  onClick,
}: MemoryCardProps) {
  return (
    <motion.div
      className="perspective-1000"
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div
        className={`
          h-32 cursor-pointer transition-all duration-500 transform-style-3d relative rounded-2xl
          hover:shadow-xl
          ${isFlipped ? "rotate-y-0" : "rotate-y-180"}
          ${isMatched ? "matched-card" : ""}
        `}
      >
        <motion.div
          className={`
            absolute inset-0 backface-hidden flex items-center justify-center text-2xl
            rounded-2xl ${isMatched ? "" : "border-4 border-info-content"} 
            ${isFlipped ? "visible" : "invisible"}
          `}
          animate={
            isMatched
              ? {
                  borderColor: ["#fff", "#86efac", "#fff"],
                  transition: { duration: 1.5, repeat: Infinity },
                }
              : {}
          }
        >
          {text && (
            <h4 className="transform scale-150 transition-transform duration-300">
              {text}
            </h4>
          )}
          {image && (
            <Image
              className="object-contain p-1"
              fill
              src={image}
              alt="flashcard"
            />
          )}
        </motion.div>
        <div
          className={`
            absolute inset-0 backface-hidden rotate-y-180 rounded-2xl
            bg-gradient-to-t from-prime to-prime-content
            flex items-center justify-center text-white text-xl
            ${isFlipped ? "invisible" : "visible"}
          `}
        >
          <h2 className="text-inherit transform hover:scale-125 transition-transform duration-300">
            ?
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
