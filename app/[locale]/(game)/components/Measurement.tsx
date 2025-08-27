"use client";

import Counter from "@/app/components/AnimatedCounter/Counter";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Icon from "@/app/components/base/Icon";
import { measurementType } from "@/types/game/measurementType";
import { FetcherClientSide } from "@/utils/FetcherClientSide";
import { formatSecondsToTimeAnimated } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { updateStepState } from "../game/hook/updateStepState";
import { PartyAnimated } from "../utils/PartyAnimated";
import { ReqLostHeart } from "@/app/hooks/ReqLostHeart";
import { dailyQuest } from "@/app/db/db";
import _ from "lodash";
import { challengesType } from "@/types/dailyChallenge";
import DailyChallenge from "../../(app)/home/components/daily-challenge/DailyChallenge";

interface Props {
  measurement: measurementType;
}

type measurement_type =
  | "amazing"
  | "perfect"
  | "very good"
  | "good"
  | "not bad"
  | "bad";

function getSpeedCategory(spending_time: number, total_time: number): string {
  const difference = spending_time - total_time;

  if (difference < -10) {
    return "fast";
  } else if (difference >= -10 && difference <= 10) {
    return "medium";
  } else {
    return "slow";
  }
}

const getMeasurementType = (correctness: number) => {
  if (correctness === 100) {
    return "amazing";
  } else if (correctness >= 90 && correctness <= 99) {
    return "perfect";
  } else if (correctness >= 80 && correctness < 90) {
    return "very good";
  } else if (correctness >= 70 && correctness < 80) {
    return "good";
  } else if (correctness >= 50 && correctness < 70) {
    return "not bad";
  } else if (correctness >= 0 && correctness < 50) {
    return "bad";
  }
  return;
};

