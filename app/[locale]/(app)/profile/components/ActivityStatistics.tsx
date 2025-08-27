import Icon from "@/components/base/Icon";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { UserActivity } from "@/types/User_Interface";

interface ActivityStatisticsProps {
  userActivity: UserActivity;
}

export default function ActivityStatistics({
  userActivity,
}: ActivityStatisticsProps) {
  const t = useTranslations("profile");

  const statisticsData = {
    completed_days: userActivity.streak_completed_days,
    exp: userActivity.total_exp,
    cups: userActivity.cups,
    league_name: userActivity.league_name,
  };

  const getIcon = (key: string) => {
    switch (key) {
      case "completed_days":
        return (
          <Icon className="text-prime text-center" name="bolt" size="lg" fill />
        );
      case "exp":
        return (
          <Icon
            className="text-prime text-center"
            name="keyboard_double_arrow_up"
            size="lg"
            fill
          />
        );
      case "league_name":
        return (
          <div className="px-3 py-2">
            <Image
              width={20}
              height={20}
              src="/svg/league/blue-league.svg"
              alt="current_league"
            />
          </div>
        );
      case "cups":
        return (
          <Icon
            className="text-warning text-center"
            name="emoji_events"
            size="lg"
            fill
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      <h2>{t("activity_statistics")}</h2>
      <div className="w-full grid grid-cols-2 gap-8">
        {Object.entries(statisticsData).map(([key, value]) => (
          <div
            key={key}
            className="w-full col-span-1 min-h-24 ring-6 ring-disable/20 rounded-2xl flex !flex-row !justify-start !items-start !gap-0"
          >
            {getIcon(key)}
            <div className="flex flex-col justify-center items-start gap-5 py-2">
              <h5>{value || 0}</h5>
              <p className="truncate w-24">{t(key)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
