import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "neutral" | "fiat" | "crypto" | "bonus";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium",
    warning: "bg-amber-50 text-amber-700 border-amber-200 font-medium",
    danger: "bg-rose-50 text-rose-700 border-rose-200 font-medium",
    neutral: "bg-slate-100 text-slate-600 border-slate-200 font-medium",
    // Wallet types
    fiat: "bg-slate-100 text-slate-800 border-slate-300 font-semibold",
    crypto: "bg-sky-50 text-sky-800 border-sky-200 font-semibold",
    bonus: "bg-amber-50 text-amber-800 border-amber-200 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
