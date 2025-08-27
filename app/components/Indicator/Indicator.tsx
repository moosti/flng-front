import { ReactNode } from "react";

export function Indicator({
  children,
  text_color,
  bg_color,
  className,
}: {
  children: ReactNode;
  text_color?: string;
  bg_color?: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inline-flex items-center justify-center min-w-9 min-h-9 w-fit h-fit p-1 z-20 ${
        text_color || "text-base-card-content"
      } ${bg_color || "bg-base-card"} ${className}   rounded-full `}
    >
      {children}
    </div>
  );
}
