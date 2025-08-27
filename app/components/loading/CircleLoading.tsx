const colorMap = {
  "prime-content": "bg-prime-/80",
  prime: "bg-prime/80",
  info: "bg-info/80",
  neutral: "bg-neutral/80",
  accent: "bg-accent/80",
  disable: "bg-base-card",
  success: "bg-[#000]/20 ",
  error: "bg-[#000]/20",
  green: "bg-success/80",
};

const sizeMap = {
  sm: "w-2 h-2",
  md: "w-3.5 h-3.5",
  lg: "w-5 h-5",
};

const sizeShadowMap = {
  sm: "w-2 ",
  md: "w-3.5 ",
  lg: "w-5 ",
};

export const CircleLoading = ({
  color,
  size = "md",
}: {
  color: keyof typeof colorMap;
  size?: keyof typeof sizeMap;
}) => {
  return (
    <div className="relative w-20 h-full flex justify-center">
      <div
        className={`circleLoading ${sizeMap[size]} ${colorMap[color]}`}
        style={{
          left:
            size === "sm"
              ? "5px"
              : size === "md"
              ? "0px"
              : size === "lg"
              ? "-5px"
              : "0px",
        }}
      />
      <div className={`circleLoading ${sizeMap[size]} ${colorMap[color]}`} />
      <div
        className={`circleLoading ${sizeMap[size]} ${colorMap[color]}`}
        style={{
          right:
            size === "sm"
              ? "5px"
              : size === "md"
              ? "0px"
              : size === "lg"
              ? "-5px"
              : "0px",
        }}
      />

      <div
        className={`shadow ${sizeShadowMap[size]} ${colorMap[color]}`}
        style={{
          left:
            size === "sm"
              ? "5px"
              : size === "md"
              ? "0px"
              : size === "lg"
              ? "-5px"
              : "0px",
        }}
      />
      <div className={`shadow ${sizeShadowMap[size]} ${colorMap[color]}`} />
      <div
        className={`shadow ${sizeShadowMap[size]} ${colorMap[color]}`}
        style={{
          right:
            size === "sm"
              ? "5px"
              : size === "md"
              ? "0px"
              : size === "lg"
              ? "-5px"
              : "0px",
        }}
      />
    </div>
  );
};
