"use client";

import { useMemo } from "react";

interface GradientOptions {
  direction?: "ltr" | "rtl";
  fromColor?: string;
  toColor?: string;
}

export const useGradient = (options: GradientOptions = {}) => {
  const {
    direction = "ltr",
    fromColor = "from-disable/5",
    toColor = "to-disable/20",
  } = options;

  const gradientClasses = useMemo(() => {
    const directionClass =
      direction === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l";
    return `${directionClass} ${fromColor} ${toColor}`;
  }, [direction, fromColor, toColor]);

  return {
    gradientClasses,
  };
};
