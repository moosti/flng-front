import { Achievement, AchievementProgress } from "@/types/User_Interface";

export const setColorAchievement = (
  achievementItem: Achievement | AchievementProgress
) => {
  if ("is_collected" in achievementItem && !achievementItem.is_collected) {
    return "disable";
  }

  switch (achievementItem.achievement_name) {
    case "invitation":
      return "info";
    case "perfect_week":
      return "neutral";
    case "spending_time":
      return "green";
    case "quest_explorer":
      return "accent";
    case "xp_olympian":
      return "prime";
    default:
      return "prime";
  }
};
