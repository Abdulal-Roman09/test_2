import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Coffee, Menu as MenuIcon, X, Sparkles, Clock, MapPin } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Monitor scroll for shadow & blur enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Curated Menu', path: '/menu' },
    { name: 'Our Story', path: '/about' },
    { name: 'Visit & Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Micro announcement top bar */}
      <div className="bg-espresso-950 text-cream-200/80 text-[11px] sm:text-xs py-1.5 px-4 text-center border-b border-espresso-850/80 flex items-center justify-center gap-4">
        <span className="inline-flex items-center gap-1.5 text-gold-400 font-medium">
          <Sparkles className="w-3 h-3 text-gold-400" />
          Fresh Ethiopia Yirgacheffe harvest roasted this morning
        </span>
        <span className="hidden md:inline-flex items-center gap-1 text-cream-400">
          <Clock className="w-3 h-3" /> Mon–Fri: 6:30am – 6:00pm
        </span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-espresso-900/95 backdrop-blur-md shadow-lg border-b border-espresso-800/80 py-3'
            : 'bg-espresso-900/90 backdrop-blur-sm border-b border-espresso-850 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-glow-gold group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5 text-espresso-950" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cream-50 group-hover:text-gold-300 transition-colors block leading-none">
                Ember & Bloom
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400/90 font-medium mt-1 block">
                Coffee Roasters
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-gold-300 bg-espresso-800/90 font-semibold shadow-inner-warm'
                      : 'text-cream-200 hover:text-gold-400 hover:bg-espresso-850/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact">
              <Button size="sm" variant="outline" className="border-gold-500/50 text-cream-100 hover:bg-gold-500/15">
                Hours & Map
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="sm" variant="primary">
                Explore Menu
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/menu">
              <Button size="sm" variant="primary" className="text-xs px-3 py-1.5">
                Menu
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cream-200 hover:text-gold-400 hover:bg-espresso-800 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <div className="md:hidden bg-espresso-950 border-b border-espresso-800/90 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-espresso-800 text-gold-300 font-semibold'
                        : 'text-cream-200 hover:bg-espresso-900 hover:text-gold-400'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-4 border-t border-espresso-850 flex flex-col gap-2.5">
              <Link to="/contact" className="w-full">
                <Button variant="outline" className="w-full justify-center text-cream-100 border-gold-500/50">
                  Find Us (424 Artisan Way)
                </Button>
              </Link>
              <Link to="/menu" className="w-full">
                <Button variant="primary" className="w-full justify-center">
                  View Full Menu & Order
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
