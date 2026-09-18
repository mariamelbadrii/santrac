import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  emphasis?: boolean;
}

function Word({ children, progress, range, emphasis }: WordProps) {
  const color = useTransform(
    progress,
    range,
    emphasis ? ["rgba(200,16,46,0.25)", "#dd6666"] : ["rgba(255,255,255,0.16)", "#ffffff"],
  );
  return (
    <motion.span style={{ color }} className="inline-block">
      {children}
      {" "}
    </motion.span>
  );
}

interface ScrollRevealStatementProps {
  words: { text: string; emphasis?: boolean }[];
}

// A scroll-scrubbed word-by-word reveal — each word lights up as the
// section's own scroll progress crosses its slice of the range, rather
// than firing once on viewport-enter. Pinned via `sticky` (not
// scroll-jacked), tied directly to native scroll position.
export function ScrollRevealStatement({ words }: ScrollRevealStatementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative h-[220vh] bg-ink-950">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <p className="max-w-4xl text-center text-display-md font-display font-bold leading-snug">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1.4 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, Math.min(end, 1)]} emphasis={word.emphasis}>
                {word.text}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}
