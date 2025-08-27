import Image from "next/image";
import Icon from "@/components/base/Icon";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import { UserActivity } from "@/types/User_Interface";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditProfileProps {
  refetchProfileData: () => Promise<void>;
}

interface UploadAvatarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchProfileData: () => Promise<void>;
  selected: string;
}

const EditProfile = dynamic<EditProfileProps>(
  () => import("./EditProfile").then((mod) => mod.default),
  {
    loading: () => (
      <div className="w-10 h-10 bg-disable/40 skeleton rounded-2xl" />
    ),
    ssr: false,
  }
);

const UploadAvatar = dynamic<UploadAvatarProps>(
  () => import("./UploadAvatar").then((mod) => mod.default),
  {
    ssr: false,
  }
);

interface UserProfileHeaderProps {
  userActivity: UserActivity;
  refetchProfileData: () => Promise<void>;
}

export default function UserProfileHeader({
  userActivity,
  refetchProfileData,
}: UserProfileHeaderProps) {
  const router = useRouter();
  const t = useTranslations("profile");
  const [openUploadAvatarModal, setOpenUploadAvatarModal] =
    useState<boolean>(false);

  return (
    <>
      <div className="h-44 w-full bg-[#F8DEDC] grid grid-cols-6 p-5 rounded-2xl">
        <div className="col-span-1">
          <EditProfile refetchProfileData={refetchProfileData} />
        </div>
        <div className="col-span-4 flex justify-center items-center">
          {userActivity.avatar ? (
            <Image
              width={150}
              height={150}
              src={`/svg/profile/avatar/${
                userActivity.avatar === "male_1"
                  ? "men-1"
                  : userActivity.avatar === "male_2" && "men-2"
              }.svg`}
              alt="avatar"
              className="mt-auto"
            />
          ) : (
            <button
              className="cursor-pointer w-36 h-36 relative mt-auto"
              onClick={() => setOpenUploadAvatarModal(true)}
            >
              <Image
                src={`/svg/profile/avatar/avatar.svg`}
                alt="avatar"
                fill
                className="object-contain"
              />
            </button>
          )}
        </div>
        <div className="col-span-1 bg-base-card/50 rounded-2xl flex flex-col justify-start items-center gap-5 px-1 py-2">
          <p className="text-xs">{t("lessons")}</p>
          <div>
            <Image
              width={30}
              height={15}
              src="/svg/profile/Flag_of_Iran.svg"
              alt="flag_of_iran"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center flex-wrap">
        <div className="flex flex-col justify-start items-start">
          <h2 className="truncate max-w-72">{userActivity.full_name}</h2>
          <h6 className="truncate max-w-72 opacity-60">
            {userActivity.username}
          </h6>
        </div>
        <ButtonAnimated
          color="prime"
          className="!w-14 !min-w-14 !h-14 rounded-xl"
          onClick={() => setOpenUploadAvatarModal(true)}
        >
          <Icon name="publish" size="lg" />
        </ButtonAnimated>
        <UploadAvatar
          open={openUploadAvatarModal}
          setOpen={setOpenUploadAvatarModal}
          refetchProfileData={refetchProfileData}
          selected={userActivity.avatar}
        />
      </div>
      <ButtonAnimated
        color="disable"
        onClick={async () => {
          router.push("/login");

          await fetch(`/api/logout/`, {
            method: "POST",
            credentials: "include",
          });
        }}
        className="!h-16 w-full"
      >
        <h3 className="text-red-400">{t("log_out")}</h3>
      </ButtonAnimated>
    </>
  );
}
