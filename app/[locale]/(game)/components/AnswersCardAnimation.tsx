"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";

export default function ExitAnimation({
  isVisible,
  correct,
  onClick,
  children,
}: {
  isVisible: boolean;
  correct: boolean;
  onClick: () => void | undefined;
  children?: ReactNode;
}) {
  const t = useTranslations("game");

  useEffect(() => {
    if (isVisible) {
      if (correct) {
        const audio = new Audio("/audio/game/correct-answer.wav");
        audio.play();
      } else {
        const audio = new Audio("/audio/game/wrong answer.wav");
        audio.play();
      }
    }
  }, [correct, isVisible]);

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
            className={`absolute bottom-5 translate-x-5 w-full h-auto rounded-t-[80px] ${
              correct ? "bg-[#55c400]" : "bg-[#ff7a81]"
            } text-base-card flex justify-center items-center z-30 px-8 py-5`}
          >
            {correct ? (
              <div className="flex justify-center items-center flex-col gap-5 w-full">
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src="/svg/game/tick-circle-new.svg"
                    alt="correct"
                    width={30}
                    height={30}
                  />
                  <h2 className="text-base-card">{t("you_were_great")}</h2>
                </div>
                <ButtonAnimated
                  onClick={onClick}
                  className="!w-44 !h-16 !p-1 !rounded-2xl"
                  color="success"
                >
                  <h3 className="text-inherit">{t("continue")}</h3>
                </ButtonAnimated>
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col gap-5 w-full">
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src="/svg/game/close-circle-new.svg"
                    alt="incorrect"
                    width={30}
                    height={30}
                  />
                  <h2 className="text-base-card">
                    {t("you_answered_incorrectly")}
                  </h2>
                </div>
                {children}
                <ButtonAnimated
                  onClick={onClick}
                  className="!w-44 !h-16 !p-1 !rounded-2xl"
                  color="error"
                >
                  <h3 className="text-inherit">بگذریم</h3>
                </ButtonAnimated>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
