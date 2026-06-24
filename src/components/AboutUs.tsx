/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Heart, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data';

export default function AboutUs() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-amber-600" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-indigo-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-slate-600" />;
    }
  };

  const colors = [
    'from-amber-100 to-amber-200 text-amber-800',
    'from-rose-100 to-rose-200 text-rose-800',
    'from-purple-100 to-purple-200 text-purple-800',
    'from-indigo-100 to-indigo-200 text-indigo-800',
  ];

  return (
    <section id="nosotros" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About section main blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left block (History of 20 years) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-black tracking-widest text-rose-600 uppercase font-creative bg-rose-50 px-3.5 py-1.5 rounded-full">
              Nuestra Historia
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              20 años de <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent">confianza y cercanía</span> en la comunidad
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              {STORE_INFO.aboutText}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Durante estas dos décadas, vimos pasar generaciones de alumnos primarios que hoy vuelven como estudiantes universitarios o profesionales a imprimir sus apuntes o proyectos. Nuestra visión es simple: hacer que tu paso por la librería sea una experiencia alegre, ágil y llena de soluciones.
            </p>

            {/* Micro layout milestones */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-100 font-display">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                <span className="block text-3xl font-extrabold text-slate-800">2004</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Año de fundación</span>
              </div>
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/30">
                <span className="block text-3xl font-extrabold text-indigo-600">Familia</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Empresa local local</span>
              </div>
            </div>
          </div>

          {/* Right block (Interactive Values list in grid) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="block text-xs font-black tracking-widest text-slate-400 uppercase text-center lg:text-left mb-6">
              NUESTROS VALORES FUNDAMENTALES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STORE_INFO.values.map((value, idx) => {
                const colorIndex = idx % colors.length;
                const dynamicColor = colors[colorIndex];
                
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 space-y-4"
                  >
                    {/* Circle icon */}
                    <div className={`p-3 rounded-2xl w-fit bg-gradient-to-tr ${dynamicColor} shadow-inner`}>
                      {getIcon(value.icon)}
                    </div>

                    {/* Value content */}
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 font-display">
                        {value.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-sans leading-relaxed mt-1.5">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
