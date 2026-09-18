import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded border border-ink-200 bg-white px-3.5 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 transition-colors duration-150 focus:border-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
