"use client";

import { ReactNode } from "react";
import Card from "@/components/card/Card";
import ButtonAnimated from "@/app/components/buttons/ButtonAnimated";
interface NormalCardProps {
  title: string;
  description: string;
  title_icon: ReactNode;
  button_title: string;
  button_icon: ReactNode | string;
  styles: {
    btn_color: string;
  };
  onClick?: () => Promise<void>;
}

export const NormalCard = ({
  title,
  description,
  title_icon,
  button_title,
  button_icon,
  styles,
  onClick,
}: NormalCardProps) => {
  return (
    <Card className="rounded-2xl min-w-86 min-h-46 max-h-46 border-4 border-disable/20">
      <div className="w-full flex justify-start items-center gap-2">
        {title_icon && <span>{title_icon}</span>}
        <h2>{title}</h2>
      </div>
      <h6>{description}</h6>
      <ButtonAnimated
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
        onClick={async () => {
          await onClick?.();
        }}
        className="!h-14 !min-h-14"
      >
        {button_icon && <span>{button_icon}</span>}
        <h4 className="text-inherit">{button_title}</h4>
      </ButtonAnimated>
    </Card>
  );
};
