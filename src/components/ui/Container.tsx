import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  wide?: boolean;
  className?: string;
  children: ReactNode;
}

export function Container({ as: Tag = "div", wide = false, className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", wide ? "max-w-wide" : "max-w-container", className)}>
      {children}
    </Tag>
  );
}
