import { ReactNode } from "react";
import BorderAnimation from "./BorderAnimation";

const CardBorderAnimation = ({
  children,
  contentClassName,
  colors,
  inset,
}: {
  children: ReactNode;
  contentClassName?: string;
  colors?: string[];
  inset?: string;
}) => {
  return (
    <div className="relative w-fit h-fit">
      <div
        className={`card p-2 transition-color duration-200 z-10 ${contentClassName}`}
      >
        {children}
      </div>
      <BorderAnimation
        colors={
          colors || [
            "var(--theme-color-info-content)",
            "var(--theme-color-prime)",
            "var(--theme-color-prime-content)",
            "var(--theme-color-info)",
            "var(--theme-color-info-content)",
          ]
        }
        inset={inset || "-inset-[8px]"}
      />
    </div>
  );
};

export default CardBorderAnimation;
