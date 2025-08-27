"use client";

import { useMotionValue, useTransform, motion } from "motion/react";
import { ReactNode } from "react";

export default function UseTransformCard({
  children,
  onDrag,
}: {
  children: ReactNode;
  onDrag?: (event: boolean) => void;
}) {
  const x = useMotionValue(0);
  const xInput = [-200, 0, 200];
  // const background = useTransform(x, xInput, [
  //   "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
  //   "var(--theme-base-card)",
  //   "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  // ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);
  const rotate = useTransform(x, [-600, 0, 600], [-90, 0, 90]);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  interface DragEventInfo {
    offset: {
      x: number;
      y: number;
    };
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: DragEventInfo
  ) => {
    if (onDrag) {
      if (info.offset.x > 150) {
        onDrag(true);
      } else if (info.offset.x < -150) {
        onDrag(false);
      }
    }
  };

  return (
    <motion.div className="relative flex justify-center items-center rounded-2xl flex-1 w-full h-full min-h-96 h-auto  p-5 ">
      <motion.div
        className="icon-container flex justify-center items-center flex-col gap-5 bg-transparent rounded-2xl p-5 w-full h-full"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
      >
        {children}

        <svg className="progress-icon w-20 h-20" viewBox="0 0 50 50">
          {/* <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{
              x: 5,
              y: 5,
            }}
          /> */}
          <motion.path
            id="tick"
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            id="cross"
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
