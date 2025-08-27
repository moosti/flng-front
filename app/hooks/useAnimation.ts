"use client";

import { useState, useEffect, useCallback } from "react";

interface AnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
}

export const useAnimation = (
  initialValue: number,
  options: AnimationOptions = {}
) => {
  const { duration = 700, ease = "easeInOut", delay = 0 } = options;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const animate = useCallback((newValue: number) => {
    setValue(newValue);
  }, []);

  return {
    value,
    animate,
    transition: {
      duration: duration / 1000,
      ease,
      delay: delay / 1000,
    },
  };
};
