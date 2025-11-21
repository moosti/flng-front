"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/app/components/inputs/inputField/InputField";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";

type Inputs = {
  phoneNumber: string;
  password: string;
};

const LoginForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("login");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const res = await fetch(`/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();

      if (res.status === 200) {
        toast.success(t("login_successful"));
        redirect("/home");
      } else if (res.status === 401) {
        if (resData.data.detail === "Invalid credentials.") {
          toast.error(t("the_information_entered_is_not_valid"));
        } else {
          toast.error(t("activate_your_account_first"));
          redirect("/verifyAccount");
        }
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
    <div className="w-full md:w-1/2 min-w-72 p-5 flex justify-center items-center flex-col flex-1">
      <div className=" text-4xl md:text-5xl mb-10">
        {locale === "fa" ? (
          <div className="flex justify-center items-center gap-3 my-2 o">
            <h1 className="">به</h1>
            <h1 className="text-prime ">شناخت</h1>
            <h1 className="text-nowrap">خوش آمدید</h1>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <h1>Welcome</h1>
            <h1>to</h1>
            <h1 className="text-primary">Shenakht</h1>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <h2 className="text-1xl md:text-2xl border-e border-disable/50 px-3">
          {t("login")}
        </h2>

        <p className="px-3">{t("complete_the_information_below_to_login")}</p>
      </div>
      <form
        className="my-5 flex flex-col items-center gap-10"
        onSubmit={(e: React.FormEvent) => e.preventDefault()}
      >
        {/* <InputField
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
            error={
              errors.email as {
                type: string;
                message: string;
              }
            }
          /> */}

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
            // pattern: {
            //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            //   message: t("password_validation"),
            // },
          }}
          error={
            errors.password as {
              type: string;
              message: string;
            }
          }
        />

        <Link
          href="/resetPassword"
          className="text-prime opacity-75 cursor-pointer"
        >
          <h5 className="text-inherit">{t("forgot_your_password")}</h5>
        </Link>

        <div className="flex justify-center items-center w-full gap-5">
          <ButtonAnimated
            color="prime"
            type="submit"
            onClick={() => handleSubmit(onSubmit)()}
            disabled={isPending}
            loading={isPending}
          >
            <h3 className="truncate text-inherit">
              {t("login_to_the_falingo")}
            </h3>
          </ButtonAnimated>
        </div>

        <Link href="/register">
          <h5 className="opacity-75 flex justify-center items-center gap-3">
            <div className="text-prime cursor-pointer">
              {t("dont_have_an_account")}
            </div>
            <div>{t("register")}</div>
          </h5>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
