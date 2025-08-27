"use client";

import LoadingSpin from "@/components/loading/LoadingSpin";
import { fetcher } from "@/utils/Fetcher";
import InputField from "@/components/inputs/inputField/InputField";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import VerificationCode from "@/components/inputs/inputField/VerificationCode";
import { toast } from "react-toastify";

type Inputs = {
  confirmPassword: string;
  password: string;
  randomCode: string;
};

export default function Verify() {
  const t = useTranslations("login");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const res = await fetcher({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/reset-password/verify/`,
        method: "PUT",
        data: data,
      });
      if (res.status === 204) {
        toast.success(t("password_updated_successfully"));
        redirect("/login");
      } else if (res.status === 404) {
        toast.error(t("the_verification_code_is_incorrect"));
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
        <h3>{t("enter_your_new_password")}</h3>
        <InputField
          name="password"
          label={t("password")}
          type="password"
          placeholder={t("enter_here")}
          icon={
            <Image
              src="/svg/login/key.svg"
              alt="email"
              width={21}
              height={21}
            />
          }
          register={register}
          validations={{
            required: t("isRequired"),
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message: t("password_validation"),
            },
          }}
          error={
            errors.password as {
              type: string;
              message: string;
            }
          }
        />

        <InputField
          name="confirmPassword"
          label={t("confirmPassword")}
          type="password"
          placeholder={t("enter_here")}
          icon={
            <Image
              src="/svg/login/key.svg"
              alt="confirmPassword"
              width={21}
              height={21}
            />
          }
          register={register}
          validations={{
            required: t("isRequired"),
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message: t("password_validation"),
            },
          }}
          error={
            errors.confirmPassword as {
              type: string;
              message: string;
            }
          }
        />

        <div className="flex justify-center items-center flex-col gap-2">
          <h4>{t("verification_code")}</h4>
          <Controller
            render={({ field }) => (
              <VerificationCode
                {...field}
                onSubmit={(code) => {
                  setValue("randomCode", code);
                }}
                setValueState={(code) => {
                  setValue("randomCode", code);
                }}
                {...register("randomCode", {
                  required: "required",
                  minLength: 6,
                  maxLength: 6,
                })}
              />
            )}
            control={control}
            name="randomCode"
          />

          {errors.randomCode && (
            <p className="text-xs text-error">{t("isRequired")}</p>
          )}
        </div>

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
