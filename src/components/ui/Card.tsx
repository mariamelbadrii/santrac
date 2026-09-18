import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-ink-100 bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
