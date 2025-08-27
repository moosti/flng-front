"use client";
import { useTranslations } from "next-intl";
import React from "react";

interface DateTimeDisplayProps {
  value: number | string;
  type: string;
  className?: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  value,
  type,
  className,
}) => {
  const t = useTranslations("time");
  return (
    <div className={`flex justify-items-center gap-1`}>
      <p className={className}>{value}</p>
      <p className={className}>{t(type)}</p>
    </div>
  );
};

export default DateTimeDisplay;
