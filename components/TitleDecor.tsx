interface TitleDecorProps {
  className?: string;
  color?: string;
  align?: "center" | "left" | "right";
}

export default function TitleDecor({
  className = "",
  color = "text-[#1a1a1a]",
  align = "center",
}: TitleDecorProps) {
  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div
      className={`flex items-center ${justifyClass} ${color} ${className}`}
      aria-hidden="true"
    >
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
        <line
          x1="4"
          y1="4"
          x2="10"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="2"
          x2="22"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="5"
          x2="34"
          y2="9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
