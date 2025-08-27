"use client";

import ProgressBar from "@/app/components/base/ProgressBar";
import Icon from "@/app/components/base/Icon";
import Image from "next/image";
import { DailyChallengeDataType } from "@/types/dailyChallenge";
import CountdownTimer from "@/app/components/countdown/CountdownTimer";
import { useTranslations } from "next-intl";

export default function DailyChallenge({
  remaining_time,
  challenges,
}: DailyChallengeDataType) {
  const t = useTranslations("level");

  const challengeTitle = ({ type }: { type: string }) => {
    let title;
    switch (type) {
      case "lesson_complete":
        title = t("lesson");
        break;
      case "lesson_without_mistake":
        title = t("lesson_without_mistake");
        break;
      case "review_lesson":
        title = t("review_lesson");
        break;
      case "eighty_percent_lesson_score":
        title = t("eighty_percent_score_lesson");
        break;
      case "invitation":
        title = t("invitation");
        break;
      default:
        title = t("lesson");
        break;
    }

    return title;
  };

  return (
    <div className="w-full min-h-52 h-fit bg-base-card border-card-border-color px-5 py-6 rounded-2xl mb-5">
      <div className="w-full flex justify-between items-center mb-10 gap-5 flex-wrap">
        <h2 className="text-prime">{t("daily_challenge")}</h2>

        <div className="flex justify-center items-center gap-1 text-prime">
          {remaining_time && (
            <>
              <Icon
                className="material-symbols-rounded leading-none text-prime bg"
                name="schedule"
                size="md"
              />
              <div>
                <CountdownTimer
                  targetDate={new Date(remaining_time)}
                  show={["day", "hour", "min"]}
                  className="!text-prime text-lg"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-4">
        {challenges.map((challengeItem, challengeIndex) => {
          return (
            <div
              key={challengeIndex}
              className="flex justify-center items-center gap-0 flex-col w-full"
            >
              <p className="flex justify-center items-center gap-1 -me-10">
                {/* <span>{t("complete")}</span> */}
                {/* <span>{challengeItem.duration}</span> */}
                <span>{challengeTitle({ type: challengeItem.type })}</span>
              </p>
              <div className="flex justify-center items-center w-full">
                <Image
                  src={`/svg/home/daily_challenge/${
                    challengeItem.type === "lesson_without_mistake"
                      ? "bolt"
                      : challengeItem.type === "invitation"
                      ? "Letter"
                      : challengeItem.type === "lesson_complete" ||
                        challengeItem.type === "eighty_percent_lesson_score"
                      ? "goal"
                      : challengeItem.type === "review_lesson" && "review"
                  }.svg`}
                  alt={challengeItem.type}
                  width={40}
                  height={40}
                  className="me-2"
                />
                <ProgressBar
                  placeHolder={`${challengeItem.checked_times || 0} / ${
                    challengeItem.duration
                  }`}
                  percent={
                    challengeItem.checked_times > 0
                      ? (challengeItem.checked_times / challengeItem.duration) *
                        100
                      : 0
                  }
                  color="bg-prime-content"
                />
                <Image
                  src={`/svg/home/daily_challenge/${
                    challengeItem.difficulty === "easy"
                      ? "bronze"
                      : challengeItem.difficulty === "medium"
                      ? "silver"
                      : "gold"
                  }_package.svg`}
                  alt="1"
                  width={40}
                  height={40}
                  className="-ms-3 z-10"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
