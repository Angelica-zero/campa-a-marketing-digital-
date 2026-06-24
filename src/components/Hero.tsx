/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, Printer, ShoppingBag, Paintbrush } from 'lucide-react';
import { motion } from 'motion/react';
import LogoImage from '../assets/images/regenerated_image_1782218571600.png';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-brand-cyan/10 via-brand-pink/5 to-white pt-10 pb-20 md:py-24">
      {/* Playful background decorative blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-brand-cyan/20 blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-brand-pink/20 blur-3xl -z-10" />
      <div className="absolute -bottom-10 left-1/3 w-96 h-96 rounded-full bg-brand-cyan/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20 text-xs font-bold tracking-wide uppercase font-creative mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-brand-red animate-spin-slow" />
              ¡Más de 20 años acompañando tus ideas!
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-950 leading-[1.1]"
            >
              Librería <span className="bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-red bg-clip-text text-transparent">Colores</span> <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 block mt-2 font-display">
                Todo para aprender y crear 🎨
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-600 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              En <strong>Librería Colores</strong> combinamos calidez, asesoramiento y creatividad. Encontrá tus útiles escolares, artículos de diseño y oficina, o realizá tus impresiones, anillados y plastificados con el servicio ágil que nos caracteriza.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => onNavigate('productos')}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-brand-cyan to-brand-red hover:brightness-105 rounded-2xl shadow-xl hover:shadow-brand-red/20 hover:scale-103 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                Explorar Catálogo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('servicios')}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-800 hover:text-brand-cyan bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-cyan/30 rounded-2xl shadow-md hover:shadow-lg hover:scale-103 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-5 h-5 text-brand-cyan" />
                Calcular Impresión
              </button>
            </motion.div>

            {/* Core Pillars Indicators */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-brand-red font-display">20+ Años</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">De Trayectoria</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-brand-cyan font-display">500+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Elegidos</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-brand-pink font-display">Al Acto</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Servicio rápido</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Creative Interactive Graphic Frame */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] lg:max-w-full">
              {/* Outer frame decorations */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-brand-cyan/20 flex items-center justify-center animate-bounce-slow">
                <Paintbrush className="w-6 h-6 text-brand-cyan" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-brand-pink/20 flex items-center justify-center animate-pulse">
                <Printer className="w-8 h-8 text-brand-red" />
              </div>

              {/* Main Graphic Mockup */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border-4 border-slate-100 p-4">
                <img 
                  src={LogoImage} 
                  alt="Logo de Librería Colores" 
                  className="rounded-2xl w-full h-[320px] sm:h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Card 1: Services preview */}
                <div className="absolute bottom-10 -left-6 sm:-left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-wiggle max-w-[200px]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan shrink-0 animate-pulse">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Fotocopias e Impresiones</span>
                    <span className="block text-[10px] text-slate-400">En el día</span>
                  </div>
                </div>

                {/* Float Card 2: Supplies */}
                <div className="absolute top-12 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[180px]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Útiles de Arte</span>
                    <span className="block text-[10px] text-slate-500">Todo para Crear ⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
