import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  /** Positive = moves up as the page scrolls past it, negative = moves down. Pixels. */
  offset?: number;
  className?: string;
  children: ReactNode;
}

export function Parallax({ offset = 60, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
