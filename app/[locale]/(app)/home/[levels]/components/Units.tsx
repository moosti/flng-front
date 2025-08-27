"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrackerUnits } from "./ScrollTrackerUnits";
import { Step, Lesson } from "@/types/types";
import Image from "next/image";
import Icon from "@/app/components/base/Icon";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";
import _ from "lodash";
import { Roadmap } from "@/app/components/roadmap/Roadmap";
import { useRouter } from "next/navigation";
import { useUnits } from "../hooks/useUnits";
import { formatSecondsToTime } from "@/app/utils/utils";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { gameStructure } from "../hooks/gameStructure";
import { games } from "@/app/db/db";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import { Modal } from "@/app/components/modal/Modal";

const hasAnyNonNotStarted = (steps: Step[]): boolean => {
  return steps.some((step) => step.step_state !== "not_started");
};

const areAllCompleted = (steps: Step[]): boolean => {
  return steps.every((step) => step.step_state === "completed");
};

export function Units({
  sectionId,
  levels,
}: {
  sectionId: string;
  levels: string;
}) {
  const router = useRouter();
  const t = useTranslations("level");
  const { units: data, loading } = useUnits(sectionId, levels);
  const [openModalUpdateData, setModalUpdateData] = useState(false);

  const refetchGameData = async () => {
    await games.clear();
    // Delete all databases
    const databases = await window.indexedDB.databases();
    await Promise.all(
      databases.map((db) => db.name && window.indexedDB.deleteDatabase(db.name))
    );
    window.location.reload();
  };

  const getGameUrl = (
    lesson: Lesson,
    done: boolean,
    stepRun: number
  ): string => {
    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS;

    if (done) {
      return lesson.lesson_type === "flashcard"
        ? `${baseUrl}/games/review-flashcard/${lesson.steps[0].step_id}/`
        : `${baseUrl}/games/review-lesson/${lesson.lesson_id}/`;
    }
    return `${baseUrl}/games/all-games/${lesson.steps[stepRun].step_id}/`;
  };

  const handleGameStart = async (
    lesson: Lesson,
    done: boolean,
    stepRun: number,
    unitId: number
  ) => {
    try {
      const { data: gameData, status } = await FetcherClientSide({
        url: getGameUrl(lesson, done, stepRun),
        method: "GET",
      });

      console.log("result res game", status, gameData);

      if (
        gameData &&
        status === 403 &&
        typeof gameData === "object" &&
        "detail" in gameData &&
        (gameData.detail === "You have already finished this step." ||
          gameData.detail === "You have not achieved this step yet.")
      ) {
        setModalUpdateData(true);
        return;
      }

      if (!gameData || typeof gameData !== "object" || !("games" in gameData)) {
        throw new Error("Invalid game data received");
      }

      await games.clear();
      await gameStructure({
        data: gameData.games,
        type: lesson.lesson_type,
        step_id: done ? "review" : lesson.steps[stepRun].step_id,
        lesson_id: lesson.lesson_id,
        unit_id: unitId,
        estimate_time_sec:
          "estimate_time_sec" in gameData
            ? (gameData.estimate_time_sec as number)
            : 0,
      });

      router.push("/game/");
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const [prevUnit, setPrevUnit] = useState<number>(0);
  const [activeUnit, setActiveUnit] = useState<number>(1);
  const runningStepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading && runningStepRef.current) {
      runningStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      const newActiveUnit = parseInt(
        runningStepRef.current
          ?.closest("[data-section]")
          ?.getAttribute("data-section") || "1"
      );
      setActiveUnit(newActiveUnit);
      setPrevUnit(newActiveUnit - 1);
    }
  }, [loading, data]);

  if (loading) {
    return <div className="w-full h-full bg-disable/40 skeleton rounded-2xl" />;
  }

  return (
    <div className="w-full h-auto flex justify-start flex-col items-center px-5">
      <SectionTitle
        activeStyle={data[activeUnit - 1].styles}
        title={data[activeUnit - 1].unit_description || ""}
        level={data[activeUnit - 1].section}
        lesson={`${activeUnit}`}
      />
      <ScrollTrackerUnits
        prevUnit={prevUnit}
        setPrevUnit={setPrevUnit}
        activeUnit={activeUnit}
        setActiveUnit={setActiveUnit}
        max={data.length}
      />
      {data?.map((levelItem, levelIndex) => {
        return (
          <div
            className={`w-full relative min-w-96 bg-base-card flex flex-col justify-start items-center`}
            key={levelIndex}
            data-section={levelIndex + 1}
          >
            {levelIndex > 0 ? (
              <div className={`w-full my-30 flex justify-center items-center`}>
                <div className="absolute w-full h-1 bg-disable/20 rounded-full"></div>
                <h3 className={`bg-base-card z-10 px-5`}>
                  {levelItem.unit_description}
                </h3>
              </div>
            ) : (
              <div className={`w-full h-10`} />
            )}
            {levelItem.lessons.map((lesson, lessonIndex) => {
              const disabled = hasAnyNonNotStarted(lesson.steps);
              const done = areAllCompleted(lesson.steps);
              const stepRun = _.findIndex(lesson.steps, {
                step_state: "running",
              });
              const currentLessonDone =
                localStorage.getItem("lesson_done") &&
                localStorage.getItem("lesson_done") === `${lesson.lesson_id}`
                  ? true
                  : false;

              return (
                <div
                  dir="ltr"
                  key={`unit_${lessonIndex + 1}`}
                  ref={stepRun >= 0 ? runningStepRef : null}
                  className="min-w-65.5 max-w-65.5 mx-auto flex flex-col justify-center -gap-5 items-center"
                >
                  <Roadmap
                    onClick={() =>
                      handleGameStart(lesson, done, stepRun, levelItem.unit_id)
                    }
                    key={`lesson_${lessonIndex + 1}`}
                    path={lesson.path}
                    color="#a69aeb"
                    width="20"
                    disabled={!disabled}
                    done={done}
                    animatePath={currentLessonDone}
                    lastIndex={lessonIndex === levelItem.lessons.length - 1}
                    running={stepRun < 0 ? true : false}
                    tooltip={
                      stepRun >= 0 && (
                        <div className="flex justify-center items-center gap-2 flex-col">
                          <div className="flex justify-center items-center gap-2 opacity-65">
                            <Icon name="timer" size="md" />
                            <div>
                              {formatSecondsToTime(
                                lesson.steps[stepRun].step_estimate_time
                              )}
                            </div>
                          </div>
                          <button className="btn bg-prime-content text-base-card py-1">
                            <Icon name="keyboard_double_arrow_up" size="md" />
                            <h4 className="text-inherit flex justify-center items-center gap-1">
                              <span>25</span>
                              <span>{t("exp")}</span>
                            </h4>
                          </button>
                        </div>
                      )
                    }
                    lessonIcon={
                      done ? (
                        <Icon name="check" size="md" />
                      ) : lesson.lesson_type === "exam" ? (
                        <Image
                          src="/svg/lessonType/exam.svg"
                          alt="exam"
                          width={45}
                          height={45}
                        />
                      ) : lesson.lesson_type === "exercise" ? (
                        <Image
                          src="/svg/lessonType/exercise.svg"
                          alt="exercise"
                          width={45}
                          height={45}
                        />
                      ) : lesson.lesson_type === "flashcard" ? (
                        <Image
                          src="/svg/lessonType/flashcard.svg"
                          alt="exam"
                          width={45}
                          height={45}
                        />
                      ) : (
                        lesson.lesson_type === "practice" && (
                          <Image
                            src="/svg/lessonType/practice.svg"
                            alt="exam"
                            width={45}
                            height={45}
                          />
                        )
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <Modal
        open={openModalUpdateData}
        setOpen={() => setModalUpdateData(!openModalUpdateData)}
        size="sm"
        closeOff
      >
        <div className="flex w-full flex-col justify-center items-center gap-10 p-4">
          <div className="flex justify-center items-center gap-2">
            <Icon name="autorenew" size="md" className="text-info" />
            <h4>{t("game_information_needs_to_be_updated")}</h4>
          </div>
          <div className="text-center">
            <p className="inline">{t("you_are_using_another_device")} </p>
            <h4 className="text-info inline mt-1 !font-bold">
              {t("click_Continue_to_play")}
            </h4>
          </div>
          {/* <div className="flex justify-start items-center gap-0">
            <p>{t("you_are_using_another_device")}</p>
            <p className="text-info">{t("click_Continue_to_play")}</p>
          </div> */}

          <ButtonAnimated
            color="info"
            className="!h-16 !min-h-16"
            onClick={async () => {
              await refetchGameData();
            }}
          >
            <h3 className="text-inherit">{t("continue")}</h3>
          </ButtonAnimated>
        </div>
      </Modal>
    </div>
  );
}
