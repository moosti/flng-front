"use client";

import Icon from "@/app/components/base/Icon";
import { CalendarData, CalendarDay } from "@/types/calendar";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/modal/Modal";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import Image from "next/image";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";

export interface streakProps {
  refetch: () => void;
  calendar: CalendarDay[] | null;
  committedDays: number;
  completedDays: number;
}

export default function Calendar({
  refetch,
  calendar,
  committedDays,
  completedDays,
}: streakProps) {
  const t = useTranslations("level");
  const tLogin = useTranslations("login");
  const [isPendingSubmit, startTransitionSubmit] = useTransition();
  const [committedDaysModal, setCommittedDaysModal] = useState<boolean>(false);
  const [committedDaysInput, setCommittedDaysInput] = useState<number | null>();

  const streakReward = [
    { day: 7, crown: 50 },
    { day: 14, crown: 100 },
    { day: 30, crown: 220 },
  ];

  const onSubmit = () => {
    startTransitionSubmit(async () => {
      const { status } = await FetcherClientSide<CalendarData>({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/streaks/commit-streak/`,
        method: "POST",
        data: { committed_days: committedDaysInput },
      });

      startTransitionSubmit(async () => {
        if (status === 200) {
          setCommittedDaysModal(false);
          setCommittedDaysInput(null);
          refetch();
        }
      });
    });
  };

  if (calendar) {
    return (
      <div className="w-full bg-base-card border-card-border-color px-5 py-6 rounded-2xl mb-5">
        <div className="w-full flex justify-between items-center mb-10">
          <h2 className="text-prime">{t("daily_activity")}</h2>
          <div className="flex justify-center items-center">
            <h2>{completedDays}</h2>
            <Icon
              className="material-symbols-rounded leading-none text-prime bg"
              name="bolt"
              size="lg"
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 flex-wrap">
          {calendar.map((calendarItem, calendarIndex) => (
            <div
              key={calendarIndex}
              className={`${
                calendarItem.done
                  ? "border-prime text-prime"
                  : calendarItem.frozenDays
                  ? "border-info-content text-info-content"
                  : calendarItem.missed
                  ? "border-error text-error"
                  : "border-disable text-disable"
              } border-3 w-13 h-13 rounded-full p-2 flex justify-center items-center cursor-pointer`}
            >
              <Icon
                className="material-symbols-rounded leading-none"
                name="bolt"
                size="md"
              />
            </div>
          ))}
          <div className="flex justify-end items-center">
            <button className="btn text-base-card bg-prime gap-1 rounded-2xl">
              <Icon
                className="material-symbols-rounded leading-none"
                name="flag"
                size="lg"
              />
              <p className="me-1 text-base-card">{t("target")}:</p>
              <p className="text-base-card">{completedDays}</p>
              <p className="text-base-card">{t("of")}</p>
              <p className="text-base-card">{committedDays}</p>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full bg-base-card border-card-border-color px-5 min-h-20 h-auto py-3 flex justify-center items-center rounded-2xl mb-5">
        <ButtonAnimated
          color="disable"
          className="!min-h-14 !h-auto"
          onClick={() => {
            setTimeout(() => {
              setCommittedDaysModal(true);
            }, 150);
          }}
        >
          <h3 className="text-inherit text-wrap">
            {t("choose_your_commitment_days")}
          </h3>
        </ButtonAnimated>
        <Modal
          size="md"
          open={committedDaysModal}
          setOpen={() => {
            setCommittedDaysModal(!committedDaysModal);
            setCommittedDaysInput(null);
          }}
        >
          <div className="w-full flex justify-center items-center my-10">
            <h2 className="text-base-card-content/90">
              {t("collect_more_crowns_with_daily_activity")}
            </h2>
          </div>
          <div className="flex justify-center items-center gap-5 flex-wrap">
            {streakReward.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (committedDaysInput === item.day) {
                      setCommittedDaysInput(null);
                    } else {
                      setCommittedDaysInput(item.day);
                    }
                  }}
                  className={`btn group ${
                    committedDaysInput == item.day
                      ? "text-info border-info-content/50 bg-info-content/20 border-b-4"
                      : "btn-outline text-[#4b4b4b] border-[#e5e5e5] bg-base-card hover:bg-[#f7f7f7] hover:text-base-card-content/80 border-b-8"
                  } w-30 h-30 flex flex-col gap-1.5 active:border-b-4 justify-around transition-all duration-200 ease-linear items-center border-4 rounded-2xl p-2`}
                >
                  <div className="flex justify-center items-center gap-1.5 w-full">
                    <h3 className="text-inherit">{item.day}</h3>
                    <h3 className="text-inherit">{t("day")}</h3>
                  </div>

                  <div className="flex justify-center items-center gap-1.5">
                    <div className="relative w-5 h-4">
                      <Image
                        src="/svg/home/topNav/crown.svg"
                        alt="crown"
                        width={20}
                        height={20}
                        className="absolute transition-opacity duration-200 opacity-100"
                      />
                    </div>

                    <h2 className="text-inherit !text-lg">{item.crown}</h2>
                  </div>
                </button>
              );
            })}
          </div>
          <ButtonAnimated
            color="prime"
            loadingSize="sm"
            loading={isPendingSubmit}
            disabled={isPendingSubmit || typeof committedDaysInput !== "number"}
            className="mx-auto min-h-14 !h-auto mt-14"
            onClick={() => {
              if (!isPendingSubmit && typeof committedDaysInput === "number") {
                setTimeout(() => {
                  onSubmit();
                }, 150);
              }
            }}
          >
            <h3 className="truncate text-inherit">{tLogin("submit")}</h3>
          </ButtonAnimated>
        </Modal>
      </div>
    );
  }
}
