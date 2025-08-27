import { ReactNode, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/app/utils/utils";
import { RoadmapTooltip } from "../tooltip/RoadmapTooltip";
import LoadingSpin from "../loading/LoadingSpin";

type Props = {
  children: ReactNode;
  bgColor?: string;
  bgColorChild?: string;
  color?: string;
  parentClassName: string;
  w?: string;
  h?: string;
  disabled?: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  tooltip?: ReactNode;
};

export function BtnRoadmap({
  children,
  bgColor = "bg-prime",
  bgColorChild = "bg-prime-content",
  color = "text-base-card",
  size = "md",
  parentClassName,
  disabled = false,
  onClick,
  tooltip,
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pressed, setPressed] = useState(false);

  const handleMouseEnter = () => {
    if (navigator.maxTouchPoints === 0) {
      setShowTooltip(true);
    }
  };
  const width =
    size === "sm"
      ? "w-20"
      : size === "md"
      ? "w-22"
      : size === "lg"
      ? "w-24"
      : "w-22";
  const height =
    size === "sm"
      ? "h-20"
      : size === "md"
      ? "h-22"
      : size === "lg"
      ? "h-24"
      : "h-22";

  const shadow = "border-r-7  border-b-5";
  const shadowClick = "!border-2 !border-r-2 !border-b-2 !scale-90 ";
  const shadowHover = "hover:scale-95 hover:border-r-5 hover:border-b-5";

  const handleClick = () => {
    if (!disabled) {
      setPressed(true);
      setTimeout(() => {
        setPressed(false);
      }, 300);
      setTimeout(() => {
        startTransition(async () => {
          onClick();
        });
      }, 450);
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
      className={cn(
        parentClassName,
        width,
        height,
        color,
        disabled ? "bg-[#666666]" : bgColor,
        "p-3 rounded-3xl flex justify-center items-center transition-colors"
      )}
      initial={{ scale: 1, rotate: 45 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <AnimatePresence>
        {showTooltip && tooltip && (
          <motion.div
            initial={{ rotate: -45 }}
            className="transition-opacity duration-150 absolute bottom-full mb-2"
          >
            <RoadmapTooltip>
              <div className="w-40 h-fit py-1">{tooltip}</div>
            </RoadmapTooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        disabled={disabled}
        onClick={() => handleClick()}
        className={cn(
          "w-full h-full cursor-pointer rounded-2xl flex justify-center items-center  border-2 border-[#2323237e] ease-linear transition-all duration-150",
          shadow,
          shadowHover,
          disabled
            ? "bg-[#a8a8a8] disabled:border-[#555555]"
            : `${bgColorChild} ${pressed ? shadowClick : ""}`
        )}
      >
        <motion.div initial={{ rotate: -45 }}>
          {isPending ? <LoadingSpin /> : children}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
