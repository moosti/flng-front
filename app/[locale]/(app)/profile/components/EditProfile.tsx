"use client";

import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Divider from "@/app/components/divider/Divider";
import InputField from "@/app/components/inputs/inputField/InputField";
import SelectField from "@/app/components/inputs/selectField/SelectField";
import LoadingSpin from "@/app/components/loading/LoadingSpin";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import Icon from "@/components/base/Icon";
import { Modal } from "@/components/modal/Modal";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cities from "@/app/jsonData/cities.json";
import provinces from "@/app/jsonData/provinces.json";
import _ from "lodash";
import { MyProfile } from "@/types/User_Interface";
import { Slide, toast, ToastContainer } from "react-toastify";
import { getLanguageFromUrl } from "@/app/utils/GetLanguageFromUrl ";

type Inputs = {
  first_name: string;
  last_name: string;
  city_id: number | null;
  date_of_birth: string | null;
  education: { label: string; value: string } | null;
  gender: { label: string; value: string } | null;
  username: string;
  character_role: { label: string; value: string } | null;
  province: { label: string; value: string } | null;
  city: { label: string; value: string } | null;
};

interface Props {
  refetchProfileData?: () => Promise<void>;
}

export default function EditProfile({ refetchProfileData }: Props) {
  const tProfile = useTranslations("profile");
  const tInput = useTranslations("input");
  const [userData, setUserData] = useState<Inputs | null>(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isPendingGetData, startTransitionGetData] = useTransition();
  const [isInsideTransition, setIsInsideTransition] = useState<boolean>(true);

  const educationOptions = [
    { value: "below_diploma", label: tInput("below_diploma") },
    { value: "diploma", label: tInput("diploma") },
    { value: "associates_degree", label: tInput("associates_degree") },
    { value: "bachelors_degree", label: tInput("bachelors_degree") },
    { value: "masters_degree", label: tInput("masters_degree") },
    { value: "phd", label: tInput("phd") },
    { value: "post_doctoral", label: tInput("post_doctoral") },
  ];

  const genderOptions = [
    { value: "male", label: tInput("male") },
    { value: "female", label: tInput("female") },
  ];

  const characterRoleOptions = [
    { value: "student", label: tInput("student") },
    { value: "teacher", label: tInput("teacher") },
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ defaultValues: userData || {} });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const newData = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        education: data.education?.value,
        gender: data.gender?.value,
        character_role: data.character_role?.value,
        city_id: data.city?.value,
      };
      const { status } = await FetcherClientSide({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/profile/update-profile/`,
        method: "PUT",
        data: newData,
      });
      if (status === 204) {
        toast.success(tInput("profile_updated_successfully"));
        refetchProfileData?.();
        setOpenEditModal(false);
      }
    });
  };

  useEffect(() => {
    if (openEditModal && userData) {
      reset(userData);
    }
  }, [openEditModal, reset, userData]);

  const fetchData = () => {
    startTransitionGetData(async () => {
      const { data: myProfileData } = await FetcherClientSide<MyProfile>({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/profile/my-profile/`,
        method: "GET",
      });

      if (myProfileData) {
        const city = _.find(
          cities,
          (item) => item.id === myProfileData.city_id
        );
        const province = _.find(
          provinces,
          (item) => item.id === city?.province_id
        );
        setUserData({
          first_name: myProfileData.first_name,
          last_name: myProfileData.last_name,
          username: myProfileData.username,
          education:
            _.find(
              educationOptions,
              (item) => item.value === myProfileData.education
            ) || null,
          gender:
            _.find(
              genderOptions,
              (item) => item.value === myProfileData.gender
            ) || null,
          character_role:
            _.find(
              characterRoleOptions,
              (item) => item.value === myProfileData.character_role
            ) || null,
          date_of_birth: myProfileData.date_of_birth,
          city: city ? { label: city.name, value: city.id.toString() } : null,
          province: province
            ? { label: province.name, value: province.id.toString() }
            : null,
          city_id: myProfileData.city_id,
        });
      }

      setIsInsideTransition(false);
    });
  };

  useEffect(() => {
    if (openEditModal) {
      fetchData();
    }
  }, [openEditModal]);

  return (
    <>
      <button onClick={() => setOpenEditModal(!openEditModal)}>
        <Icon
          name="settings"
          size="lg"
          className="text-base-card-content cursor-pointer"
        />
      </button>

      <Modal
        open={openEditModal}
        setOpen={() => setOpenEditModal(!openEditModal)}
        headerTitle={tProfile("edit_profile")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isInsideTransition && !isPendingGetData ? (
            <div className="flex justify-center items-center flex-wrap gap-8">
              <div className="w-84">
                <InputField
                  name="first_name"
                  label={tInput("firstName")}
                  type="text"
                  placeholder={tInput("firstName")}
                  icon={<Icon name="person" size="sm" />}
                  register={register}
                  validations={{ required: tInput("isRequired") }}
                  error={errors.first_name as { type: string; message: string }}
                />
              </div>
              <div className="w-84">
                <InputField
                  name="last_name"
                  label={tInput("lastName")}
                  type="text"
                  placeholder={tInput("lastName")}
                  icon={<Icon name="person" size="sm" />}
                  register={register}
                  validations={{ required: tInput("isRequired") }}
                  error={errors.last_name as { type: string; message: string }}
                />
              </div>
              <div className="w-84">
                <InputField
                  name="username"
                  label={tInput("username")}
                  type="text"
                  placeholder={tInput("username")}
                  icon={<Icon name="alternate_email" size="sm" />}
                  register={register}
                  validations={{ required: tInput("isRequired") }}
                  error={errors.username as { type: string; message: string }}
                />
              </div>

              <div className="w-84">
                <SelectField
                  name="education"
                  label={tInput("education")}
                  options={educationOptions}
                  placeholder={tInput("select")}
                  icon={<Icon name="school" size="sm" />}
                  control={control}
                  error={errors.education as { type: string; message: string }}
                />
              </div>

              <div className="w-84">
                <SelectField
                  name="gender"
                  label={tInput("gender")}
                  options={genderOptions}
                  placeholder={tInput("select")}
                  icon={<Icon name="wc" size="sm" />}
                  control={control}
                  error={errors.gender as { type: string; message: string }}
                />
              </div>

              <div className="w-84">
                <SelectField
                  name="character_role"
                  label={tInput("character_role")}
                  options={characterRoleOptions}
                  placeholder={tInput("select")}
                  icon={<Icon name="switch_account" size="sm" />}
                  control={control}
                  error={
                    errors.character_role as { type: string; message: string }
                  }
                />
              </div>

              <div className="w-84">
                <SelectField
                  name="province"
                  label={tInput("province")}
                  options={_.map(provinces, (item) => ({
                    value: `${item.id}`,
                    label: item.name,
                  }))}
                  placeholder={tInput("select")}
                  icon={<Icon name="location_city" size="sm" />}
                  control={control}
                  error={
                    errors.character_role as { type: string; message: string }
                  }
                />
              </div>

              <div className="w-84">
                <SelectField
                  name="city"
                  label={tInput("city")}
                  options={_.map(
                    _.filter(
                      cities,
                      (fil) =>
                        fil.province_id === Number(watch("province")?.value)
                    ),
                    (item) => ({
                      value: `${item.id}`,
                      label: item.name,
                    })
                  )}
                  placeholder={tInput("select")}
                  icon={<Icon name="location_city" size="sm" />}
                  control={control}
                  validations={{
                    validate: (value: { value: string; label: string }) => {
                      const selectedCity = cities.find(
                        (city) => city.id === Number(value?.value)
                      );
                      const selectedProvince = watch("province");

                      return (
                        !selectedProvince ||
                        !value ||
                        selectedCity?.province_id ===
                          Number(selectedProvince.value) ||
                        tInput("invalid_city_province")
                      );
                    },
                  }}
                  error={errors.city as { type: string; message: string }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-disable/20 skeleton h-56 w-full rounded-2xl" />
          )}

          <Divider size="sm" className="my-5" />
          <ButtonAnimated
            color="accent"
            type="submit"
            disabled={isPending}
            onClick={() => {}}
            className="mx-auto !h-16"
          >
            {isPending ? (
              <LoadingSpin />
            ) : (
              <h3 className="truncate text-inherit">{tInput("submit")}</h3>
            )}
          </ButtonAnimated>
        </form>
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
