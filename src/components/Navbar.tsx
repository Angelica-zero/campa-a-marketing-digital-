/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShoppingBag, BookOpen } from 'lucide-react';
import { STORE_INFO } from '../data';
import LogoImage from '../assets/images/regenerated_image_1782218569387.png';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  cartCount,
  onOpenCart,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'promociones', label: 'Promos' },
    { id: 'productos', label: 'Catálogo' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'nosotros', label: 'Sobre Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    
    // Smooth scroll to element with offset to account for the sticky header (h-20 = 80px)
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden shadow-xs border border-slate-100 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={LogoImage} 
                alt="Librería Colores Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight font-display text-slate-900 group-hover:text-brand-red transition-colors duration-300">
                Librería <span className="bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-red bg-clip-text text-transparent">Colores</span>
              </span>
              <span className="block text-[10px] font-black text-slate-400 tracking-wide uppercase font-creative">
                {STORE_INFO.tagline} 🎨
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-cyan/15 text-brand-cyan'
                      : 'text-slate-600 hover:text-brand-cyan hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            {/* Consultation Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-slate-50 hover:bg-brand-cyan/10 text-slate-700 hover:text-brand-cyan transition-all duration-300 border border-slate-100 group"
              title="Ver Consulta de WhatsApp"
            >
              <ShoppingBag className="w-5.5 h-5.5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-brand-pink to-brand-red text-[10px] font-bold text-white ring-2 ring-white animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button quick contact */}
            <button
              onClick={() => handleNavClick('contacto')}
              className="hidden sm:inline-flex items-center justify-center p-0.5 rounded-full bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-red group cursor-pointer"
            >
              <span className="bg-white hover:bg-transparent text-slate-800 hover:text-white px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 font-display">
                Pedir Presupuesto
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/98 border-b border-slate-100 py-4 px-4 shadow-inner space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-5 py-3 text-base font-bold rounded-xl transition-all duration-200 block ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-red text-white shadow-sm'
                    : 'text-slate-700 hover:text-brand-cyan hover:bg-brand-cyan/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('contacto')}
              className="w-full text-center py-3 text-sm font-bold bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-red text-white rounded-xl shadow-md"
            >
              Pedir Presupuesto
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
