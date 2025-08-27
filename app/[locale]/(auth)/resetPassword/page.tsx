"use client";

import InputField from "@/app/components/inputs/inputField/InputField";
import LoadingSpin from "@/app/components/loading/LoadingSpin";
import { fetcher } from "@/utils/Fetcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  phoneNumber: string;
};

export default function ResetPassword() {
  const t = useTranslations("login");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const res = await fetcher({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/reset-password/`,
        method: "POST",
        data: data,
      });

      if (res.status === 200) {
        toast.success(t("a_verification_code_has_been_sent_to_you"));
        redirect("/resetPassword/verify");
      } else if (res.status === 401) {
        toast.error(t("activate_your_account_first"));
      } else if (res.status === 404) {
        toast.error(t("there_is_no_account_with_the_provided_info"));
      } else if (res.status === 422) {
        toast.error(t("there_is_a_problem_Please_message_support"));
      } else if (res.status === 429) {
        toast.error(t("this_IP_has_been_blocked_due_to_excessive_requests"));
      } else if (res.status === 500) {
        toast.error(t("there_is_a_database_error_please_try_again_later"));
      }
    });
  };

  return (
    <div className="w-full md:w-1/2 min-w-72 flex justify-center items-center flex-col flex-1">
      <form
        className="my-5 flex flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>{t("forgot_your_password")}</h3>
        <InputField
          name="phoneNumber"
          label={t("phone_number")}
          type="tel"
          placeholder={t("example", { example: "09190630383" })}
          icon={
            <Image
              src="/svg/login/call.svg"
              alt="email"
              width={21}
              height={21}
            />
          }
          register={register}
          validations={{
            required: t("isRequired"),
            maxLength: {
              value: 11,
              message: t("phone_number_validation", { length: 11 }),
            },
            minLength: {
              value: 11,
              message: t("phone_number_validation", { length: 11 }),
            },
          }}
          error={
            errors.phoneNumber as {
              type: string;
              message: string;
            }
          }
        />

        <button
          type="submit"
          className="btn btn-prime inset-shadow-card-sm active:inset-shadow-card-sm-active py-4 w-1/2"
        >
          {!isPending ? (
            <h3 className="truncate text-inherit">{t("submit")}</h3>
          ) : (
            <LoadingSpin />
          )}
        </button>
      </form>
    </div>
  );
}
