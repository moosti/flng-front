"use client";

import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  value?: string;
  error?: { type: string; message: string } | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  inputKey?: string | number;
}

export default function InputField({
  inputKey,
  name,
  label,
  type,
  placeholder = "",
  icon,
  value,
  error,
  register,
  validations,
}: InputFieldProps) {
  return (
    <div
      key={inputKey || name}
      className="w-full flex flex-col justify-start items-center"
    >
      <div className="input_container">
        {icon}
        <label htmlFor={name} className="label">
          {label}
        </label>
        <input
          key={inputKey || name}
          value={value}
          type={type}
          id={name}
          className="input"
          placeholder={placeholder}
          {...(register ? register(name, validations) : {})}
        />
      </div>
      {error && <p className="text-error text-xs">{error.message}</p>}
    </div>
  );
}
