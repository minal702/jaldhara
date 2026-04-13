import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong";
}

export function GlassCard({ className, variant = "default", children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-300",
        variant === "default" ? "glass" : "glass-strong",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
