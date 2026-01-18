import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Diamond } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'La Galería', path: '/catalogo' },
    { name: 'El Atelier', path: '/nosotros' },
    { name: 'Showroom', path: '/contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-2' : 'border-b border-stone-100 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <div className="flex items-center gap-2">
              <Diamond className="w-6 h-6 text-brand-main transition-colors duration-300" />
              <h1 className="font-display text-2xl tracking-widest font-bold text-gray-900">
                PINK AVENUE
              </h1>
            </div>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-brand-main mt-0.5">Joyería</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-xs uppercase tracking-[0.2em] font-bold hover:text-brand-main transition-colors duration-200 relative group ${location.pathname === link.path ? 'text-brand-main' : 'text-gray-600'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-main transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-main focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out border-t border-gray-100 ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-3 py-2 text-sm font-sans uppercase tracking-widest text-gray-700 hover:text-brand-main hover:bg-brand-light w-full text-center"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;