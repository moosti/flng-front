"use client";

import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import { Achievement } from "@/types/User_Interface";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setColorAchievement } from "../utils/setColorAchievement";
import { Indicator } from "@/app/components/Indicator/Indicator";

interface AchievementCardProps {
  achievement: Achievement;
  onFetchProgress?: (name: string) => void;
  className?: string;
}

export default function AchievementCard({
  achievement,
  onFetchProgress,
  className,
}: AchievementCardProps) {
  const t = useTranslations("profile");

  return (
    <ButtonAnimated
      onClick={() => {
        onFetchProgress?.(achievement.achievement_name);
      }}
      className={`${className} flex flex-col relative justify-around items-center gap-5 min-w-fit !w-fit !h-fit`}
      color={setColorAchievement(achievement)}
    >
      {achievement.is_claimed === false && (
        <Indicator
          className="-top-4 -start-4"
          bg_color="bg-error"
          text_color="text-base-card"
        >
          <p className="text-inherit text-xs">{t("new")}</p>
        </Indicator>
      )}
      <div className="relative w-full min-h-16">
        <Image
          fill
          className="object-contain"
          src={`/svg/achievements/${achievement.achievement_name}${
            !achievement.is_collected ? "_disabled" : ""
          }.svg`}
          alt={achievement.achievement_name}
        />
      </div>
      <h5>{t(achievement.achievement_name)}</h5>
      <div className="flex justify-center items-center gap-2">
        <h5>{t("stage")}</h5>
        <h5>{achievement.level || 1}</h5>
      </div>
    </ButtonAnimated>
  );
}
