import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Q&A', path: '/qa' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Flashcards', path: '/flashcards' },
    { name: 'Export', path: '/export' }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-deep-space-blue border-b border-neon-teal/20 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 md:gap-3 cursor-pointer min-w-0"
            onClick={() => navigate('/')}
          >
            <Brain className="w-6 md:w-8 h-6 md:h-8 text-neon-teal flex-shrink-0" />
            <span className="text-lg md:text-xl font-heading font-bold text-white truncate">NOTERISER</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ y: -2 }}
                onClick={() => navigate(item.path)}
                className={`font-paragraph text-xs lg:text-sm transition-colors whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'text-neon-teal'
                    : 'text-white/80 hover:text-neon-teal'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-white/80 hover:text-neon-teal hover:bg-neon-teal/10 p-2"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white/80 hover:text-neon-teal p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-3 px-4"
          >
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`font-paragraph text-left py-2 px-3 rounded transition-colors text-sm ${
                    location.pathname === item.path
                      ? 'text-neon-teal bg-neon-teal/10'
                      : 'text-white/80 hover:text-neon-teal hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="border-t border-white/10 pt-3 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="text-white/80 hover:text-neon-teal hover:bg-neon-teal/10 w-full justify-start text-sm px-3"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
