"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function RouteBack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      className={`btn bg-transparent ${className}`}
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </button>
  );
}
