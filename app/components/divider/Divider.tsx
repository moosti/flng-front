import React from "react";

export default function Divider({
  children,
  className,
  size = "sm",
  lineColor = "bg-disable/30",
}: {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  lineColor?: string;
}) {
  return (
    <div
      className={`        
          relative 
          w-full                 
          p-4 
          transition-all 
          duration-300 
          ease-in-out
          flex justify-center items-center mx-auto ${className}`}
    >
      <div
        className={`absolute w-full ${
          size === "sm" ? "h-0.5" : size === "md" ? "h-1" : "h-1.5"
        } ${lineColor}   rounded-full`}
      />
      <div className="bg-base-card z-10 px-5">{children}</div>
    </div>
  );
}
