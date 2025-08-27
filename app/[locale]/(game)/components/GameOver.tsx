"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GameOver({
  isVisible,
  type,
  onClick,
}: {
  isVisible: boolean;
  type: "lost_heart" | "end_time";
  onClick: () => void | undefined;
}) {
  const router = useRouter();
  const t = useTranslations("game");

  useEffect(() => {
    if (isVisible) {
      if (type === "lost_heart") {
        const audio = new Audio("/audio/game/wrong answer.wav");
        audio.play();
      }
    }
  }, [type, isVisible]);

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <>
          <motion.div className="z-20 absolute top-0 bottom-0 right-0 left-0 cursor-no-drop"></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 120,
              duration: 0.3,
              ease: "backInOut",
            }}
            className={`absolute bottom-5  w-full h-auto rounded-t-[80px] ${
              type === "lost_heart" ? "bg-[#ff7a81]" : "bg-[#ff7a81]"
            } text-base-card flex justify-center items-center z-30 px-8 py-5`}
          >
            {type === "lost_heart" ? (
              <div className="flex justify-center items-center flex-col gap-5 w-full">
                <div className="flex justify-start items-center gap-2">
                  {/* <Image
                    src="/svg/game/tick-circle-new.svg"
                    alt="correct"
                    width={30}
                    height={30}
                  /> */}
                  <h2 className="text-base-card">
                    {t("you_out_of_hearts_you_need_to_refill_them")}
                  </h2>
                </div>
                <div className="flex w-full justify-center items-center gap-16">
                  <ButtonAnimated
                    onClick={onClick}
                    className="!w-auto !min-w-20 !h-20 !min-h-20 !p-1 !rounded-2xl  gap-2"
                    color="success"
                  >
                    <Image
                      src="/svg/home/sideMenu/shop.svg"
                      alt="correct"
                      width={60}
                      height={60}
                    />
                    <h3 className="text-inherit">{t("shop")}</h3>
                  </ButtonAnimated>

                  <button
                    className="cursor-pointer transition-all duration-300 text-base-card/60 hover:text-base-card"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <h3 className="text-inherit">{t("cancellation")}</h3>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
