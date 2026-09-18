import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded border border-ink-200 bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 transition-colors duration-150 focus:border-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
