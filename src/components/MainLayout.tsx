import { motion, AnimatePresence } from 'motion/react';
import { sections } from '../data';
import { SectionContent } from './SectionContent';
import profilePic from './profilepic.png';
import { User, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';


interface MainLayoutProps {
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
}

export default function MainLayout({ activeSection, setActiveSection }: MainLayoutProps) {
  // Helper to determine if we are on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile, will adjust with effect
  const isHome = activeSection === null;

  useState(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  });

  // Initialize sidebar state
  useState(() => {
    if (typeof window !== 'undefined') {
      setIsSidebarOpen(window.innerWidth >= 768);
    }
  });

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-[var(--color-navy)] text-[var(--color-text-main)] relative">
      
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 z-50 p-2 rounded-full bg-[var(--color-sidebar)] text-white shadow-lg hover:bg-[var(--color-accent)] transition-colors border border-white/10"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={isMobile ? {
          x: isSidebarOpen ? 0 : -300,
          opacity: 1 // Always 1 on mobile, just moved off screen
        } : {
          width: isSidebarOpen ? 300 : 0,
          opacity: isSidebarOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed md:relative top-0 left-0 h-full z-40
          flex flex-col bg-[var(--color-sidebar)] border-r border-white/5 
          w-[300px] flex-shrink-0 overflow-hidden shadow-2xl md:shadow-none
        `}
      >
        {/* Scrollable Container with hidden scrollbar */}
        <div className="flex flex-col h-full w-[300px] overflow-y-auto no-scrollbar pt-16 md:pt-0">
          
          {/* Sidebar Header / Profile Pic Location */}
          <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[100px] md:min-h-[200px]">
            {!isHome && (
              <motion.div 
                layoutId="profile-container"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  layoutId="profile-pic"
                  className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--color-accent)] shadow-lg mb-4"
                >
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h2 
                  layoutId="profile-name"
                  className="text-xl font-bold text-center"
                >
                  K Mohammad Ashhar
                </motion.h2>
                <motion.p 
                  layoutId="profile-role"
                  className="text-sm text-[var(--color-text-secondary)] text-center"
                >
                  CSE Student
                </motion.p>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-2 px-4 space-y-1 md:space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-blue-500/20' 
                      : 'hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-[var(--color-text-secondary)] group-hover:text-white'} />
                  <span className="font-medium whitespace-nowrap">{section.title}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </button>
              );
            })}
            
            <button
              onClick={() => {
                setActiveSection(null);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mt-8 ${
                isHome
                  ? 'bg-white/10 text-white' 
                  : 'hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              <User size={20} />
              <span className="font-medium whitespace-nowrap">Home Overview</span>
            </button>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 md:p-6 border-t border-white/5 hidden md:block mt-auto">
            <div className="flex justify-center gap-4">
              <a href="https://github.com/not-ashhar-right" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/k-mohammed-ashhar-445636312/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:ashhar8925@gmail.com" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {isHome ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-full flex flex-col items-center justify-center p-8 md:p-16"
            >
              <motion.div 
                layoutId="profile-container"
                className="flex flex-col items-center mb-12"
              >
                <motion.div 
                  layoutId="profile-pic"
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-[var(--color-accent)] shadow-2xl mb-8"
                >
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.h1 
                  layoutId="profile-name"
                  className="text-4xl md:text-6xl font-bold text-center mb-4"
                >
                  K Mohammad Ashhar
                </motion.h1>
                
                <motion.p 
                  layoutId="profile-role"
                  className="text-xl md:text-2xl text-[var(--color-text-secondary)] text-center max-w-2xl"
                >
                  2nd Year CSE Student @ Bangalore Institute of Technology
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                  <div className="text-4xl font-mono font-bold text-[var(--color-accent)] mb-2">88+</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">LeetCode Problems Solved</div>
                </div>
                <div className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                  <div className="text-4xl font-mono font-bold text-emerald-400 mb-2">3</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Projects Built</div>
                </div>
                <div className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                  <div className="text-4xl font-mono font-bold text-purple-400 mb-2">DSA</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Current Focus</div>
                </div>
              </div>

              <div className="mt-12 text-center max-w-2xl text-[var(--color-text-secondary)]">
                <p>
                  "Young, ambitious, and still growing — someone who loves problem solving and building things from scratch."
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-full p-8 md:p-16"
            >
              <SectionContent sectionId={activeSection} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
