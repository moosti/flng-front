"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import Divider from "@/components/divider/Divider";
import Link from "next/link";
import { Achievement, ProfilePageResponse } from "@/types/User_Interface";
import { useTranslations } from "next-intl";
import LoadingProfile from "./components/LoadingProfile";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ActivityStatistics from "./components/ActivityStatistics";
import UserProfileHeader from "./components/UserProfileHeader";
import ExperienceChart from "./components/ExperienceChart";

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
  onFetchProgress: (name: string) => void;
}

const AchievementCard = dynamic<AchievementCardProps>(
  () =>
    import("../achievements/components/AchievementCard").then(
      (mod) => mod.default
    ),
  {
    loading: () => (
      <div className="w-full h-full bg-disable/40 skeleton rounded-2xl" />
    ),
    ssr: false,
  }
);

export default function Profile() {
  const t = useTranslations("profile");
  const router = useRouter();
  const [userData, setUserData] = useState<ProfilePageResponse | null>();
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [isInsideTransition, setIsInsideTransition] = useState<boolean>(true);

  const [isPending, startTransition] = useTransition();
  const fetchData = () => {
    startTransition(async () => {
      const { data: userDataRes } =
        await FetcherClientSide<ProfilePageResponse>({
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/profile/profile-page/`,
          method: "GET",
        });
      const { data: achievementsDataRes } = await FetcherClientSide<
        Achievement[]
      >({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/achievements/list-achievements/?limit=3`,
        method: "GET",
      });

      if (userDataRes) {
        setUserData(userDataRes);
      }
      if (achievementsDataRes) {
        setAchievementsData(achievementsDataRes);
      }

      setIsInsideTransition(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Suspense fallback={<LoadingProfile />}>
      <div className="h-full w-full scrollbar-hidden overflow-scroll bg-base-card rounded-2xl p-5 flex flex-wrap flex-col justify-start items-center">
        {!isPending && !isInsideTransition ? (
          <div className="w-full sm:w-96 max-w-96 flex flex-col justify-start items-center gap-5">
            {userData && (
              <>
                <UserProfileHeader
                  userActivity={userData.user_activity}
                  refetchProfileData={async () => await fetchData()}
                />
                <Divider />
              </>
            )}

            {userData && (
              <ActivityStatistics userActivity={userData.user_activity} />
            )}

            {userData?.daily_exp && (
              <ExperienceChart daily_exp={userData.daily_exp} />
            )}

            {achievementsData.length > 0 && (
              <div className="w-full flex justify-center items-start flex-col gap-10">
                <div className="w-full flex justify-between items-center gap-3">
                  <h2 className="truncate w-80">
                    {t("achievements_and_Awards")}
                  </h2>
                  <Link href="/achievements">
                    <h5 className="text-prime text-nowrap">{t("see_all")}</h5>
                  </Link>
                </div>
                <div className="w-full grid grid-cols-3 gap-5">
                  {achievementsData.map((achievementItem, achievementIndex) => (
                    <AchievementCard
                      key={achievementIndex}
                      achievement={achievementItem}
                      className="col-span-1 !w-full !h-full"
                      onFetchProgress={(name: string) =>
                        router.push(`/achievements/${name}`)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <LoadingProfile />
        )}
      </div>
    </Suspense>
  );
}
