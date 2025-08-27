"use client";

import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Icon from "@/app/components/base/Icon";
import { UnitStyle } from "@/types/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface SectionTitleProps {
  title: string;
  level: string;
  lesson: string;
  activeStyle: UnitStyle;
}

export function SectionTitle({
  title,
  level,
  lesson,
  activeStyle,
}: SectionTitleProps) {
  const route = useRouter();
  const t = useTranslations("level");
  return (
    <div
      className={`
          mx-auto
          sticky 
          w-full
          top-0 
          z-30 
          mb-4 
          p-3 
          h-28
          transition-all 
          duration-300 
          ease-in-out
          flex justify-center items-center gap-2
          ${activeStyle.background}
          rounded-2xl
        `}
    >
      <ButtonAnimated
        onClick={() => {}}
        color="prime-content"
        className={`w-full h-full relative rounded-xl p-3 flex flex-col justify-start gap-2 items-start !border-0  ${activeStyle.background_content}`}
      >
        <h6 className="w-full flex justify-start items-center text-base-card text-sm">
          <span>{t(level)},</span>
          <span className="mx-2">{t("lesson")}</span>
          <span>{lesson}</span>
        </h6>
        <h3
          className={`         
             text-base-card
          `}
        >
          {title}
        </h3>
      </ButtonAnimated>
      <ButtonAnimated
        color="prime-content"
        className="!w-20 !min-w-20  !min-h-full !h-fit"
        onClick={() => {
          route.push("/shop");
        }}
      >
        <Icon
          className="material-symbols-rounded leading-none"
          name="storefront"
          size="md"
        />
      </ButtonAnimated>
      {/* <Link
        href="/shop"
        className={`btn py-6 h-full flex justify-center items-center rounded-xl text-base-card active:inset-shadow-card-sm-active active:scale-95 inset-shadow-card-sm ${activeStyle.background_content}`}
      ></Link> */}
    </div>
  );
}
