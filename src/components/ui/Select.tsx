import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded border border-ink-200 bg-white ps-3.5 pe-9 text-[0.9375rem] text-ink-900 transition-colors duration-150 focus:border-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
      />
    </div>
  ),
);
Select.displayName = "Select";
