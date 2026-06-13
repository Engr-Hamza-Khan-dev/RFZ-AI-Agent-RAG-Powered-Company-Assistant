import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <Image
      src="/RFZ-Digital-Co-UK-logo.png"
      alt="RFZ Digital"
      width={160}
      height={40}
      className="h-auto w-auto"
      priority
    />
  </div>
);