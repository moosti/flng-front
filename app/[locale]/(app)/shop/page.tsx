"use client";

import Icon from "@/app/components/base/Icon";
import Image from "next/image";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { RouteBack } from "./components/RouteBack";
import { SpecialCard } from "./components/SpecialCard";
import { NormalCard } from "./components/NormalCard";
import { useTranslations } from "next-intl";
import { userProperties } from "@/app/db/db";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useUserProperties } from "@/app/[locale]/(app)/hook/userProperties";
import { getLanguageFromUrl } from "@/app/utils/GetLanguageFromUrl ";

type ShopCard = {
  title: string;
  description: string;
  title_icon: ReactNode;
  button_title: string;
  button_icon: ReactNode | string;
  styles: {
    btn_color: string;
    colorsAnimate?: string[];
  };
  special?: boolean;
  economic?: boolean;
  onClick?: () => Promise<void>;
};

type ShopData = {
  title: string;
  card: ShopCard[];
};

export default function Shop() {
  const t = useTranslations("shop");
  const [loading, setLoading] = useState(true);
  const [shopData, setShopData] = useState<ShopData[]>([]);
  const {
    heart: heartUser,
    crowns,
    isPending,
    is_premium,
  } = useUserProperties();

  const handlePurchase = async () => {
    const requiredCrowns = (5 - (heartUser || 0)) * 60;
    if (crowns < requiredCrowns) {
      toast.error(t("not_enough_crowns"));
      return;
    }

    if (heartUser >= 5) {
      toast.info(t("hearts_already_full"));
      return;
    }

    const { status } = await FetcherClientSide({
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/shop/filling-up-hearts/`,
      method: "PUT",
    });

    if (status === 204) {
      const properties = await userProperties.toArray();
      await userProperties.put({
        ...properties?.[0],
        heart: 5,
        crowns: crowns - requiredCrowns,
      });

      toast.success(t("purchase_success"));
      return;
    } else {
      toast.error(t("purchase_error"));
    }
  };

  const getHeart = async () => {
    const shopDataMock: ShopData[] = [
      {
        title: t("heart_boost"),
        card: [
          {
            title: t("full_hearts"),
            description: t("full_hearts_des"),
            title_icon: (
              <Image
                src={`/svg/shop/favorite.svg`}
                alt="1"
                width={35}
                height={35}
              />
            ),
            button_title: is_premium
              ? t("you_are_a_premium_user")
              : heartUser === 5
              ? t("hearts_are_full")
              : `${(5 - (heartUser || 0)) * 60}`,
            button_icon:
              !is_premium && heartUser !== 5 ? (
                <Image
                  src={`/svg/shop/crown.svg`}
                  alt="1"
                  width={20}
                  height={20}
                />
              ) : null,
            styles: {
              btn_color: is_premium || heartUser === 5 ? "disable" : "accent",
            },
            onClick:
              !is_premium && heartUser !== 5 ? handlePurchase : undefined,
          },
          {
            title: t("infinite_hearts"),
            special: true,
            description: t("infinite_hearts_des"),
            title_icon: (
              <Image
                src={`/svg/shop/favorite-plus.svg`}
                alt="1"
                width={25}
                height={25}
              />
            ),
            button_title: t("coming_soon"),
            button_icon: "",
            styles: {
              btn_color: "prime",
              colorsAnimate: [
                "var(--theme-color-info-content)",
                "var(--theme-color-prime)",
                "var(--theme-color-prime-content)",
                "var(--theme-color-info)",
                "var(--theme-color-info-content)",
              ],
            },
          },
        ],
      },
      {
        title: t("daily_activity"),
        card: [
          {
            title: t("frozen_day"),
            description: t("frozen_day_des"),
            title_icon: (
              <Image
                src={`/svg/shop/bolt-fill.svg`}
                alt="1"
                width={20}
                height={20}
              />
            ),
            button_title: t("coming_soon"),
            button_icon: (
              <Image
                src={`/svg/shop/crown.svg`}
                alt="1"
                width={20}
                height={20}
              />
            ),
            styles: {
              btn_color: "info",
            },
          },
        ],
      },
      {
        title: t("power_boost"),
        card: [
          {
            title: t("extra_time"),
            description: t("extra_time_des"),
            title_icon: (
              <Image
                src={`/svg/shop/timer.svg`}
                alt="1"
                width={25}
                height={25}
              />
            ),
            button_title: t("coming_soon"),
            button_icon: (
              <Image
                src={`/svg/shop/crown.svg`}
                alt="1"
                width={20}
                height={20}
              />
            ),
            styles: {
              btn_color: "neutral",
            },
          },
        ],
      },
      {
        title: t("crown_packages"),
        card: [
          {
            title: t("bronze_crown_package"),
            description: t("bronze_crown_package_des", { price: "2000" }),
            title_icon: (
              <Image
                src={`/svg/home/daily_challenge/bronze_package.svg`}
                alt="1"
                width={30}
                height={30}
              />
            ),
            // button_title: t("package_price", { price: "18,000" }),
            button_title: t("coming_soon"),
            button_icon: "",
            styles: {
              btn_color: "neutral",
            },
          },
          {
            title: t("silver_crown_package"),
            description: t("silver_crown_package_des", { price: "5000" }),
            title_icon: (
              <Image
                src={`/svg/home/daily_challenge/silver_package.svg`}
                alt="1"
                width={30}
                height={30}
              />
            ),
            // button_title: t("package_price", { price: "24,000" }),
            button_title: t("coming_soon"),
            button_icon: "",
            special: true,
            economic: true,
            styles: {
              btn_color: "neutral",
              colorsAnimate: [
                "var(--theme-color-warning)",
                "var(--theme-color-neutral)",
                "var(--theme-color-neutral-content)",
                "var(--theme-color-warning)",
                "var(--theme-color-warning)",
              ],
            },
          },
          {
            title: t("gold_crown_package"),
            description: t("gold_crown_package_des", { price: "8000" }),
            title_icon: (
              <Image
                src={`/svg/home/daily_challenge/gold_package.svg`}
                alt="1"
                width={30}
                height={30}
              />
            ),
            // button_title: t("package_price", { price: "46,000" }),
            button_title: t("coming_soon"),
            button_icon: "",
            styles: {
              btn_color: "neutral",
            },
          },
        ],
      },
    ];
    setShopData(shopDataMock);
    setLoading(false);
  };

  useEffect(() => {
    if (!isPending) {
      getHeart();
    }
  }, [heartUser, crowns, isPending, t]);

  if (loading || isPending) {
    return <div className="skeleton bg-disable/30 rounded-2xl w-full h-full" />;
  }

  return (
    <Suspense
      fallback={
        <div className="skeleton bg-disable/30 rounded-2xl w-full h-full" />
      }
    >
      <div className="scrollbar-hidden overflow-scroll relative w-full h-full">
        <div className="absolute -end-3 -top-1">
          <RouteBack>
            <Icon name="arrow_back" size="lg" />
          </RouteBack>
        </div>
        {shopData.map((shopItem, shopIndex) => {
          return (
            <div
              key={shopIndex}
              className="w-full flex flex-col justify-center items-center md:items-start mb-20 gap-10"
            >
              <h2>{shopItem.title}</h2>

              <div className="w-full flex justify-center md:justify-start items-center flex-wrap gap-10">
                {shopItem.card.map((cardItem, cardIndex) => {
                  if (cardItem.special) {
                    return (
                      <SpecialCard
                        key={cardIndex}
                        title={cardItem.title}
                        description={cardItem.description}
                        title_icon={cardItem.title_icon}
                        button_title={cardItem.button_title}
                        button_icon={cardItem.button_icon}
                        economic={cardItem.economic}
                        styles={cardItem.styles}
                        onClick={cardItem.onClick}
                      />
                    );
                  }
                  return (
                    <NormalCard
                      key={cardIndex}
                      title={cardItem.title}
                      description={cardItem.description}
                      title_icon={cardItem.title_icon}
                      button_title={cardItem.button_title}
                      button_icon={cardItem.button_icon}
                      styles={cardItem.styles}
                      onClick={cardItem.onClick}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
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
    </Suspense>
  );
}
