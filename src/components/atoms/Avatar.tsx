import React from "react";

interface AvatarProps {
  variant: "bot" | "user";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ variant, className = "" }) => {
  if (variant === "bot") {
    return (
      <div className={`w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 ${className}`}>
        <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="var(--rfz-primary-main)" />
          <polygon points="14,14 20,10 26,14 24,26 20,30 16,26" fill="var(--rfz-primary-dark)" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-9 h-9 rounded-full bg-rfz-primary flex items-center justify-center shrink-0 ${className}`}>
      <span className="text-white text-sm font-bold">U</span>
    </div>
  );
};