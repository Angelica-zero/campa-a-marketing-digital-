/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'presupuesto', // presupuesto, stock, sugerencia, otro
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Simulate sending message
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: 'presupuesto', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleSendViaWhatsApp = () => {
    if (!formState.name || !formState.message) return;
    
    // Generate text for WhatsApp
    const message = `Hola Librería Colores, soy ${formState.name}. 
Quiero hacer una consulta sobre: *${formState.subject.toUpperCase()}*.
📬 MENSAJE:
"${formState.message}"`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_INFO.phone.replace('+', '')}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contacto" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Essential Store Contacts & Schedule */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-widest text-indigo-600 uppercase font-creative bg-indigo-50 px-3.5 py-1.5 rounded-full">
                ¿Dónde encontrarnos?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                Estamos más cerca <br />de lo que creés 📍
              </h2>
              <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                Estudiantes, padres, vecinos y empresas de la zona nos eligen a diario por rapidez y vocación de servicio. Consultá stock o envianos tu archivo por correo electrónico o WhatsApp.
              </p>
            </div>

            {/* List details */}
            <div className="space-y-4.5">
              {/* Address */}
              <div className="flex gap-4 p-4.5 bg-white rounded-2xl border border-slate-100 shadow-xs">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0 h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Nuestra Dirección</span>
                  <span className="block text-sm font-extrabold text-slate-800 mt-0.5">{STORE_INFO.address}</span>
                  <span className="block text-xs text-slate-400">Villa del Rosario, Entre Ríos</span>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex gap-4 p-4.5 bg-white rounded-2xl border border-slate-100 shadow-xs">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shrink-0 h-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Horarios de Atención</span>
                  <span className="block text-sm font-extrabold text-slate-800 mt-0.5">{STORE_INFO.schedule}</span>
                  <span className="block text-xs text-emerald-600 font-bold mt-0.5">¡Abiertos también los Sábados de mañana!</span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex gap-4 p-4.5 bg-white rounded-2xl border border-slate-100 shadow-xs">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl shrink-0 h-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Teléfono / WhatsApp</span>
                  <span className="block text-sm font-extrabold text-slate-800 mt-0.5">{STORE_INFO.phone}</span>
                  <span className="block text-xs text-slate-400">Respondemos de inmediato en horario comercial</span>
                </div>
              </div>

              {/* Mail */}
              <div className="flex gap-4 p-4.5 bg-white rounded-2xl border border-slate-100 shadow-xs">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0 h-fit">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Correo Electrónico</span>
                  <span className="block text-sm font-extrabold text-slate-800 mt-0.5">{STORE_INFO.email}</span>
                  <span className="block text-xs text-slate-400">Ideales para planos, tesis de muchas hojas o archivos pesados</span>
                </div>
              </div>
            </div>

            {/* Social credentials */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seguinos en redes:</span>
              <a href="#" className="text-xs font-black text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors">
                Instagram: {STORE_INFO.social.instagram}
              </a>
              <a href="#" className="text-xs font-black text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                Facebook
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Mail-like message Center */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Envianos tu Consulta / Presupuesto</h3>
            <p className="text-slate-500 text-xs font-sans leading-relaxed mb-6">
              ¿Buscás una marca específica, precisás cotización por grandes resmas para tu oficina o querés coordinar una entrega? Completá el formulario de contacto directo de Librería Colores.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form submit alert */}
              {isSubmitted && (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center gap-3 border border-emerald-200">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <strong className="block font-bold">¡Mensaje simulado correctamente!</strong>
                    <span>En el sistema real, este correo se enviaría directamente a {STORE_INFO.email}.</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ej: Laura Pérez"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl text-slate-800 text-xs font-semibold focus:outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Ej: laura@gmail.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl text-slate-800 text-xs font-semibold focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600">Tema de la Consulta</label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none transition-all cursor-pointer"
                >
                  <option value="presupuesto">Presupuestos / Cotizaciones de impresiones</option>
                  <option value="stock">Disponibilidad de un artículo específico</option>
                  <option value="sugerencia">Sugerencias o Comentarios</option>
                  <option value="otro">Otras consultas comerciales</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600">Tu mensaje</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Escribí aquí los detalles de los productos, cantidad de hojas o folios..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl text-slate-800 text-xs font-semibold focus:outline-none transition-all resize-none"
                />
              </div>

              {/* CTAs flex */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Enviar por Email
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  disabled={!formState.name || !formState.message}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                  title="Completá nombre y mensaje para habilitarlo"
                >
                  📱 Enviar por WhatsApp
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
