"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ScrollTrackerProps {
  prevUnit: number;
  setPrevUnit: Dispatch<SetStateAction<number>>;
  activeUnit: number;
  setActiveUnit: Dispatch<SetStateAction<number>>;
  containerSelector?: string;
  max: number;
}

export function ScrollTrackerUnits({
  prevUnit,
  setPrevUnit,
  activeUnit,
  setActiveUnit,
  max,
  containerSelector = ".scrollbar-level",
}: ScrollTrackerProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const isFirstRender = { current: true };
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.warn("Scroll container not found");
      return;
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: [0],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      entries.forEach((entry) => {
        const sectionIndex = parseInt(
          entry.target.getAttribute("data-section") || "0"
        );
        if (!isFirstRender.current) {
          if (
            activeUnit === sectionIndex &&
            entry.intersectionRatio === 0 &&
            activeUnit <= max - 1
          ) {
            setPrevUnit(prevUnit + 1);
            setActiveUnit(activeUnit + 1);
          }
          if (
            prevUnit === sectionIndex &&
            entry.intersectionRatio >= 0 &&
            entry.isIntersecting === true &&
            prevUnit !== 0
          ) {
            setPrevUnit(prevUnit - 1);
            setActiveUnit(activeUnit - 1);
          }
        }
      });
    }, options);

    const sections = container.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerSelector, activeUnit, prevUnit]);

  return null;
}
