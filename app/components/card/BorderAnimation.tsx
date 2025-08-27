"use client";
import { useTime, useTransform, motion } from "motion/react";

interface BorderAnimationProps {
  colors?: string[];
  inset?: string;
  duration?: number;
}

export default function BorderAnimation({
  colors = [
    "var(--theme-color-info-content)",
    "var(--theme-color-prime)",
    "var(--theme-color-prime-content)",
    "var(--theme-color-info)",
    "var(--theme-color-info-content)",
  ],
  inset = "-inset-[8px]",
  duration = 3000,
}: BorderAnimationProps) {
  const time = useTime();

  const rotate = useTransform(time, [0, duration], [0, 360], { clamp: false });

  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, ${colors.join(", ")})`;
  });

  return (
    <motion.div
      className={`absolute ${inset} rounded-2xl`}
      style={{ background: rotatingBg }}
    />
  );
}
