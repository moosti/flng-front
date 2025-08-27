import { GameBtn } from "@/app/[locale]/(game)/components/GameBtn";

export default function ButtonAnimated({
  children,
  className,
  disabled = false,
  onClick,
  color,
  loading = false,
  loadingSize = "md",
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean | undefined;
  onClick: () => void;
  loading?: boolean;
  loadingSize?: "sm" | "md" | "lg";
  color:
    | "prime-content"
    | "prime"
    | "info"
    | "neutral"
    | "accent"
    | "disable"
    | "success"
    | "error"
    | "green";
  type?: "button" | "submit" | "reset";
}) {
  return (
    <GameBtn
      disabled={disabled}
      className={className}
      onClick={onClick}
      color={color}
      loading={loading}
      size={loadingSize}
      type={type}
    >
      {children}
    </GameBtn>
  );
}
