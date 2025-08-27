"use client";

import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Divider from "@/app/components/divider/Divider";
import { Modal } from "@/app/components/modal/Modal";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { getLanguageFromUrl } from "@/app/utils/GetLanguageFromUrl ";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

interface Props {
  selected: string | null;
  refetchProfileData?: () => Promise<void>;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UploadAvatar({
  open = false,
  setOpen,
  selected,
  refetchProfileData,
}: Props) {
  const t = useTranslations("profile");
  const tInput = useTranslations("input");

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(selected);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (select: string) => {
    startTransition(async () => {
      const { status } = await FetcherClientSide({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/profile/update-profile-image/`,
        method: "PUT",
        data: { avatar_img: select },
      });
      if (status === 204) {
        toast.success(tInput("profile_updated_successfully"));
        refetchProfileData?.();
        setOpen(false);
      }
    });
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={() => setOpen(!open)}
        headerTitle={t("avatar")}
      >
        <div className="w-full h-full flex justify-center items-center gap-10">
          <ButtonAnimated
            onClick={() => {
              setSelectedAvatar("male_1");
            }}
            color={selectedAvatar === "male_1" ? "prime" : "disable"}
            className="!w-30 !min-w-30 !h-30  rounded-xl"
          >
            <Image
              fill
              className="object-contain"
              src="/svg/profile/avatar/men-1.svg"
              alt="flag_of_iran"
            />
          </ButtonAnimated>
          <ButtonAnimated
            onClick={() => {
              setSelectedAvatar("male_2");
            }}
            color={selectedAvatar === "male_2" ? "prime" : "disable"}
            className="!w-30 !min-w-30 !h-30  rounded-xl"
          >
            <Image
              fill
              className="object-contain"
              src="/svg/profile/avatar/men-2.svg"
              alt="flag_of_iran"
            />
          </ButtonAnimated>
        </div>

        <Divider />

        <ButtonAnimated
          color="accent"
          type="submit"
          disabled={isPending || !selectedAvatar}
          onClick={() => {
            if (selectedAvatar) {
              onSubmit(selectedAvatar);
            }
          }}
          className="mx-auto !h-16"
          loading={isPending}
        >
          <h3 className="truncate text-inherit">{tInput("submit")}</h3>
        </ButtonAnimated>
      </Modal>
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
    </>
  );
}
