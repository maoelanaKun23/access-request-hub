import React from "react";

interface SeparatedNavigationProps {
  children: React.ReactNode;
  className?: string;
}

export function SeparatedNavigation({
  children,
  className,
}: SeparatedNavigationProps) {
  return (
    <div className={`py-2 flex justify-between ${className || ""}`}>
      {children}
    </div>
  );
}
