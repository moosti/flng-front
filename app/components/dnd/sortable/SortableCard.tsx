"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "../../base/Icon";
import { motion } from "framer-motion";
interface SortableCardProps {
  id: string;
  index: number;
  children: React.ReactNode;
  color?: string;
}

export function SortableCard({
  id,
  children,
  index,
  color,
}: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    // width: minCardWidth,
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      className={`relative w-full h-full col-span-1 gap-5 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: index / 3 + 0.2,
        }}
        className={`w-full h-full grid grid-cols-6 border-4 rounded-2xl p-3 ${
          color && color !== "" ? color : "border-disable/20"
        }`}
      >
        <div className="flex flex-col w-full h-full justify-between items-start gap-2 col-span-2">
          <h3 className="w-full max-w-12 h-full max-h-12 flex justify-center items-center rounded-lg bg-disable/20">
            {index + 1}
          </h3>
          <div
            {...attributes}
            {...listeners}
            className="cursor-move flex justify-center items-center w-12 max-w-12 max-h-12 h-full py-1 rounded-lg  hover:bg-disable/20 transition duration-300"
          >
            <Icon size="md" name="swipe_vertical" />
          </div>
        </div>

        <div className="col-span-4 relative">{children}</div>
      </motion.div>
    </div>
  );
}
