import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Search, ChevronDown, Mail, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, isMenuOpen]);

  const navItems = [
    { name: 'Home', dropdown: false },
    { name: 'About', dropdown: false },
    { name: 'Gallery', dropdown: false },
    { name: 'Trips', dropdown: true },
    { name: 'Upcoming Trips', dropdown: false },
    { name: 'Contact Us', dropdown: false },
  ];

  return (
    <>
      <header className={`ForeverA-header fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        {/* Top Bar */}
        {!isScrolled && (
          <div className="ForeverA-top-bar border-b border-white/10 pb-4 mb-6 hidden lg:block">
            <div className="container mx-auto px-8 flex justify-between items-center text-white text-xs font-medium">
              <div className="flex items-center gap-8">
                <a href="mailto:info@example.com" className="flex items-center gap-2 hover:text-[#D4E982] transition-colors">
                  <Mail size={14} /> info@example.com
                </a>
                <a href="tel:+000123456789" className="flex items-center gap-2 hover:text-[#D4E982] transition-colors">
                  <Phone size={14} /> +000123456789
                </a>
              </div>
              <div className="text-center flex-1 font-semibold tracking-wide">
                Reserve Now & Get 50% Off On Next Vacation!
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4E982] transition-colors">
                  <Globe size={14} /> EN <ChevronDown size={12} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4E982] transition-colors">
                  INR, ₹ <ChevronDown size={12} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Nav */}
        <nav className="container mx-auto px-8 flex justify-between items-center">
          <div className="ForeverA-logo flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-[#D4E982]">
               <img src="https://picsum.photos/seed/travel/100/100" alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="text-white text-3xl font-bold tracking-tighter">Forever</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.name} className="group relative">
                <a href="#" className="text-white text-[15px] font-semibold flex items-center gap-1.5 hover:text-[#D4E982] transition-colors py-2">
                  {item.name}
                  {item.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                </a>
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 overflow-hidden">
                    <ul className="py-3">
                      <li className="px-6 py-3 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors">Luxury Cruises</li>
                      <li className="px-6 py-3 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors">Mountain Treks</li>
                      <li className="px-6 py-3 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors">Beach Getaways</li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <button className="hidden lg:block bg-[#D4E982] text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#D4E982]/20">
              Register Now
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-12 h-12 bg-[#D4E982] cursor-pointer text-black flex items-center justify-center rounded-xl hover:bg-white transition-all transform hover:rotate-12"
            >
              <Search size={22} />
            </button>
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[110] lg:hidden bg-black flex flex-col pt-32 px-10"
            >
              <ul className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a href="#" className="text-white text-3xl font-bold flex justify-between items-center hover:text-[#D4E982] transition-colors">
                      {item.name}
                      {item.dropdown && <ChevronDown size={24} />}
                    </a>
                  </li>
                ))}
                <li className="pt-10">
                  <button className="w-full bg-[#D4E982] text-black py-5 rounded-2xl font-bold text-xl">
                    Register Now
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay - Rendered via Portal for absolute top-level stacking */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center px-6"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-4xl relative"
              >
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute -top-24 right-0 text-white hover:text-[#D4E982] transition-colors"
                >
                  <X size={48} />
                </button>
                <h2 className="text-white text-4xl md:text-6xl font-serif mb-12 text-center">Search Destinations</h2>
                <div className="relative">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Where do you want to go?"
                    className="w-full bg-transparent border-b-4 border-white/20 py-6 text-3xl md:text-5xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4E982] transition-colors"
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" size={40} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;
