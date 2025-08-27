"use client";

import Icon from "@/app/components/base/Icon";
import Divider from "@/app/components/divider/Divider";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { Achievement } from "@/types/User_Interface";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState, useTransition } from "react";
import AchievementCard from "./components/AchievementCard";
import { RouteBack } from "../shop/components/RouteBack";
import { useRouter } from "next/navigation";
import { Slide, ToastContainer } from "react-toastify";
import { getLanguageFromUrl } from "@/app/utils/GetLanguageFromUrl ";

export default function Achievements() {
  const router = useRouter();
  const t = useTranslations("profile");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isInsideTransition, setIsInsideTransition] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const fetchData = () => {
    startTransition(async () => {
      const { data: AchievementsData } = await FetcherClientSide<Achievement[]>(
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/achievements/list-achievements/`,
          method: "GET",
        }
      );

      if (AchievementsData) {
        setAchievements(AchievementsData);
      }
      setIsInsideTransition(false);
    });
  };

  console.log("achievements", achievements);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="w-full h-full skeleton bg-disable/20 rounded-2xl " />
      }
    >
      {!isPending && !isInsideTransition && achievements ? (
        <div className="w-full h-full overflow-scroll scrollbar-hidden flex justify-start items-center flex-col gap-5">
          <div className="flex justify-between items-center w-full">
            <h2>{t("achievements_and_Awards")}:</h2>
            <div className="flex justify-center items-center gap-3">
              <RouteBack>
                <Icon name="arrow_back" size="lg" />
              </RouteBack>
            </div>
          </div>
          <Divider />
          <div className="flex w-full relative justify-center items-center gap-10 flex-wrap">
            {achievements.map((achievementItem, achievementIndex) => (
              <AchievementCard
                key={achievementIndex}
                achievement={achievementItem}
                onFetchProgress={(name) => router.push(`/achievements/${name}`)}
                className="!max-w-40 !min-w-40 !min-h-56 !max-h-56 !w-40 !h-56"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full skeleton bg-disable/20 rounded-2xl " />
      )}
      <ToastContainer
        position={getLanguageFromUrl() === "fa" ? "top-right" : "top-left"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={getLanguageFromUrl() === "fa" ? true : false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </Suspense>
  );
}
