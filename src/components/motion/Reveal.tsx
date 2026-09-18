import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { defaultViewport, fadeUp } from "@/lib/motion";

type Tag = "div" | "section" | "li" | "article" | "span" | "aside";

const tagMap = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
  aside: motion.aside,
} satisfies Record<Tag, unknown>;

interface RevealProps {
  as?: Tag;
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
  const MotionTag = tagMap[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
