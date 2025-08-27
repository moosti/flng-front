import { CircleLoading } from "@/app/components/loading/CircleLoading";
import { ReactNode, useState } from "react";

type Props = {
  onClick: () => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  color: keyof typeof colorMap;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
};

const colorMap = {
  "prime-content":
    "border-prime-content/80 text-base-card/80 bg-prime-content/50 hover:border-prime-content/70 hover:text-base-card hover:bg-prime-content/50",
  prime:
    "border-prime/70 text-base-card-content/80 bg-prime/10 hover:border-prime/80 hover:text-prime/90 hover:bg-prime-content/30",
  green:
    "border-success/70 text-base-card-content/80 bg-success/10 hover:border-success/80 hover:text-success/90 hover:bg-success-content/30",
  info: "border-info/70 text-base-card-content/80 bg-info/10 hover:border-info/80 hover:text-info/90 hover:bg-info-content/30",
  neutral:
    "border-neutral/70 text-base-card-content/80 bg-neutral/10 hover:border-neutral/80 hover:text-neutral/90 hover:bg-neutral-content/30",
  accent:
    "border-accent/70 text-base-card-content/80 bg-accent/10 hover:border-accent/80 hover:text-accent/90 hover:bg-accent-content/30",
  disable: "text-base-card-content/80 border-[#e5e5e5] bg-base-card",
  success: "border-[#000]/20 text-base-card bg-transparent",
  error: "border-[#000]/20 text-base-card bg-transparent",
};

export function GameBtn({
  children,
  onClick,
  className,
  disabled,
  color = "prime",
  loading = false,
  size = "md",
  type = "button",
}: Props) {
  const [pressed, setPressed] = useState(false);

  const hoverStyle = `${!disabled && "hover:border-b-5"}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`relative btn ${pressed ? "!border-b-2" : ""} ${className} ${
        disabled ? colorMap.disable : `${hoverStyle} ${colorMap[color]}`
      } border-3 min-w-44 w-auto cursor-pointer h-20 border-b-8  transition-all duration-150 ease-linear py-2 rounded-xl disabled:text-base-card-content/80 disabled:border-[#e5e5e5] disabled:bg-base-card`}
      onClick={() => {
        if (onClick && !disabled && !loading) {
          setPressed(true);
          setTimeout(() => setPressed(false), 200);
          setTimeout(onClick, 500);
        }
      }}
    >
      {loading ? <CircleLoading color={color} size={size} /> : children}
    </button>
  );
}
