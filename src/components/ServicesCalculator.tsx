/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Printer, Layers, ShieldCheck, HelpCircle, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVICES, STORE_INFO } from '../data';
import { EstimateOptions, CartItem } from '../types';

interface ServicesCalculatorProps {
  onAddServiceEstimateToCart: (item: CartItem) => void;
}

export default function ServicesCalculator({ onAddServiceEstimateToCart }: ServicesCalculatorProps) {
  // Calculator Form State
  const [options, setOptions] = useState<EstimateOptions>({
    pageCount: 1,
    copyCount: 1,
    colorType: 'bn',
    duplex: 'simple',
    paperSize: 'A4',
    binding: false,
    laminating: false,
  });

  const [totalEstimate, setTotalEstimate] = useState(0);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Pricing Units Matrix
  const PRICES = {
    bn_simple_a4: 50,
    bn_doble_a4: 80, // discounted duplex
    color_simple_a4: 150,
    color_doble_a4: 255,

    bn_simple_oficio: 65,
    bn_doble_oficio: 105,
    color_simple_oficio: 180,
    color_doble_oficio: 310,

    binding_base: 1500, // Binding / Anillado up to 50 pages
    binding_large: 2300, // More than 50 pages

    laminating_a4: 1800, // Plastificado hot pocket
    laminating_oficio: 2200,
  };

  // Run calculation details
  useEffect(() => {
    let pricePerPage = 0;
    
    if (options.paperSize === 'A4') {
      if (options.colorType === 'bn') {
        pricePerPage = options.duplex === 'simple' ? PRICES.bn_simple_a4 : PRICES.bn_doble_a4;
      } else {
        pricePerPage = options.duplex === 'simple' ? PRICES.color_simple_a4 : PRICES.color_doble_a4;
      }
    } else { // Oficio
      if (options.colorType === 'bn') {
        pricePerPage = options.duplex === 'simple' ? PRICES.bn_simple_oficio : PRICES.bn_doble_oficio;
      } else {
        pricePerPage = options.duplex === 'simple' ? PRICES.color_simple_oficio : PRICES.color_doble_oficio;
      }
    }

    // Base sheets work
    let printCost = pricePerPage * options.pageCount;

    // Duplex double faz divides pages count by 2? No, pageCount is usually the number of virtual sheets/pages,
    // in duplex, we do pageCount / 2 sheets of paper, but pricePerPage is calculated per face/page printed.
    // That is why bn_doble_a4 is $80 ($40 per face/impression page) compared to bn_simple_a4 which is $50.
    // So printing 10 pages double-faz takes 5 sheets of paper, cost = pricePerHour/2 * pages? No,
    // let's assume pricePerPage is the price per logical page/face.

    let additionalCost = 0;

    // Binding (Anillado)
    if (options.binding) {
      additionalCost += options.pageCount <= 50 ? PRICES.binding_base : PRICES.binding_large;
    }

    // Laminating (Plastificado)
    if (options.laminating) {
      additionalCost += options.paperSize === 'A4' ? PRICES.laminating_a4 : PRICES.laminating_oficio;
    }

    const calculatedTotal = (printCost + additionalCost) * options.copyCount;
    setTotalEstimate(calculatedTotal);
  }, [options]);

  const serviceIcons: Record<string, React.ReactNode> = {
    s1: <Printer className="w-6 h-6 text-white" />,
    s2: <Layers className="w-6 h-6 text-white" />,
    s3: <ShieldCheck className="w-6 h-6 text-white" />,
  };

  // Generate customized WhatsApp query message
  const handleOpenWhatsAppEstimate = () => {
    const doubleFazLabel = options.duplex === 'doble' ? 'Doble Faz (Frente/Dorso)' : 'Simple Faz';
    const paperSizeLabel = options.paperSize;
    const colorLabel = options.colorType === 'color' ? 'Full Color' : 'Blanco y Negro (B/N)';
    const bindingLabel = options.binding ? 'Sí, Anillado espiral plástico' : 'No';
    const laminatingLabel = options.laminating ? `Sí, Plastificado rígido ${paperSizeLabel}` : 'No';

    const message = `Hola Librería Colores, estuve usando el cotizador web y quiero encargar las siguientes impresiones:
📝 DETALLES DEL PEDIDO:
- Cantidad de Páginas: ${options.pageCount}
- Tipo: ${colorLabel}
- Faz: ${doubleFazLabel}
- Tamaño de Hoja: ${paperSizeLabel}
- ¿Anillado?: ${bindingLabel}
- ¿Plastificado?: ${laminatingLabel}
- Cantidad de Juegos/Copias: ${options.copyCount}

💵 PRESUPUESTO ESTIMADO: $${totalEstimate.toLocaleString('es-AR')}

*Adjunto el PDF / documento al responder*`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_INFO.phone.replace('+', '')}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddEstimateToCart = () => {
    const detailsString = `${options.pageCount} págs ${options.colorType.toUpperCase()} | ${options.duplex === 'doble' ? 'Doble' : 'Simple'} Faz | ${options.paperSize} ${options.binding ? '+ Anillado' : ''} ${options.laminating ? '+ Plastificado' : ''} (x${options.copyCount})`;
    
    onAddServiceEstimateToCart({
      id: `service-estimate-${Date.now()}`,
      name: `Pedido de Impresiones & Copias`,
      price: totalEstimate,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eae6?w=600&auto=format&fit=crop&q=80',
      itemType: 'service_estimate',
      categoryOrDetails: detailsString
    });

    setSuccessAnimation(true);
    setTimeout(() => setSuccessAnimation(false), 2000);
  };

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-indigo-600 uppercase font-creative bg-indigo-50 px-3.5 py-1.5 rounded-full">
            Servicios Rápidos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Copias, Anillados y <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">Servicios Gráficos</span>
          </h2>
          <p className="text-slate-600 font-sans text-base">
            Equipados con tecnología de punta para entregas en el acto. Ofrecemos acabados profesionales para que tus trabajos escolares, universitarios u corporativos tengan la mejor presentación.
          </p>
        </div>

        {/* 1. Main Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Corner decorative light effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/20 rounded-full translate-x-12 -translate-y-12" />

              <div>
                {/* Header Icon Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-2.5xl ${service.bannerBg} shadow-md`}>
                    {serviceIcons[service.id]}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    {service.badge}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* Details list */}
                <ul className="space-y-2 mb-8">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Precio base</span>
                  <span className="text-xl font-extrabold text-slate-900 font-display">
                    ${service.basePrice.toLocaleString('es-AR')}
                  </span>
                </div>
                <a
                  href="#calculador"
                  className="p-2.5 rounded-full bg-slate-50 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                  title="Calcular presupuesto"
                >
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Interactive Calculator Module */}
        <div id="calculador" className="bg-slate-50 rounded-4xl p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-inner grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24">
          
          <div className="lg:col-span-12 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-amber-400 to-rose-500 rounded-xl text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-black font-display text-slate-900">Cotizador de Impresiones Online</h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-sans">Visualizá tus precios en tiempo real</p>
              </div>
            </div>
          </div>

          {/* Calculator Controls (Left Column) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-6 shadow-sm">
            
            {/* Pages & Copies Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                  Cantidad de Páginas (Hojas)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={options.pageCount || ''}
                    onChange={(e) => setOptions({ ...options, pageCount: Math.max(1, parseInt(e.target.value) || 0) })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl text-slate-800 text-sm font-semibold focus:outline-none transition-all"
                  />
                </div>
                <span className="block text-[10px] text-slate-400">Total de caras o páginas de tu archivo PDF.</span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                  Cantidad de Juegos (Copias)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={options.copyCount || ''}
                  onChange={(e) => setOptions({ ...options, copyCount: Math.max(1, parseInt(e.target.value) || 0) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl text-slate-800 text-sm font-semibold focus:outline-none transition-all"
                />
                <span className="block text-[10px] text-slate-400">¿Cuántos folletos, manuales o réplicas precisas?</span>
              </div>
            </div>

            {/* Colors and Dual Sided Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-slate-100 pt-5">
              
              {/* Output Type: BN or Color */}
              <div className="space-y-2">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                  Tipo de Tinta
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, colorType: 'bn' })}
                    className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                      options.colorType === 'bn'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    ⚫ Blanco y Negro
                  </button>
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, colorType: 'color' })}
                    className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                      options.colorType === 'color'
                        ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 border-transparent text-white shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    🎨 Full Color
                  </button>
                </div>
              </div>

              {/* Simple faz or doble faz */}
              <div className="space-y-2">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                  Modo de Impresión
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, duplex: 'simple' })}
                    className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                      options.duplex === 'simple'
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    📄 Simple Faz
                  </button>
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, duplex: 'doble' })}
                    className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                      options.duplex === 'doble'
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    📖 Doble Faz (Duplex)
                  </button>
                </div>
              </div>

            </div>

            {/* Paper Size & Finishing Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-slate-100 pt-5">
              
              {/* Document/Paper Size */}
              <div className="space-y-2">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                  Tamaño del Papel
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, paperSize: 'A4' })}
                    className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                      options.paperSize === 'A4'
                        ? 'bg-slate-800 border-slate-800 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Tamaño A4
                  </button>
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, paperSize: 'oficio' })}
                    className={`py-3.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                      options.paperSize === 'oficio'
                        ? 'bg-slate-800 border-slate-800 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Tamaño Oficio
                  </button>
                </div>
              </div>

              {/* Finishing checklist */}
              <div className="space-y-2 justify-end">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                  Acabados y Adicionales
                </span>
                <div className="space-y-2.5 pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.binding}
                      onChange={(e) => setOptions({ ...options, binding: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-400 border-slate-300 rounded-sm"
                    />
                    <span className="text-xs font-bold text-slate-700">Anillado con Espiral (+ tapas)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.laminating}
                      onChange={(e) => setOptions({ ...options, laminating: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-400 border-slate-300 rounded-sm"
                    />
                    <span className="text-xs font-bold text-slate-700">Plastificado Completo</span>
                  </label>
                </div>
              </div>

            </div>

          </div>

          {/* Calculator Estimate Display (Right Column) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-4xl shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
            
            {/* Background creative art line */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-full translate-x-12 -translate-y-12 blur-xl" />

            <div className="space-y-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                ⭐ Presupuesto estimado
              </span>

              <div className="">
                <span className="block text-xs text-indigo-200 uppercase font-bold tracking-widest font-sans">Total aproximado</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl sm:text-5xl font-black font-display tracking-tight">
                    ${totalEstimate.toLocaleString('es-AR')}
                  </span>
                  <span className="text-sm font-semibold text-indigo-300">ARS</span>
                </div>
                <span className="block text-[10px] text-indigo-300/80 mt-1.5">Sujeto a cambios de stock o ajustes del documento físico.</span>
              </div>

              {/* Estimate Summary details block */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-2.5 text-xs">
                <div className="flex justify-between text-indigo-100">
                  <span>Impresiones ({options.pageCount} págs x {options.copyCount} juegos):</span>
                  <span className="font-bold">
                    ${(
                      (options.paperSize === 'A4'
                        ? options.colorType === 'bn'
                          ? options.duplex === 'simple' ? PRICES.bn_simple_a4 : PRICES.bn_doble_a4
                          : options.duplex === 'simple' ? PRICES.color_simple_a4 : PRICES.color_doble_a4
                        : options.colorType === 'bn'
                          ? options.duplex === 'simple' ? PRICES.bn_simple_oficio : PRICES.bn_doble_oficio
                          : options.duplex === 'simple' ? PRICES.color_simple_oficio : PRICES.color_doble_oficio) *
                      options.pageCount *
                      options.copyCount
                    ).toLocaleString('es-AR')}
                  </span>
                </div>

                {options.binding && (
                  <div className="flex justify-between text-indigo-100">
                    <span>Anillado (+ tapas):</span>
                    <span className="font-bold">
                      ${((options.pageCount <= 50 ? PRICES.binding_base : PRICES.binding_large) * options.copyCount).toLocaleString('es-AR')}
                    </span>
                  </div>
                )}

                {options.laminating && (
                  <div className="flex justify-between text-indigo-100">
                    <span>Plastificado ({options.paperSize.toUpperCase()}):</span>
                    <span className="font-bold">
                      ${((options.paperSize === 'A4' ? PRICES.laminating_a4 : PRICES.laminating_oficio) * options.copyCount).toLocaleString('es-AR')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mt-8 z-10">
              <button
                type="button"
                onClick={handleOpenWhatsAppEstimate}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm tracking-wide text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
              >
                📱 Enviar Pedido a WhatsApp
              </button>

              <button
                type="button"
                onClick={handleAddEstimateToCart}
                className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wide text-center flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                {successAnimation ? '✓ Agregado al listado!' : '📎 Agregar a lista de consulta geral'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
