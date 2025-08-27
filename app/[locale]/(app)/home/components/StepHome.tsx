import Icon from "@/app/components/base/Icon";
import ProgressBar from "@/app/components/base/ProgressBar";
import { Section } from "@/types/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getStepStyle } from "../utils/stepStyles";

export default async function StepHome(props: Section) {
  const t = await getTranslations("level");
  const styles = getStepStyle(props.section_title);
  const disabled = props.section_status === "not_started";

  return (
    <div
      className={`p-5 w-full rounded-3xl ${
        disabled ? "bg-disable/50" : styles.background
      }`}
    >
      <div
        className={`w-full min-h-56 h-auto flex flex-col justify-between gap-5 px-6 py-6 text-base-card rounded-2xl inset-shadow-card-sm ${
          disabled ? "bg-disable" : styles.background_content
        }`}
      >
        <div className="flex w-full h-full justify-around items-center sm:items-center gap-5 flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-2/3 p-3 h-full bg-base-card rounded-2xl flex flex-col justify-center items-center gap-3">
            <h2
              className={`text-center ${
                disabled ? "text-base-card-content" : styles.text
              }`}
            >
              {t(props.section_title)}
            </h2>
            <p className="max-w-96 hidden md:flex text-wrap text-center mx-auto rounded-full text text-sm px-2 py-2 bg-base-card text-base-card-content">
              {/* {t("at_this_level_you_will_learn_the_most_basic_conversations")} */}
              {props.section_description}
            </p>
            {!disabled ? (
              <div className="w-full flex justify-between items-center">
                <div className="w-4/4">
                  <ProgressBar
                    percent={
                      props.total_units &&
                      props.completed_units &&
                      props.completed_units > 0
                        ? (props.completed_units / props.total_units) * 100
                        : 0
                    }
                    placeHolder={`${props.completed_units} ${t("of")} ${
                      props.total_units
                    }`}
                    color={styles.background_content}
                    placeHolderClass="text-base-card-content"
                  />
                </div>
                {/* <div
                  className={`w-1/4 flex justify-center items-center gap-1 ${
                    disabled ? "text-disable" : styles.text
                  }`}
                >
                  <h5 className="text-xs text-inherit">
                    {props.completed_units}
                  </h5>
                  <h5 className="text-xs text-inherit">{t("of")}</h5>
                  <h5 className="text-xs text-inherit">{props.total_units}</h5>
                </div> */}
              </div>
            ) : (
              <div className="flex justify-start items-center gap-1 text-xs">
                <Icon
                  className="material-symbols-outlined opacity-60 !text-base-card-content"
                  name="lock_open"
                  size="sm"
                />
                {/* <h4 className="opacity-60 !text-sm">{props.total_units}</h4> */}
                <h4 className="opacity-60 !text-sm">46</h4>

                <h4 className="opacity-60 !text-sm">{t("course_units")}</h4>
              </div>
            )}

            <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between gap-2 items-center mt-3 sm:mt-0">
              <Link
                href={`/home/${props.section_title}`}
                className={`btn !rounded-full text-base-card text-nowrap ${
                  disabled
                    ? "bg-disable pointer-events-none"
                    : styles.background
                }`}
                aria-disabled={disabled}
              >
                {disabled ? (
                  <h4 className="!text-base-card">{t("start")}</h4>
                ) : props.section_status === "started" ? (
                  <h4 className="!text-base-card">{t("continue")}</h4>
                ) : (
                  props.section_status === "completed" && (
                    <h4 className="!text-base-card">{t("completed")}</h4>
                  )
                )}
              </Link>

              {/* <button disabled={disabled} className="btn text-nowrap">
                <h4>{t("see_details")}</h4>
              </button> */}
            </div>
          </div>
          <div className="relative w-full h-full sm:w-1/3">
            <Image
              src={`/svg/home/levels/${props.section_title}_logo.svg`}
              alt={props.section_title}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