export default function Measurement({ measurement }: Props) {
  const t = useTranslations("game");
  const route = useRouter();
  const [dailyQuestState, setDailyQuestState] = useState<challengesType[]>([]);
  const [showReward, setShowReward] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [earnedCrowns, setEarnedCrowns] = useState<number>(0);
  const correctness_measurement_percentage = Math.ceil(
    measurement.correctness_measurement_percentage
  );

  useEffect(() => {
    if (measurement) {
      const audio = new Audio("/audio/game/result of questions.wav");
      audio.play();
      PartyAnimated();
    }
  }, [measurement]);

  const measurement_type = getMeasurementType(
    correctness_measurement_percentage
  ) as measurement_type;

  function ReceiveEXP() {
    startTransition(async () => {
      await ReqLostHeart();
      if (measurement.step_id === "review") {
        await FetcherClientSide({
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/games/finish-review-lesson/`,
          method: "GET",
        });

        await updateStepState({
          unit_id: measurement.unit_id,
          lesson_id: measurement.lesson_id,
          step_id: measurement.step_id,
          newState: "completed",
          review: true,
        });
      } else {
        const { status } = await FetcherClientSide({
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/games/finish-step/`,
          method: "POST",
          data: {
            step_id: measurement.step_id,
            earned_exp: correctness_measurement_percentage === 100 ? 50 : 25,
            spending_time: measurement.spending_time,
            measure: correctness_measurement_percentage,
          },
        });
        if (status === 204) {
          await updateStepState({
            unit_id: measurement.unit_id,
            lesson_id: measurement.lesson_id,
            step_id: measurement.step_id,
            newState: "completed",
            review: false,
          });
        }
      }

      const dailyQuestData = await dailyQuest.toArray();
      const newDailyQuestData = await FetcherClientSide<challengesType[]>({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/challenges/daily-quests/`,
        method: "GET",
      });
      const newDailyQuestDataArray = newDailyQuestData.data?.map(
        (item, index) => ({
          ...item,
          key: index,
        })
      );

      const isEqual = _.isEqual(dailyQuestData, newDailyQuestDataArray);
      if (isEqual) {
        route.back();
      } else if (newDailyQuestDataArray) {
        const completedNewChallenges = _.filter(
          newDailyQuestDataArray,
          (newItem) => {
            const oldItem = _.find(dailyQuestData, { key: newItem.key });

            return (
              newItem.checked_times === newItem.duration &&
              (!oldItem || oldItem.checked_times !== oldItem.duration)
            );
          }
        );

        const totalEarningCrowns = _.sumBy(
          completedNewChallenges,
          "earning_crowns"
        );
        setEarnedCrowns(totalEarningCrowns);
        setDailyQuestState(dailyQuestData);
        setTimeout(() => {
          setDailyQuestState(newDailyQuestDataArray);
        }, 500);
      }
    });
  }

  const getMeasurementText = (type: measurement_type) => {
    if (type === "amazing") {
      return (
        <div className="flex flex-col justify-between items-center gap-3">
          <h2>{t("measurement_amazing_title")}</h2>
          <p>{t("measurement_amazing_des")}</p>
        </div>
      );
    } else if (type === "perfect") {
      return (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>{t("measurement_perfect_title")}</h2>
          <p>{t("measurement_perfect_des")}</p>
        </div>
      );
    } else if (type === "very good") {
      return (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>{t("measurement_very_good_title")}</h2>
          <p>{t("measurement_very_good_des")}</p>
        </div>
      );
    } else if (type === "good") {
      return (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>{t("measurement_good_title")}</h2>
          <p>{t("measurement_good_des")}</p>
        </div>
      );
    } else if (type === "not bad") {
      return (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>{t("measurement_not_bad_title")}</h2>
          <p>{t("measurement_not_bad_des")}</p>
        </div>
      );
    } else if (type === "bad") {
      return (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>{t("measurement_bad_title")}</h2>
          <p>{t("measurement_bad_des")}</p>
        </div>
      );
    }
    return;
  };

  if (dailyQuestState && dailyQuestState.length) {
    return (
      <div className="grid grid-flow-col grid-rows-12 h-dvh md:h-full w-full bg-base-card gap-5 rounded-none md:rounded-2xl overflow-hidden scrollbar-hidden p-5">
        {!showReward ? (
          <div className="col-span-1 row-span-11 flex justify-center  items-center mx-auto w-full max-w-xl">
            <DailyChallenge challenges={dailyQuestState} remaining_time="" />
          </div>
        ) : (
          <>
            <div className="col-span-1 row-span-8 flex justify-center relative  items-center mx-auto w-full max-w-sm">
              <Image
                alt="crown-reward"
                src="/gif/game/crown-reward.gif"
                fill
                className="object-contain"
              />
            </div>
            <div className="col-span-1 row-span-3 flex justify-center items-start">
              {t && (
                <div className="flex justify-center items-center gap-1">
                  <h2>{t("you_received")}</h2>
                  <h1 className="text-prime">
                    {t("crowns", { crowns: earnedCrowns })}
                  </h1>
                  <h2>{t("received")}</h2>
                </div>
              )}
            </div>
          </>
        )}

        <div className="col-span-1 row-span-1 flex justify-center items-center">
          <ButtonAnimated
            color="prime"
            className="mx-auto !h-16"
            onClick={() => {
              if (!showReward && earnedCrowns > 0) {
                PartyAnimated();
                setShowReward(true);
              } else {
                route.back();
              }
            }}
          >
            <h2>{t("confirm")}</h2>
          </ButtonAnimated>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col grid-rows-12 h-dvh md:h-full w-full bg-base-card gap-5 rounded-none md:rounded-2xl overflow-hidden scrollbar-hidden p-5">
      <div className="col-span-3 row-span-5 sm:row-span-6 relative">
        <Image
          src={`/gif/game/${measurement_type}.gif`}
          alt="amazing"
          fill
          className="object-contain"
        />
      </div>
      <div className="col-span-3 row-span-2 flex justify-center items-center">
        {getMeasurementText(measurement_type)}
      </div>
      <div className="col-span-3 row-span-4 sm:row-span-3 flex justify-center items-center flex-wrap gap-5">
        <div className="w-29 h-24 bg-prime rounded-2xl flex justify-start items-center flex-col p-1 gap-1">
          <h4 className="text-base-card  p-1">{t("your_experience")}</h4>
          <div className="bg-base-card h-full w-full rounded-b-xl flex justify-center items-center">
            <Icon
              name="keyboard_double_arrow_up"
              size="md"
              className="text-warning"
            />
            <h5 className="text-prime">
              <Counter
                value={
                  measurement.step_id === "review"
                    ? 25
                    : correctness_measurement_percentage === 100
                    ? 50
                    : 25
                }
              />

              {t("exp")}
            </h5>
          </div>
        </div>
        <div
          className={`w-29 h-24 ${
            correctness_measurement_percentage < 50
              ? "bg-error"
              : "bg-accent-content"
          }  rounded-2xl flex justify-start items-center flex-col p-1 gap-1`}
        >
          <h4 className="text-base-card p-1">{t("accuracy")}</h4>
          <div className="bg-base-card h-full w-full rounded-b-xl flex justify-center items-center">
            <h5 className="text-accent-content">
              <Counter value={correctness_measurement_percentage || 0} />%
            </h5>
          </div>
        </div>
        <div className="w-29 h-24 bg-info-content rounded-2xl flex justify-start items-center flex-col p-1 gap-1">
          <h4 className="text-base-card  p-1">
            {t(
              getSpeedCategory(
                measurement.spending_time,
                measurement.total_time
              )
            )}
          </h4>
          <div className="bg-base-card h-full w-full rounded-b-xl flex justify-center items-center">
            <div className="text-info-content">
              {formatSecondsToTimeAnimated(measurement.spending_time)}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 row-span-1 flex justify-center items-center">
        <ButtonAnimated
          className="mx-auto !w-48 !h-16"
          onClick={ReceiveEXP}
          color="prime"
          loading={isPending}
        >
          <h3 className="text-inherit">
            {t("measurement_get_experience", {
              exp:
                measurement.step_id === "review"
                  ? 25
                  : correctness_measurement_percentage === 100
                  ? "50"
                  : "25",
            })}
          </h3>
        </ButtonAnimated>
      </div>
    </div>
  );
}
