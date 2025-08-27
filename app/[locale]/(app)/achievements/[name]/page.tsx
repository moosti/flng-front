"use client";
import ProgressBar from "@/app/components/base/ProgressBar";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { AchievementProgress, ClaimAchievement } from "@/types/User_Interface";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cssTransition, Slide, toast, ToastContainer } from "react-toastify";
import { setColorAchievement } from "../utils/setColorAchievement";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Icon from "@/app/components/base/Icon";
import { RouteBack } from "../../shop/components/RouteBack";
import { getLanguageFromUrl } from "@/app/utils/GetLanguageFromUrl ";

const Zoom = cssTransition({
  enter: "zoomIn",
  exit: "zoomOut",
  appendPosition: true,
});

export default function AchievementPage() {
  const router = useRouter();
  const { name } = useParams();
  const t = useTranslations("profile");
  const [achievement, setAchievement] = useState<AchievementProgress | null>(
    null
  );

  const fetchAchievementProgress = async ({ name }: { name: string }) => {
    const { data: achievementProgress } =
      await FetcherClientSide<AchievementProgress>({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/achievements/progress/${name}/`,
        method: "GET",
      });
    if (achievementProgress) {
      setAchievement({ ...achievementProgress, achievement_name: name });
    }
  };

  const handleClaim = async ({ id }: { id: number }) => {
    const { data: claimAchievement, status } =
      await FetcherClientSide<ClaimAchievement>({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/achievements/claim_achievement/${id}/`,
        method: "GET",
      });

    if (claimAchievement && status === 200) {
      toast(
        <div className="flex flex-col justify-center items-center gap-2">
          {claimAchievement.crown_reward ? (
            <p>
              {t("you_received_crowns", {
                crowns: claimAchievement.crown_reward,
              })}
            </p>
          ) : (
            ""
          )}
          {claimAchievement.total_exp ? (
            <p>
              {t("you_received_experience", {
                xp: claimAchievement.total_exp,
              })}
            </p>
          ) : (
            ""
          )}
        </div>,
        {
          transition: Zoom,
        }
      );
      if (achievement?.is_claimed && achievement.is_last_level) {
        router.push("/achievements");
      } else {
        if (name && typeof name === "string") {
          fetchAchievementProgress({ name: name });
        }
      }
    }
  };

  console.log("achievement [name]", achievement);

  useEffect(() => {
    if (name && typeof name === "string") {
      fetchAchievementProgress({ name: name });
    }
  }, [name]);

  return (
    <div className="w-full h-full overflow-scroll scrollbar-hidden flex justify-start items-center flex-col gap-5">
      <RouteBack className="!opacity-50 ms-auto">
        <Icon name="close" size="lg" />
      </RouteBack>
      {achievement ? (
        <div className="flex w-full flex-col gap-8 justify-center items-center">
          <div className="relative w-30 h-30">
            <Image
              fill
              className="object-contain"
              src={`/svg/achievements/${achievement.achievement_name}${
                achievement.earned_items < achievement.total_items
                  ? "_disabled"
                  : ""
              }.svg`}
              alt={achievement.achievement_name}
            />
          </div>

          <h2>{t(achievement.achievement_name)}</h2>
          <div className="flex justify-center items-center gap-2">
            <h5>{t("stage")}</h5>
            <h5>{achievement.level || 1}</h5>
          </div>
          <div className="max-w-lg w-full">
            <ProgressBar
              placeHolder={`${
                achievement.earned_items >= achievement.total_items
                  ? achievement.total_items
                  : achievement.earned_items || 0
              } / ${achievement.total_items}`}
              percent={
                achievement.total_items &&
                achievement.earned_items &&
                achievement.earned_items > 0
                  ? (achievement.earned_items / achievement.total_items) * 100
                  : 0
              }
              color={
                achievement.earned_items < achievement.total_items
                  ? "bg-disable"
                  : "bg-prime-content"
              }
            />
          </div>

          {achievement?.is_claimed && achievement.is_last_level ? (
            <h3>{t("well_done_you_have_achieved_all_the_achievements")}</h3>
          ) : (
            <ButtonAnimated
              onClick={() => {
                handleClaim({ id: achievement.id });
              }}
              disabled={achievement.earned_items < achievement.total_items}
              className="flex flex-col justify-center items-center gap-2 !h-16"
              color={setColorAchievement(achievement)}
            >
              <h5>{t("claim")}</h5>
            </ButtonAnimated>
          )}
        </div>
      ) : (
        <div className="bg-disable/20 skeleton w-full h-full rounded-2xl" />
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
    </div>
  );
}
