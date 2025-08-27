import { motion } from "framer-motion";
import { useState } from "react";
import Icon from "../base/Icon";
import { useTranslations } from "next-intl";

const StaggeredDropDown = ({
  option,
  value,
  onChange,
  correct,
}: {
  option: string[];
  value: string;
  onChange: (value: string, oldValue: string) => void;
  correct?: boolean | null;
}) => {
  const t = useTranslations("input");
  const [open, setOpen] = useState(false);
  const [valueSelected, setValue] = useState(value || "");

  const handleChange = (newValue: string, oldValue: string) => {
    setValue(newValue);
    onChange(newValue, oldValue);
  };

  return (
    <div className="flex items-center justify-center bg-base-card">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-base-card border-4 ${
            correct
              ? "border-success"
              : correct === false
              ? "border-error"
              : "border-disable/20"
          }  transition-colors cursor-pointer`}
        >
          <h5 className="font-medium text-sm">
            {value !== "" ? value : t("choose")}
          </h5>
          <Icon
            name={open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            size="md"
          />
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-base-card shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-10"
        >
          {option.map((optionItem, optionIndex) => {
            return (
              <Option
                key={optionIndex}
                setOpen={setOpen}
                setValue={handleChange}
                value={valueSelected}
                text={optionItem}
              />
            );
          })}
        </motion.ul>
      </motion.div>
    </div>
  );
};

interface OptionProps {
  text: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (value: string, oldValue: string) => void;
  value: string;
}

const Option = ({ text, setOpen, setValue, value }: OptionProps) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        setValue(text, value);
      }}
      className={`flex items-center gap-2 w-full p-2 whitespace-nowrap ${
        value === text ? "bg-prime text-base-card" : "text-base-card-content"
      } rounded-md hover:bg-indigo-100  hover:text-indigo-500 transition-colors cursor-pointer`}
    >
      <h4 className="text-inherit">{text}</h4>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.15,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      duration: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.08,
    },
  },
};
