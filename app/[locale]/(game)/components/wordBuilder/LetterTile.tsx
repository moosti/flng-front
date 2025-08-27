"use client";

interface LetterTileProps {
  letter: string;
  isSelected?: boolean;
  onClick: () => void;
}

export function LetterTile({ letter, isSelected, onClick }: LetterTileProps) {
  return (
    <button
      onClick={onClick}
      className={`min-w-14 w-auto h-14 rounded-2xl px-1 text-lg font-bold transition-all transform hover:scale-115
        flex items-center justify-center border-4
        ${
          isSelected
            ? "border-info-content cursor-not-allowed"
            : "border-disable/20 hover:border-info-content cursor-pointer"
        }`}
    >
      <h3 className="text-inherit">{letter}</h3>
    </button>
  );
}
