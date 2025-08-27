"use client";

import { memo } from "react";
import Icon from "../base/Icon";
import Link from "next/link";
import { useDropdown } from "../../hooks/useDropdown";
import { BtnLogout } from "../buttons/BtnLogout";

type DropdownItem = { label: string; href?: string; logout?: boolean };

interface DropdownProps {
  title: string;
  items: DropdownItem[];
}

const DropdownItem = memo(({ item }: { item: DropdownItem }) => (
  <li className="transition-transform duration-200 ease-in cursor-pointer ">
    {item.href ? (
      <Link href={item.href} className="dropdownItem">
        <h4 className="truncate">{item.label}</h4>
      </Link>
    ) : item.logout ? (
      <BtnLogout />
    ) : (
      <h4 className="truncate">{item.label}</h4>
    )}
  </li>
));

DropdownItem.displayName = "DropdownItem";

const Dropdown = memo(function Dropdown({ title, items }: DropdownProps) {
  const { isOpen, toggle } = useDropdown();

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={toggle}
        className="dropdown"
        type="button"
      >
        <Icon
          className="material-symbols-outlined leading-none"
          name="keyboard_arrow_down"
          size="sm"
        />
        <h4 className="truncate">{title}</h4>
        <Icon
          className="material-symbols-rounded leading-none"
          name="face"
          size="sm"
        />
      </button>

      <div
        id="dropdown"
        className={`z-10 dropdownMenu w-44 absolute transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul
          className="py-2 shadow-xl rounded-2xl"
          aria-labelledby="dropdownDefaultButton"
        >
          {items.map((item, index) => (
            <DropdownItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
