import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  width = 120,
  height = 120,
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Logo MOROCCO SAHARA TREKKING"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
