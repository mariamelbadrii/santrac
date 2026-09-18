import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { defaultViewport, fadeUp, staggerContainer } from "@/lib/motion";

type Tag = "div" | "section" | "ul" | "grid";

const tagMap = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  grid: motion.div,
} satisfies Record<Tag, unknown>;

interface StaggerProps {
  as?: Tag;
  className?: string;
  children: ReactNode;
}

export function Stagger({ as = "div", className, children }: StaggerProps) {
  const MotionTag = tagMap[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ as = "div", className, children }: StaggerProps) {
  const MotionTag = tagMap[as === "grid" ? "div" : as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
