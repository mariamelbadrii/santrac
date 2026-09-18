import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";

export function PageTransition() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
