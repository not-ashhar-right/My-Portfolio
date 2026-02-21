import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Intro from './components/Intro';
import MainLayout from './components/MainLayout';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="bg-[var(--color-navy)] min-h-screen text-[var(--color-text-main)] font-sans">
      <AnimatePresence mode="wait">
        {!introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Intro onComplete={() => setIntroComplete(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {introComplete && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-screen w-full"
        >
          <MainLayout 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </motion.div>
      )}
    </div>
  );
}
