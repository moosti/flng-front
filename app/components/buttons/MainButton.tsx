import { useState} from "react";
import CardBorderAnimation from "../card/CardBorderAnimation";
import { AnimatePresence, motion } from "framer-motion";

export function Tooltip({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: -10 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "backInOut" }}
      className={`absolute bottom-full transform translate-x-1/3 -translate-y-0 mb-2 px-3 py-1 z-50 ${className}`}
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

export default function MainButton({
  children,
  containerClassName,
  contentClassName,
  onClick,
  tooltip,
}: {
  children?: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  onClick?: () => void;
  tooltip?: React.ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (navigator.maxTouchPoints === 0) {
      setShowTooltip(true);
    }
  };

  return (
    <div
      className={`${containerClassName} relative group rotate-z-65 bg-[#FF8D23] max-w-20 min-w-20 min-h-20 max-h-20 rounded-xl flex justify-center items-center z-10 shadow-[inset_3px_3px_0px_0px_#FFFFFF40,inset_-3px_-3px_0px_0px_#23232363]`}
    >
      <AnimatePresence>
        {showTooltip && tooltip && (
          <div className="ltr:-rotate-z-85 rtl:-rotate-z-45 z-50 transition-opacity duration-200 absolute bottom-full mb-2">
            <Tooltip>
              <div className="w-36 h-fit z-50 py-1">{tooltip}</div>
            </Tooltip>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        type="button"
        className={`${contentClassName} cursor-pointer text-base-card flex justify-center z-10 items-center max-w-16 w-16 max-h-16 h-16 rounded-lg bg-[#FFA95A]    
        transition-all duration-200 ease-in-out 
        shadow-[inset_5px_5px_0px_0px_#FFFFFF40,inset_-5px_-5px_0px_0px_#23232363] 
          hover:shadow-[inset_4px_4px_0px_0px_#FFFFFF40,inset_-4px_-4px_0px_0px_#23232363] 
          hover:scale-95
          active:shadow-[inset_2px_2px_1px_1px_#23232363,inset_-1px_-1px_1px_1px_#FFFFFF40]
          active:scale-90`}
      >
        {children}
      </button>
    </div>
  );
}
