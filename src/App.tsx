/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShoppingBag, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Check, 
  Printer, 
  Clock, 
  MapPin, 
  Send, 
  Heart, 
  ChevronRight, 
  HelpCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ServicesCalculator from './components/ServicesCalculator';
import Promotions from './components/Promotions';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';

import { STORE_INFO } from './data';
import { CartItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [consultItems, setConsultItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showWappBubble, setShowWappBubble] = useState(false);

  // Auto show-up short timing on Mount for WhatsApp assistant bubble
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWappBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Sync scroll section changes to active navigation highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'promociones', 'productos', 'servicios', 'nosotros', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Consult Lists Logic
  const handleAddConsultItem = (item: CartItem) => {
    setConsultItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, item];
    });
  };

  const handleRemoveConsultItem = (id: string) => {
    setConsultItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveConsultItem(id);
      return;
    }
    setConsultItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Generate WhatsApp summary and open external conversation
  const handleSendWhatsAppInquiry = () => {
    if (consultItems.length === 0) return;

    let subtotal = 0;
    let listContent = '';

    consultItems.forEach((item, idx) => {
      const itemPrice = item.price * item.quantity;
      subtotal += itemPrice;
      const typeLabel = item.itemType === 'promo' ? '🎁 Combo' : item.itemType === 'service_estimate' ? '📄 Copias' : '✏️ Útil';
      listContent += `${idx + 1}. ${typeLabel} - ${item.name} 
   └ Cantidad: ${item.quantity} x $${item.price.toLocaleString('es-AR')} = $${itemPrice.toLocaleString('es-AR')}\n`;
      if (item.categoryOrDetails) {
        listContent += `     Detalles: ${item.categoryOrDetails}\n`;
      }
    });

    const messageString = `Hola Librería Colores, estuve viendo la web y quiero reservar/consultar stock para la siguiente lista:

📋 DETALLE DEL PEDIDO:
${listContent}
💰 PRESUPUESTO ESTIMADO: $${subtotal.toLocaleString('es-AR')}

*Por favor confirmame la disponibilidad y coordinamos el retiro o envío. ¡Gracias!*`;

    const encodedText = encodeURIComponent(messageString);
    const whatsappQueryUrl = `${STORE_INFO.whatsappUrl}?text=${encodedText}`;
    window.open(whatsappQueryUrl, '_blank');
  };

  // Helper count of all items
  const cartCount = consultItems.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <div id="app-root" className="min-h-screen bg-white text-slate-800 font-sans tracking-tight flex flex-col justify-between">
      
      {/* 1. Header & Navigation Component */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Brand Identity Ribbon: Cyan, Red, Pink themed banner with tagline */}
      <div className="bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-red py-2 px-4 text-center text-white text-xs font-extrabold tracking-wider uppercase font-creative flex items-center justify-center gap-2 shadow-xs z-10">
        <Sparkles className="w-4 h-4 animate-spin-slow shrink-0" />
        <span>LIBRERÍA COLORES — "{STORE_INFO.tagline}" — MÁS DE 20 AÑOS JUNTO A VOS</span>
        <Sparkles className="w-4 h-4 animate-spin-slow shrink-0" />
      </div>

      {/* 3. Main Sections Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onNavigate={(sectionId) => {
          setActiveSection(sectionId);
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Promociones: Special discount packs */}
        <Promotions 
          onAddPromoToCart={handleAddConsultItem}
          onRemovePromoToCart={handleRemoveConsultItem}
          consultItems={consultItems}
        />

        {/* Productos: Interactive Catalog */}
        <Catalog 
          onAddConsult={handleAddConsultItem} 
          onRemoveConsult={handleRemoveConsultItem} 
          consultItems={consultItems}
        />

        {/* Servicios: Copias, Impresiones & Calc */}
        <ServicesCalculator 
          onAddServiceEstimateToCart={handleAddConsultItem}
        />

        {/* Nosotros: 20 years history and custom values */}
        <AboutUs />

        {/* Contacto: Custom maps info & request forms */}
        <ContactForm />
      </main>

      {/* 4. Footer Section */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand block */}
            <div className="space-y-4 md:col-span-2">
              <span className="text-xl font-black text-white font-display uppercase tracking-wider block">
                Librería <span className="text-brand-cyan">Colores</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                Con más de 20 años de trayectoria continuada brindándole servicio a padres, estudiantes universitarios y oficinas de Almagro y alrededores. <i>"{STORE_INFO.tagline}"</i>.
              </p>
              <div className="flex gap-4 pt-1">
                <span className="text-xs text-brand-pink block font-bold">🎯 {STORE_INFO.address}</span>
              </div>
            </div>

            {/* Quick sections links */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-100 block">Navegación</span>
              <ul className="space-y-2 text-xs">
                <li><a href="#inicio" className="hover:text-white transition-colors">Volver al Inicio</a></li>
                <li><a href="#productos" className="hover:text-white transition-colors">Catálogo de Productos</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Fotocopias e Impresiones</a></li>
                <li><a href="#promociones" className="hover:text-white transition-colors">Combos Escolares</a></li>
              </ul>
            </div>

            {/* Quick Contact info */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-100 block">Atención Directa</span>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-cyan" />
                  <span>{STORE_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-pink" />
                  <span>Lun-Sáb (Horarios comerciales)</span>
                </li>
                <li>
                  <span className="block font-bold text-slate-200">{STORE_INFO.email}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <span>© 2026 Librería Colores. Todos los derechos reservados. Todo para aprender y crear.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Términos del Catálogo</a>
              <span>•</span>
              <a href="#" className="hover:underline">Políticas de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Sleek Slide-over Drawer for Current WhatsApp Inquiry List */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop overlay */}
            <div 
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" 
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col bg-white shadow-2xl border-l border-slate-100">
                  
                  {/* Header Drawer */}
                  <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-brand-cyan rounded-xl text-slate-950">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-extrabold font-display" id="slide-over-title">Tu Consulta de WhatsApp</h2>
                        <span className="block text-[10px] text-indigo-200 font-semibold uppercase tracking-wider">
                          Tienes {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'} agregados
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body Drawer list */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {consultItems.length > 0 ? (
                      <div className="space-y-4">
                        <p className="text-slate-500 text-xs">
                          Revisá los artículos y copias que agregaste. Al presionar "Enviar Pedido", te abriremos un chat de WhatsApp con el desglose listo para despachar.
                        </p>

                        <div className="divide-y divide-slate-100">
                          {consultItems.map((item) => (
                            <div key={item.id} className="py-4 flex gap-4 items-start">
                              {/* Product Thumbnail */}
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded-xl border border-slate-100 bg-slate-50 shrink-0"
                              />

                              {/* Info details */}
                              <div className="flex-grow space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="text-xs font-black text-slate-900 font-display line-clamp-1">{item.name}</h4>
                                  <button
                                    onClick={() => handleRemoveConsultItem(item.id)}
                                    className="text-slate-400 hover:text-brand-red p-0.5 rounded-sm transition-colors cursor-pointer"
                                    title="Quitar"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <span className="block text-[10px] text-slate-400 font-medium line-clamp-1">
                                  {item.categoryOrDetails || 'Artículo de Librería'}
                                </span>

                                <div className="flex items-center justify-between pt-1">
                                  {/* Qty button selectors */}
                                  <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                      className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 cursor-pointer"
                                      disabled={item.itemType === 'service_estimate'}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-2 text-xs font-black text-slate-800 text-center min-w-[20px]">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                      className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 cursor-pointer"
                                      disabled={item.itemType === 'service_estimate'}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  {/* Price sum */}
                                  <span className="text-xs font-extrabold text-slate-950">
                                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Empty cart */
                      <div className="text-center py-20 space-y-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 text-slate-400">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 font-display">No hay consultas agregadas</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                          Navegá nuestro catálogo de útiles escolares, promociones o usá el cotizador de impresiones para sumar consultas a tu lista.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCartOpen(false);
                            document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-5 py-2.5 rounded-xl text-[10px] font-extrabold tracking-wider uppercase text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                          Ir al catálogo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer Drawer sticky info */}
                  {consultItems.length > 0 && (
                    <div className="p-6 border-t border-slate-100 space-y-4 bg-slate-50/50">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-slate-500 font-medium">Lugar de Retiro</span>
                          <span className="text-xs font-extrabold text-slate-800">{STORE_INFO.address}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-slate-500 font-medium">Subtotal Estimado</span>
                          <span className="text-xl font-black text-slate-950 font-display">
                            ${consultItems.reduce((acc, c) => acc + (c.price * c.quantity), 0).toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSendWhatsAppInquiry}
                        className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold tracking-wider uppercase text-center flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/15 cursor-pointer"
                      >
                        <Phone className="w-4 h-4 fill-white" />
                        <span>Enviar Pedido a WhatsApp</span>
                      </button>

                      <span className="block text-[9px] text-slate-400 text-center leading-relaxed">
                        Se abrirá la aplicación oficial de WhatsApp con el pedido detallado. Nos pondremos en contacto para confirmar stock de inmediato.
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Floating Gorgeous WhatsApp Assistant Chat bubble */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Help notification pop bubble */}
        {showWappBubble && (
          <div className="pointer-events-auto bg-white p-4.5 rounded-3xl shadow-2xl border border-slate-100 max-w-[260px] animate-bounce-short relative space-y-2.5">
            {/* Close pop up */}
            <button 
              onClick={() => setShowWappBubble(false)}
              className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Librería Colores</span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed font-sans font-medium">
              Hola, ¿tenés dudas sobre stock de lápices, resmas o querés cotizar tus fotocopias? Hablá con nosotros por WhatsApp.
            </p>

            <a
              href={`${STORE_INFO.whatsappUrl}?text=Hola+Libreria+Colores%2C+quiero+hacer+una+consulta+general.`}
              target="_blank"
              onClick={() => setShowWappBubble(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
            >
              Consultar online <ChevronRight className="w-4.5 h-4.5" />
            </a>
          </div>
        )}

        {/* Brand Rounded WhatsApp Button */}
        <a
          href={`${STORE_INFO.whatsappUrl}?text=Hola+Libreria+Colores%2C+quiero+hacer+una+consulta+general.`}
          target="_blank"
          className="pointer-events-auto flex items-center justify-center w-15 h-15 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group relative border-2 border-white"
          title="Chatear por WhatsApp"
        >
          <Phone className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[8px] font-black font-creative text-white animate-pulse">
            !
          </span>
        </a>

      </div>

    </div>
  );
}
