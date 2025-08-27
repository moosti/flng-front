"use client";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../hooks/useAnimation";
import { useGradient } from "../../hooks/useGradient";

interface ProgressBarProps {
  percent?: number;
  gradient?: boolean;
  color?: string;
  fromColor?: string;
  toColor?: string;
  placeHolder?: string;
  placeHolderClass?: string;
}

const ProgressBarContent = memo(
  ({
    animatedPercent,
    gradient,
    fromColor,
    toColor,
    color,
    transition,
  }: {
    animatedPercent: number;
    gradient?: boolean;
    fromColor?: string;
    toColor?: string;
    color?: string;
    transition: {
      duration: number;
      ease: string;
      delay: number;
    };
  }) => {
    const { gradientClasses } = useGradient({
      fromColor,
      toColor,
    });

    return (
      <motion.div
        initial={false}
        animate={{ width: `${animatedPercent}%` }}
        transition={transition}
        className={`inset-shadow-card-xs h-6 rounded-full ${
          gradient ? gradientClasses : color
        }`}
      />
    );
  }
);

ProgressBarContent.displayName = "ProgressBarContent";

const ProgressBar = memo(function ProgressBar({
  percent = 0,
  gradient = false,
  color,
  fromColor,
  toColor,
  placeHolder,
  placeHolderClass,
}: ProgressBarProps) {
  const clampedPercent = useMemo(
    () => Math.max(0, Math.min(percent, 100)),
    [percent]
  );
  const { value: animatedPercent, transition } = useAnimation(clampedPercent);
  const { gradientClasses } = useGradient();

  const containerClasses = useMemo(
    () =>
      `w-full relative flex justify-start items-center rounded-full h-6 shadow-disable/50 ${
        gradient ? gradientClasses : "bg-disable/20"
      }`,
    [gradient, gradientClasses]
  );

  return (
    <div className={containerClasses}>
      <ProgressBarContent
        animatedPercent={animatedPercent}
        gradient={gradient}
        fromColor={fromColor}
        toColor={toColor}
        color={color}
        transition={transition}
      />
      {placeHolder && (
        <h5
          className={`${placeHolderClass} absolute  -translate-x-1/2 left-1/2`}
        >
          {placeHolder}
        </h5>
      )}
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
