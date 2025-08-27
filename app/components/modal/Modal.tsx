import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../base/Icon";
import Divider from "../divider/Divider";

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: () => void;
  headerTitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  closeOff?: boolean;
}

export function Modal({
  open,
  setOpen,
  children,
  headerTitle,
  size = "md",
  className,
  closeOff = false,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="modal"
          tabIndex={-1}
          aria-hidden={!open}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center bg-base-card-content/80 w-full h-full max-h-full overflow-y-auto overflow-x-hidden md:inset-0 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen()}
        >
          <motion.div
            className={`${className} bg-base-card w-11/12 max-h-dvh overflow-y-auto overflow-x-hidden ${
              size === "sm"
                ? "md:w-1/5 min-w-80"
                : size === "md"
                ? "md:w-2/5"
                : size === "lg"
                ? "md:w-3/5"
                : size === "xl" && "md:w-4/5"
            }  p-6 rounded-lg shadow-2xl`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              id="modal-header"
              className="flex justify-between items-center"
            >
              <h3>{headerTitle}</h3>

              {!closeOff && (
                <button onClick={setOpen} className="cursor-pointer p-1">
                  <Icon
                    name="close"
                    size="md"
                    className="text-base-card-content cursor-pointer"
                  />
                </button>
              )}
            </div>
            {headerTitle && <Divider size="sm" className="my-5" />}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
