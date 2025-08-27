"use client";

import { useState, useEffect, useMemo, memo } from "react";

interface IconProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  loadingType?: "ring" | "skeleton";
  fill?: boolean | undefined;
}

const LoadingRing = memo(
  ({ size, className }: { size?: "sm" | "md" | "lg"; className?: string }) => (
    <span
      className={`loading-ring flex justify-center overflow-hidden items-center ${
        size === "lg"
          ? "loading-lg w-8 h-8 before:w-8 after:w-8  before:h-8 after:h-8"
          : size === "md"
          ? "loading-md w-4 h-4"
          : "loading-sm w-2 h-2"
      } ${className}`}
    />
  )
);
LoadingRing.displayName = "LoadingRing";

const LoadingSkeleton = memo(
  ({ size, className }: { size?: "sm" | "md" | "lg"; className?: string }) => (
    <div
      className={`skeleton rounded-full flex justify-center items-center relative opacity-50 overflow-hidden ${
        size === "lg"
          ? "w-10 h-10"
          : size === "md"
          ? "w-7 h-7"
          : size === "sm"
          ? "w-5 h-5"
          : "w-6 h-6"
      } ${className}`}
    />
  )
);
LoadingSkeleton.displayName = "LoadingSkeleton";

const Icon = memo(function Icon({
  name,
  className = "",
  size,
  loadingType,
  fill,
}: IconProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fontCheck = async () => {
      if (document.fonts) {
        try {
          await document.fonts.load(`1rem "Material Symbols Rounded"`);
          setLoading(false);
        } catch {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fontCheck();
  }, []);

  const iconClasses = useMemo(() => {
    const baseClasses =
      "material-symbols-rounded !flex !justify-center !items-center";
    const fillClass = fill ? "material-symbols-rounded-fill" : "";
    const sizeClass =
      size === "lg"
        ? "!text-4xl w-10 h-10"
        : size === "md"
        ? "!text-3xl w-7 h-7"
        : size === "sm"
        ? "!text-xl w-5 h-5"
        : "!text-2xl w-6 h-6";

    return `${baseClasses} ${fillClass} ${sizeClass} ${className}`;
  }, [size, fill, className]);

  if (loading) {
    return loadingType === "ring" ? (
      <LoadingRing size={size} className={className} />
    ) : (
      <LoadingSkeleton size={size} className={className} />
    );
  }

  return <span className={iconClasses}>{name}</span>;
});

Icon.displayName = "Icon";

export default Icon;
