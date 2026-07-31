import { motion } from 'motion/react';

const variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fades + lifts its children in once, the first time they scroll into
 * view. Deliberately restrained (one subtle motion, no bounce, runs once)
 * rather than a flashy repeated effect.
 */
export default function RevealSection({ children, delay = 0, as = 'div', className }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}
