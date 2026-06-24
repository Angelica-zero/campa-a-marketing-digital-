/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Check, Percent, ArrowRight } from 'lucide-react';
import { PROMOTIONS } from '../data';
import { CartItem } from '../types';

interface PromotionsProps {
  onAddPromoToCart: (item: CartItem) => void;
  onRemovePromoToCart: (id: string) => void;
  consultItems: CartItem[];
}

export default function Promotions({ onAddPromoToCart, onRemovePromoToCart, consultItems }: PromotionsProps) {
  const currentInquiryIds = new Set(consultItems.map(item => item.id));

  // Visual helper colors based on theme names
  const themeStyles: Record<string, { bg: string, text: string, accent: string, border: string, btn: string }> = {
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-700',
      accent: 'amber-500',
      border: 'border-amber-100',
      btn: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-white'
    },
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-700',
      accent: 'blue-500',
      border: 'border-blue-100',
      btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 text-white'
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-700',
      accent: 'purple-500',
      border: 'border-purple-100',
      btn: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20 text-white'
    }
  };

  const handleTogglePromo = (promo: typeof PROMOTIONS[0]) => {
    if (currentInquiryIds.has(promo.id)) {
      onRemovePromoToCart(promo.id);
    } else {
      onAddPromoToCart({
        id: promo.id,
        name: promo.name,
        price: promo.price,
        quantity: 1,
        imageUrl: promo.imageUrl,
        itemType: 'promo',
        categoryOrDetails: 'Combo / Promoción Especial 🎁'
      });
    }
  };

  return (
    <section id="promociones" className="py-20 bg-linear-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-600 rounded-full text-xs font-bold font-creative">
              <Percent className="w-4 h-4 text-rose-500" />
              Ofertas Imperdibles
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              Promociones <span className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Llenas de Color</span>
            </h2>
            <p className="text-slate-500 text-sm font-sans max-w-xl">
              Preparamos combos especiales combinando los artículos esenciales que necesitás, con un descuento súper conveniente. ¡No pagues de más!
            </p>
          </div>
          <div className="bg-amber-100 text-amber-800 p-4 rounded-2xl flex items-center gap-3.5 border border-amber-200">
            <span className="text-3xl">🎁</span>
            <div>
              <span className="block text-xs font-black uppercase tracking-wider">Combos Listos</span>
              <span className="block text-[11px] text-slate-600">Perfecto para padres y estudiantes</span>
            </div>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROMOTIONS.map((promo) => {
            const style = themeStyles[promo.colorTheme] || themeStyles.amber;
            const isAdded = currentInquiryIds.has(promo.id);
            const discountPercentage = Math.round(((promo.originalPrice - promo.price) / promo.originalPrice) * 100);

            return (
              <div
                key={promo.id}
                className={`bg-white rounded-4xl p-1 border ${style.border} hover:border-slate-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group`}
              >
                
                {/* Promo Card Top Content (Inner box) */}
                <div className="p-6 pb-4 space-y-5">
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${style.bg} ${style.text}`}>
                      {promo.badge}
                    </span>
                    <span className="bg-rose-500 text-white font-extrabold text-xs px-3 py-1 rounded-lg shadow-sm">
                      -{discountPercentage}%
                    </span>
                  </div>

                  {/* Header info */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-display line-clamp-1 mb-1.5">
                      {promo.name}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans line-clamp-2">
                      {promo.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 pt-4">
                    <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-3">Qué incluye este kit:</span>
                    <ul className="space-y-2.5">
                      {promo.items.map((item, id) => (
                        <li key={id} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Promo Card Bottom Actions */}
                <div className="p-6 pt-4 border-t border-slate-50 bg-slate-50/50 mt-auto rounded-b-4xl">
                  {/* Prices */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-400 line-through">
                        Antes: ${promo.originalPrice.toLocaleString('es-AR')}
                      </span>
                      <span className="text-2xl font-black text-slate-900 font-display">
                        ${promo.price.toLocaleString('es-AR')}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      Ahorras ${(promo.originalPrice - promo.price).toLocaleString('es-AR')}
                    </span>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleTogglePromo(promo)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold tracking-wide text-center flex items-center justify-center gap-2 shadow-xs transition-all duration-300 cursor-pointer ${
                      isAdded
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : style.btn
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Quitar de mi listado
                      </>
                    ) : (
                      <>
                        <span>🎁 Reservar este Combo</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
