import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" } }),
};

export const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.07 } },
  hidden: {},
};

export const dashFade: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" } }),
};
