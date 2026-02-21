import { motion, useSpring, useTransform, useMotionValue, animate } from 'motion/react';
import { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const controls = animate(count, 88, {
      duration: 2,
      ease: "easeOut",
      onComplete: () => {
        setShowText(true);
        setTimeout(onComplete, 1500); // Wait 1.5s after counting finishes
      }
    });

    return controls.stop;
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-navy)] text-[var(--color-text-main)]">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-8xl font-bold font-mono text-[var(--color-accent)]"
      >
        <motion.span>{rounded}</motion.span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="mt-4 text-xl text-[var(--color-text-secondary)] font-medium"
      >
        LeetCode Problems Solved
      </motion.div>
    </div>
  );
}
