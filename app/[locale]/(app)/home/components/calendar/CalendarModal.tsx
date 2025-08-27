"use client";

import { RangeCalendar } from "@/app/components/calendar/RangeCalendar";
import { Modal } from "@/app/components/modal/Modal";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import React, { useEffect, useState, useTransition } from "react";
import { DateObject } from "react-multi-date-picker";
import { CalendarModalData } from "@/types/calendar";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";

export default function CalendarModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (arg0: boolean) => void;
}) {
  const t = useTranslations("level");
  const [value, setValue] = useState<DateObject[][]>([]);
  const [isInsideTransition, setIsInsideTransition] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [quote, setQuote] = useState("");

  const fetchCalendarData = async () => {
    startTransition(async () => {
      const { data, status } = await FetcherClientSide<CalendarModalData[]>({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/streaks/callendar/`,
        method: "GET",
      });
      if (status === 200 && data) {
        const newData = data.map((item) => {
          const date1 = new DateObject(item.created_at);
          const date2 = new DateObject(item.created_at).add(
            item.completed_days - 1,
            "day"
          );
          return [date1, date2];
        });
        setValue(newData);
      } else if (status === 404) {
        setValue([]);
      }
      setIsInsideTransition(false);
    });
  };

  useEffect(() => {
    if (openModal) {
      fetchCalendarData();
      setQuote(getRandomQuote());
    }
  }, [openModal]);

  const motivationalQuotes = [
    t("powerful_society_quote_1"),
    t("powerful_society_quote_2"),
    t("powerful_society_quote_3"),
    t("powerful_society_quote_4"),
    t("powerful_society_quote_5"),
    t("powerful_society_quote_6"),
    t("powerful_society_quote_7"),
    t("powerful_society_quote_8"),
    t("powerful_society_quote_9"),
    t("powerful_society_quote_10"),
    t("powerful_society_quote_11"),
  ];

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  }

  return (
    <Modal
      className="!bg-[#ffab33] !p-0 "
      size="sm"
      open={openModal}
      setOpen={() => {
        setOpenModal(!openModal);
      }}
    >
      {!isInsideTransition && !isPending ? (
        <>
          <div className="w-full h-auto  flex justify-center items-center gap-5 flex-col py-2 px-5">
            <div className="flex w-full justify-center items-start gap-5">
              <Image
                width={80}
                height={80}
                src="/svg/home/topNav/streakLogo.svg"
                alt="streakLogo"
              />
            </div>
            <div className="bg-amber-500 rounded-xl border-2 border-base-card-content p-2 flex justify-center items-center gap-1">
              <p className="!font-extrabold text-xs">{t("powerful_society")}</p>
            </div>
            <h4 className="bg-base-card/50 w-full rounded-xl p-2 text-center">
              {quote}
            </h4>
          </div>
          <div className="w-full  bg-base-card h-full mt-5 py-5">
            <RangeCalendar value={value} />
            <ButtonAnimated
              color="neutral"
              className="mx-auto !h-16 !min-h-16 mt-5"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              {t("confirm")}
            </ButtonAnimated>
          </div>
        </>
      ) : (
        <div className="skeleton w-full bg-disable/20 rounded-2xl min-h-96 " />
      )}
    </Modal>
  );
}
