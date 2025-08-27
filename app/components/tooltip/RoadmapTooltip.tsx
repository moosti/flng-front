import CardBorderAnimation from "../card/CardBorderAnimation";
import { motion } from "framer-motion";

export function RoadmapTooltip({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: -10 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "backInOut" }}
      className={`absolute bottom-full transform -translate-x-2/3 translate-y-55 mb-2 px-3 py-1 z-20  ${className}`}
    >
      <CardBorderAnimation
        colors={[
          "var(--theme-color-info-content)",
          "var(--theme-color-prime)",
          "var(--theme-color-prime-content)",
          "var(--theme-color-info)",
          "var(--theme-color-info-content)",
        ]}
        contentClassName="rounded-2xl w-full h-full shadow-card-sm"
      >
        {children}
      </CardBorderAnimation>
    </motion.div>
  );
}
