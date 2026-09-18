import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-widest2 text-brand-500", className)}>
      {children}
    </p>
  );
}
