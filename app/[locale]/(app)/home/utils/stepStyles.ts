import { UnitStyle, StepType } from "@/types/types";

interface StepStyle {
  background: string;
  background_content: string;
  text: string;
}

export const getStepStyle = (StepType: StepType): StepStyle => {
  switch (StepType) {
    case "beginner_level":
      return {
        background: "bg-accent",
        background_content: "bg-accent-content",
        text: "text-accent",
      };
    case "introductory_level":
      return {
        background: "bg-info",
        background_content: "bg-info-content",
        text: "text-info",
      };
    case "intermediate_level":
      return {
        background: "bg-prime",
        background_content: "bg-prime-content",
        text: "text-prime",
      };
    case "advanced_level":
      return {
        background: "bg-neutral",
        background_content: "bg-neutral-content",
        text: "text-neutral",
      };
    default:
      return {
        background: "bg-base-card",
        background_content: "bg-base-card-content",
        text: "text-base-card",
      };
  }
};

export const getLevelsStyle = (stepType: string): UnitStyle => {
  switch (stepType) {
    case "beginner_level":
      return {
        background: "bg-accent",
        background_content: "bg-accent-content",
      };
    case "introductory_level":
      return {
        background: "bg-info",
        background_content: "bg-info-content",
      };
    case "intermediate_level":
      return {
        background: "bg-prime",
        background_content: "bg-prime-content",
      };
    case "advanced_level":
      return {
        background: "bg-neutral",
        background_content: "bg-neutral-content",
      };
    case "daily_conversations":
      return {
        background: "bg-prime",
        background_content: "bg-prime-content",
      };
    default:
      return {
        background: "bg-prime",
        background_content: "bg-prime-content",
      };
  }
};
