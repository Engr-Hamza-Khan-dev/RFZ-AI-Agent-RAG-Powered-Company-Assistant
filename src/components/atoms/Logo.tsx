import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {/* Diamond shield icon */}
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="#7C3AED" />
      <polygon points="20,2 38,12 38,28 20,38" fill="#6D28D9" />
      <polygon points="14,14 20,10 26,14 24,26 20,30 16,26" fill="white" fillOpacity="0.92" />
    </svg>
    <span className="text-xl font-bold tracking-tight text-gray-900">
      RFZ{" "}
      <span className="font-normal text-gray-700">digital</span>
    </span>
  </div>
);