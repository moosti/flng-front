/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode } from "react";
import Select from "react-select";
import { Controller, UseFormRegister } from "react-hook-form";
import { cn } from "@/app/utils/utils";

interface SelectFieldProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  // value?: { label: string; value: string };
  error?: { type: string; message: string } | undefined;
  onChange?: (selectedOption: { label: string; value: string } | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  control?: any;
}

export default function SelectField({
  name,
  label,
  options,
  placeholder = "",
  icon,
  // value,
  error,
  control,
  validations,
}: SelectFieldProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="input_container ">
        {icon}
        <label htmlFor={name} className="label">
          {label}
        </label>
        <Controller
          rules={validations}
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              unstyled
              placeholder={placeholder}
              options={options}
              className="w-full font-medium"
              classNames={{
                clearIndicator: ({ isFocused }) =>
                  cn(
                    isFocused
                      ? "text-base-card-content"
                      : "text-base-card-content",
                    "p-2",
                    isFocused
                      ? "hover:text-neutral-800"
                      : "hover:text-neutral-400",
                  ),
                // container: () => classNames(),
                control: ({ isDisabled, isFocused }) =>
                  cn(
                    isDisabled ? "bg-disable" : "bg-base-card",
                    isDisabled
                      ? "border-disable/20"
                      : isFocused
                        ? "border-disable/20"
                        : "border-neutral-200",
                    "rounded",
                    "border-none",
                    "!cursor-pointer",
                    isFocused ? "hover:disable/20" : "hover:disable/40",
                  ),
                dropdownIndicator: ({ isFocused }) =>
                  cn(
                    isFocused
                      ? "text-base-card-content"
                      : "text-base-card-content",
                    "p-2",
                    isFocused
                      ? "hover:text-base-card-content"
                      : "hover:text-base-card-content",
                  ),
                group: () => cn("py-2"),
                groupHeading: () =>
                  cn(
                    "text-base-card-content",
                    "text-xs",
                    "font-medium",
                    "mb-1",
                    "px-3",
                    "uppercase",
                  ),
                // indicatorsContainer: () => classNames(),
                indicatorSeparator: ({ isDisabled }) =>
                  cn(isDisabled ? "bg-base-card" : "bg-base-card", "my-2"),
                input: () => cn("m-0.5", "py-0.5", "text-base-card-content"),
                loadingIndicator: ({ isFocused }) =>
                  cn(
                    isFocused
                      ? "text-base-card-content"
                      : "text-base-card-content",
                    "p-2",
                  ),
                loadingMessage: () =>
                  cn("text-base-card-content", "py-2", "px-3"),
                menu: () => cn("bg-base-card", "rounded", "my-1"),
                menuList: () => cn("py-1"),
                // menuPortal: () => classNames(),
                multiValue: () => cn("bg-neutral-100", "rounded-sm", "m-0.5"),
                multiValueLabel: () =>
                  cn(
                    "rounded-sm",
                    "text-neutral-800",
                    "text-sm",
                    "p-[3]",
                    "pl-[6]",
                  ),
                multiValueRemove: ({ isFocused }) =>
                  cn(
                    "rounded-sm",
                    `${isFocused && "bg-red-500"}`,
                    "px-1",
                    "hover:bg-red-500",
                    "hover:text-red-800",
                  ),
                noOptionsMessage: () => cn("text-neutral-400", "py-2", "px-3"),
                option: ({ isDisabled, isFocused, isSelected }) =>
                  cn(
                    isSelected
                      ? "bg-prime-content"
                      : isFocused
                        ? "bg-disable/20"
                        : "bg-transparent",
                    isDisabled
                      ? "text-base-card-content"
                      : isSelected
                        ? "text-base-card-content"
                        : "text-inherit",
                    "py-2",
                    "transition-colors duration-200 ease-in",
                    "px-3",
                    "!cursor-pointer",
                    !isDisabled
                      ? isSelected
                        ? "active:bg-prime-content/60"
                        : "active:bg-prime-content/60"
                      : "",
                  ),
                placeholder: () => cn("text-base-card-content", "mx-0.5"),
                singleValue: ({ isDisabled }) =>
                  cn(
                    isDisabled ? "text-disable" : "text-base-card-content",
                    "mx-0.5",
                  ),
                valueContainer: () => cn("py-0.5", "px-2"),
              }}
            />
          )}
        />
      </div>
      {error && <p className="text-error text-xs">{error.message}</p>}
    </div>
  );
}
