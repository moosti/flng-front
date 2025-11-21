"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import InputField from "@/app/components/inputs/inputField/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetcher } from "@/utils/Fetcher";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Link from "next/link";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
};

const RegisterForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();
  const password = watch("password");

  const [isPending, startTransition] = useTransition();
  const [activeForm, setActiveForm] = useState<number>(1);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const res = await fetcher({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/register/`,
        method: "POST",
        data: data,
      });

      if (res.status === 201) {
        toast.success(
          t("registration_was_successful_please_confirm_your_account")
        );
        redirect("/verifyAccount?from=register");
      } else if (res.status === 404) {
        toast.error(t("the_referral_code_is_not_valid"));
      } else if (res.status === 409) {
        toast.error(t("a_user_with_this_information_exists"));
        setActiveForm(1);
      } else if (res.status === 422) {
        toast.error(t("there_is_a_problem_Please_message_support"));
        setActiveForm(1);
      } else if (res.status === 429) {
        toast.error(t("this_IP_has_been_blocked_due_to_excessive_requests"));
        setActiveForm(1);
      } else if (res.status === 500) {
        toast.error(t("there_is_a_database_error_please_try_again_later"));
        setActiveForm(1);
      }
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-3xl w-full md:text-4xl lg:text-5xl text-center mb-2">
        {locale === "fa" ? (
          <div className="flex flex-wrap justify-center items-center gap-2 mb-1">
            <h1>به</h1>
            <h1 className="text-prime">شناخت</h1>
            <h1 className="whitespace-nowrap">خوش آمدید</h1>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
            <h1>Welcome</h1>
            <h1>to</h1>
            <h1 className="text-primary">Shenakht</h1>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center text-center gap-2">
        <h2 className="text-xl md:text-2xl border-b sm:border-b-0 sm:border-e border-disable/50 px-3 pb-2 sm:pb-0">
          {t("register")}
        </h2>
        <p className="px-3">
          {t("complete_the_information_below_to_register")}
        </p>
      </div>

      <form
        className="w-full space-y-4"
        onSubmit={(e: React.FormEvent) => e.preventDefault()}
      >
        {activeForm === 1 ? (
          <>
            <InputField
              name="email"
              label={t("email")}
              type="email"
              placeholder={t("example", { example: "fekroneh@gmail.com" })}
              icon={
                <Image
                  src="/svg/login/sms.svg"
                  alt="email"
                  width={21}
                  height={21}
                />
              }
              register={register}
              validations={{
                required: t("isRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("enter_a_valid_email_address"),
                },
              }}
              error={errors.email as { type: string; message: string }}
            />

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
                minLength: {
                  value: 8,
                  message: t("password_validation", { length: 8 }),
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
                minLength: {
                  value: 8,
                  message: t("password_validation", { length: 8 }),
                },
                validate: (value: string) =>
                  value === password || t("passwords_do_not_match"),
              }}
              error={
                errors.confirmPassword as {
                  type: string;
                  message: string;
                }
              }
            />
          </>
        ) : (
          <>
            <InputField
              name="firstName"
              label={t("firstName")}
              type="text"
              placeholder={t("firstName")}
              inputKey="firstName"
              icon={
                <Image
                  src="/svg/login/user.svg"
                  alt="firstName"
                  width={21}
                  height={21}
                />
              }
              register={register}
              validations={{ required: t("isRequired") }}
              error={errors.firstName as { type: string; message: string }}
            />

            <InputField
              name="lastName"
              label={t("lastName")}
              type="text"
              inputKey="lastName"
              placeholder={t("lastName")}
              icon={
                <Image
                  src="/svg/login/user.svg"
                  alt="lastName"
                  width={21}
                  height={21}
                />
              }
              register={register}
              validations={{ required: t("isRequired") }}
              error={errors.lastName as { type: string; message: string }}
            />

            <InputField
              name="referralCode"
              label={t("referralCode")}
              type="text"
              inputKey="referralCode"
              placeholder={t("referralCode")}
              icon={
                <Image
                  src="/svg/login/referralCode.svg"
                  alt="referralCode"
                  width={21}
                  height={21}
                />
              }
              register={register}
              validations={{
                maxLength: {
                  value: 10,
                  message: t("referral_code_validation", { length: 10 }),
                },
                minLength: {
                  value: 10,
                  message: t("referral_code_validation", { length: 10 }),
                },
              }}
              error={errors.referralCode as { type: string; message: string }}
            />
          </>
        )}
        <Link href="/login" className="block text-center">
          <h5 className="opacity-75 flex flex-wrap justify-center items-center gap-2">
            <span className="text-prime cursor-pointer">
              {t("do_you_have_an_account")}
            </span>
            <span>{t("login_to_the_falingo")}</span>
          </h5>
        </Link>
        <div className="flex flex-col-reverse md:flex-row justify-center lg:justify-between items-center flex-wrap w-full gap-4">
          {activeForm === 2 ? (
            <ButtonAnimated
              color="prime"
              type="submit"
              onClick={() => handleSubmit(onSubmit)()}
              disabled={isPending}
              loading={isPending}
              className="w-full sm:w-auto !h-16"
            >
              <h3 className="truncate text-inherit">
                {t("register_in_falingo")}
              </h3>
            </ButtonAnimated>
          ) : (
            <ButtonAnimated
              color="prime"
              type="submit"
              onClick={() => {
                trigger([
                  "email",
                  "phoneNumber",
                  "password",
                  "confirmPassword",
                ]).then((isValid) => {
                  if (isValid) {
                    setActiveForm((prev) => prev + 1);
                  }
                });
              }}
              className="w-full sm:w-auto !h-16"
            >
              <h3 className="truncate text-inherit">{t("next_step")}</h3>
            </ButtonAnimated>
          )}
          <ButtonAnimated
            color="disable"
            onClick={() => {
              setActiveForm((prev) => prev - 1);
            }}
            disabled={activeForm < 2}
            className="w-full sm:w-auto !h-16"
          >
            <h3 className="truncate">{t("return")}</h3>
          </ButtonAnimated>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
