import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  className?: string;
  children: ReactNode;
  /** Max tilt in degrees. Kept subtle for a premium (not gimmicky) feel. */
  intensity?: number;
}

function useTiltAxis(value: MotionValue<number>, intensity: number) {
  return useSpring(useTransform(value, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  });
}

export function TiltCard({ className, children, intensity = 6 }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useTiltAxis(py, intensity);
  const rotateY = useTiltAxis(px, -intensity);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }
      }
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
