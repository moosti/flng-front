"use client";

import { useTranslations } from "next-intl";
import Icon from "../base/Icon";
import { useRouter } from "next/navigation";

export function BtnLogout() {
  const router = useRouter();
  const t = useTranslations("menu");
  return (
    <button
      onClick={async () => {
        router.push("/login");

        await fetch(`/api/logout/`, {
          method: "POST",
          credentials: "include",
        });
      }}
      className="flex justify-start px-3 w-full items-center cursor-pointer gap-2 dropdownItem"
    >
      <Icon name="logout" className="material-symbols-rounded mt-1" size="sm" />
      <h4>{t("log_out")}</h4>
    </button>
  );
}
