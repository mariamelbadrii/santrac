import { Link } from "react-router-dom";
import { Forklift } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";

const wordVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay: 0.5 + i * 0.07 },
  }),
};

function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="max-w-3xl text-display-xl font-display font-extrabold text-white">
      {words.map((word, i) => (
        <span key={i} className="me-[0.28em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function CinematicHero() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const iconY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const iconScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <div ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      {/* Curtain — a single cinematic reveal beat on first paint. */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
          className="pointer-events-none absolute inset-0 z-20 bg-ink-950"
        />
      )}

      {/* Layer 1 — blueprint grid, deepest, moves slowest */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: gridY }}
        className="absolute inset-0 bg-grid-fade bg-[length:100%_100%,48px_48px,48px_48px]"
      />

      {/* Layer 2 — radial brand glow, adds depth and colour */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: glowY }}
        className="absolute -end-40 top-1/4 h-[640px] w-[640px] rounded-full bg-brand-600/30 blur-[130px]"
      />
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: glowY }}
        className="absolute -start-32 bottom-0 h-[480px] w-[480px] rounded-full bg-brand-900/50 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent"
      />

      {/* Layer 3 — oversized forklift silhouette, nearest, moves fastest */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: iconY, scale: iconScale }}
        className="pointer-events-none absolute -end-24 bottom-0 hidden lg:block"
      >
        <Forklift className="h-[620px] w-[620px] text-white/[0.06]" strokeWidth={0.55} />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY, scale: contentScale }}
        className="relative z-10 mx-auto w-full max-w-container px-5 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
          className="text-xs font-semibold uppercase tracking-widest2 text-brand-400"
        >
          {t.home.eyebrow}
        </motion.p>

        <div className="mt-5">
          <AnimatedHeadline text={t.home.title} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.95 }}
          className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-300"
        >
          {t.home.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            to="/equipment"
            className="inline-flex h-13 items-center justify-center rounded bg-brand-500 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
          >
            {t.home.ctaPrimary}
          </Link>
          <Link
            to="/request-quote"
            className="inline-flex h-13 items-center justify-center rounded border border-white/20 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:border-white/50"
          >
            {t.home.ctaSecondary}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="absolute bottom-8 start-1/2 z-10 -translate-x-1/2 rtl:translate-x-1/2"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-[1px] bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </div>
  );
}
