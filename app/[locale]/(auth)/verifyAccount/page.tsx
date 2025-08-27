"use client";

import InputField from "@/components/inputs/inputField/InputField";
import LoadingSpin from "@/components/loading/LoadingSpin";
import { fetcher } from "@/utils/Fetcher";
import VerificationCode from "@/components/inputs/inputField/VerificationCode";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type Inputs = {
  // email: string;
  phoneNumber: string;
};

export default function VerifyAccount() {
  const t = useTranslations("login");
  const fromRegister = useSearchParams().get("from") === "register";
  const [isPending, startTransition] = useTransition();
  const [timeForResend, setTimeForResend] = useState(fromRegister ? 60 : 0);

  useEffect(() => {
    if (timeForResend > 0) {
      const timer = setInterval(() => {
        setTimeForResend((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [timeForResend]);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: { code: string }) => {
    startTransition(async () => {
      const res = await fetcher({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/verify-account/`,
        method: "POST",
        data: { verificationCode: data.code },
      });

      if (res.status === 200) {
        toast.success(t("account_successfully_verified"));
        redirect("/login");
      } else if (res.status === 400) {
        toast.error(t("code_might_expired_or_invalid"));
      } else if (res.status === 422) {
        toast.error(t("there_is_a_problem_Please_message_support"));
      } else if (res.status === 429) {
        toast.error(t("this_IP_has_been_blocked_due_to_excessive_requests"));
      } else if (res.status === 500) {
        toast.error(t("there_is_a_database_error_please_try_again_later"));
      }
    });
  };

  const ResendFun: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const res = await fetcher({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/verification-code/resend/`,
        method: "POST",
        data: data,
      });

      if (res.status === 200) {
        toast.success(t("verification_code_resent"));
        setTimeForResend(60);
      } else if (res.status === 401) {
        toast.error(t("already_active_account"));
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
    <>
      {!isPending ? (
        <div className="w-full md:w-1/2 min-w-72 p-5 flex justify-center items-center flex-col flex-1 gap-10">
          <h2>{t("verify_account")}</h2>

          {timeForResend === 0 ? (
            <form
              className="flex justify-center items-center gap-10 flex-col"
              onSubmit={handleSubmit(ResendFun)}
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
              <button className="btn btn-prime btn-outline" onClick={() => {}}>
                <h4 className="text-inherit">{t("resend")}</h4>
              </button>
            </form>
          ) : (
            <>
              <p>{t("verify_account_description")}</p>
              <VerificationCode onSubmit={(code) => onSubmit({ code })} />
              <button className="btn btn-prime btn-outline w-32">
                <h4 className="text-inherit">{timeForResend}</h4>
                <h4 className="text-inherit">ثانیه</h4>
              </button>
            </>
          )}
        </div>
      ) : (
        <LoadingSpin />
      )}
    </>
  );
}
