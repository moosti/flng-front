"use client";

import { useUserProperties } from "@/app/[locale]/(app)/hook/userProperties";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import CalendarModal from "@/app/[locale]/(app)/home/components/calendar/CalendarModal";
import Notification from "../notification/Notification";

export function TopNavContent() {
  const level = useTranslations("level");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { isPending, heart, is_premium, completedDays, crowns } =
    useUserProperties();

  return (
    <div className="flex w-full justify-start items-center flex-wrap gap-2 lg:gap-5">
      {!isPending ? (
        <>
          <button
            onClick={() => setOpenModal(true)}
            className="flex justify-center items-center gap-2 cursor-pointer active:bg-disable/20 hover:bg-disable/20 p-3 rounded-xl transition-all duration-300"
          >
            <Image
              width={25}
              height={25}
              alt="streak"
              src="/svg/home/topNav/streak.svg"
            />

            <h5 className="text-amber-500">
              {completedDays} {level("day")}
            </h5>
          </button>

          <button className="flex justify-center items-center gap-1 active:bg-disable/20 hover:bg-disable/20 p-3 rounded-xl transition-all duration-300">
            {!is_premium ? (
              <Image
                width={30}
                height={35}
                alt="heart"
                src="/svg/home/topNav/heart.svg"
              />
            ) : (
              <Image
                width={25}
                height={25}
                alt="heart"
                src="/svg/home/topNav/heart_primium.svg"
              />
            )}

            {!is_premium && <h5 className="text-error">{heart}</h5>}
          </button>
          <button className="flex justify-center items-center gap-1 active:bg-disable/20 hover:bg-disable/20 p-3 rounded-xl transition-all duration-300">
            <Image
              src="/svg/home/topNav/crown.svg"
              alt="crown"
              width={30}
              height={30}
            />

            <h5 className="text-[#FFC800] mt-1.5">{crowns}</h5>
          </button>
          {/* <Link href="shop">
            <button className="btn btn-outline btn-prime hidden sm:flex">
              <Icon
                className="material-symbols-rounded leading-none"
                name="storefront"
                size="sm"
              />
              <h5 className="text-primary group-hover/item:!text-white">
                {menu("shop")}
              </h5>
            </button>
          </Link> */}
          <div className="ms-auto">
            <Notification />
          </div>
        </>
      ) : (
        <div className="w-full h-7 bg-disable/30 rounded-2xl" />
      )}

      <CalendarModal
        openModal={openModal}
        setOpenModal={(val) => setOpenModal(val)}
      />
    </div>
  );
}
