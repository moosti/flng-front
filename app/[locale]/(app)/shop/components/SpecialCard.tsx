import { ReactNode } from "react";
import CardBorderAnimation from "@/components/card/CardBorderAnimation";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
import Icon from "@/app/components/base/Icon";
import { useTranslations } from "next-intl";

interface SpecialCardProps {
  title: string;
  description: string;
  title_icon: ReactNode;
  button_title: string;
  button_icon: ReactNode | string;
  economic?: boolean;
  styles: {
    btn_color: string;
    colorsAnimate?: string[];
  };
  onClick?: () => Promise<void>;
}

export const SpecialCard = ({
  title,
  description,
  title_icon,
  button_title,
  button_icon,
  economic,
  styles,
  onClick,
}: SpecialCardProps) => {
  const t = useTranslations("shop");

  return (
    <CardBorderAnimation
      colors={styles.colorsAnimate || []}
      contentClassName="rounded-2xl min-w-84 min-h-40 shadow-card-sm"
    >
      <div className="w-full flex justify-start items-center gap-2">
        {title_icon && <span>{title_icon}</span>}
        <h2>{title}</h2>
        {economic && (
          <h5 className="ms-auto flex justify-center items-center gap-1 text-neutral">
            <Icon
              className="material-symbols-rounded mb-2"
              name="sell"
              size="sm"
            />
            <span>{t("economic")}</span>
          </h5>
        )}
      </div>
      <h6>{description}</h6>
      <ButtonAnimated
        onClick={async () => {
          await onClick?.();
        }}
        color={
          styles.btn_color as
            | "neutral"
            | "error"
            | "prime"
            | "info"
            | "prime-content"
            | "accent"
            | "disable"
            | "success"
            | "green"
        }
        className="!h-14 !min-h-14"
      >
        {button_icon && <span>{button_icon}</span>}
        <h4 className="text-inherit">{button_title}</h4>
      </ButtonAnimated>
    </CardBorderAnimation>
  );
};
