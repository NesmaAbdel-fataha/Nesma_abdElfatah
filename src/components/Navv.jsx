import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Download, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { profileData } from '../data/profile';

const desktopLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const mobileLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navv({ activeSection = 'home' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200/70 bg-white/80'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 h-[72px]">
        {/* Left: Logo */}
        <a href="#home" className={`flex items-center gap-2 text-base font-semibold transition-colors duration-200 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          <span className={`rounded-full p-2 transition-colors duration-200 ${isDark ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-100 text-orange-655'}`}>
            <Code2 className="h-4 w-4" />
          </span>
          Nesma
        </a>

        {/* Center: Desktop Navigation Links (centered on screens >= 1024px) */}
        <div className="hidden lg:flex items-center justify-center gap-1.5">
          {desktopLinks.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'about' && activeSection === 'home');
            return (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? (isDark ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-50 text-orange-700') 
                    : (isDark ? 'text-slate-300 hover:bg-slate-900 hover:text-orange-300' : 'text-slate-600 hover:bg-orange-50/60 hover:text-orange-700')
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle, Resume, Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light/Dark mode toggle (always visible) */}
          <button 
            type="button" 
            onClick={toggleTheme} 
            aria-label="Toggle theme" 
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500/40 ${
              isDark 
                ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-orange-500/30 hover:text-orange-300' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700'
            }`}
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Resume Button - visible on >= 768px (enough space), hidden on mobile */}
          <a 
            href={profileData.hero.downloadCvUrl.direct} 
            target="_blank" 
            rel="noreferrer" 
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-orange-650 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(249,115,22,0.22)] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-600/40"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>

          {/* Hamburger Menu Button - visible below 1024px */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className={`inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500/40 ${
              isDark 
                ? 'border-slate-700 bg-slate-900 text-slate-250 hover:border-orange-500/30 hover:text-orange-300' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700'
            }`}
          >
            {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Semi-transparent Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-35 bg-black/35 backdrop-blur-xs lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Slide-down Content */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`fixed inset-x-0 top-[72px] z-40 border-b p-6 shadow-lg backdrop-blur-xl lg:hidden ${
                isDark 
                  ? 'border-slate-800 bg-slate-950/95 text-slate-100' 
                  : 'border-slate-200/90 bg-white/95 text-slate-850'
              }`}
            >
              <nav className="flex flex-col gap-3">
                {mobileLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                        isActive
                          ? (isDark ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-50 text-orange-700')
                          : (isDark ? 'text-slate-300 hover:bg-slate-900/60 hover:text-orange-355' : 'text-slate-655 hover:bg-slate-50 hover:text-orange-700')
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}

                {/* Mobile-only Resume Button (shown inside menu on screens < 768px) */}
                <a
                  href={profileData.hero.downloadCvUrl.direct}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="md:hidden flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-650 to-orange-500 py-3 text-sm font-bold text-white shadow-xs transition hover:opacity-95"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
