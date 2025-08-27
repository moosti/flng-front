"use client";

import { useTranslations } from "next-intl";
import { GameBtn } from "./GameBtn";

type Props = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function ConfirmBtn({ onClick, loading, disabled }: Props) {
  const t = useTranslations("input");
  return (
    <GameBtn
      disabled={disabled}
      className="btn min-w-64 mx-auto"
      onClick={onClick}
      color="prime"
      loading={loading}
    >
      <h2 className="text-inherit">{t("confirm")}</h2>
    </GameBtn>
  );
}
