/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Check, Pencil, Briefcase, Palette, BookOpen, AlertCircle, Trash2 } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data';
import { Product, CartItem } from '../types';

interface CatalogProps {
  onAddConsult: (item: CartItem) => void;
  onRemoveConsult: (id: string) => void;
  consultItems: CartItem[];
}

export default function Catalog({ onAddConsult, onRemoveConsult, consultItems }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevant'); // relevant, price-asc, price-desc

  // Check if an item is already in the consultation list
  const consultItemIds = useMemo(() => {
    return new Set(consultItems.map(item => item.id));
  }, [consultItems]);

  const categoryIcons: Record<string, React.ReactNode> = {
    escolar: <Pencil className="w-4 h-4" />,
    oficina: <Briefcase className="w-4 h-4" />,
    artistica: <Palette className="w-4 h-4" />,
    papeleria: <BookOpen className="w-4 h-4" />,
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  const handleToggleConsult = (product: Product) => {
    if (consultItemIds.has(product.id)) {
      onRemoveConsult(product.id);
    } else {
      onAddConsult({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        itemType: 'product',
        categoryOrDetails: product.brand,
      });
    }
  };

  return (
    <section id="productos" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Nuestro <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent">Catálogo Escolar y Comercial</span>
          </h2>
          <p className="text-slate-600 font-sans text-base">
            Buscá entre nuestros productos de primeras marcas seleccionadas. Podés agregarlos a tu listado para enviarnos tu consulta directa por WhatsApp y reservar tu pedido.
          </p>
        </div>

        {/* Search, Filter and Sorting Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="¿Qué estás buscando? (Ej: Cuaderno, Faber-Castell, etc.)"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-2xl text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-6 flex justify-end gap-3">
              <div className="w-full sm:w-auto flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-48 px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-400 rounded-2xl text-slate-700 text-sm font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="relevant">Relevamiento / Destacados</option>
                  <option value="price-asc">Menor Precio</option>
                  <option value="price-desc">Mayor Precio</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Tabs Selector */}
          <div className="border-t border-slate-100 pt-5">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center sm:text-left">Categorías:</span>
            <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>🌈 Ver Todo</span>
              </button>

              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-md'
                        : `${cat.bgClass} ${cat.colorClass} hover:brightness-95`
                    }`}
                  >
                    {categoryIcons[cat.id]}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = consultItemIds.has(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Brand Badge */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-black text-slate-800 tracking-wider uppercase shadow-xs">
                      {product.brand}
                    </span>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
                          Consultar stock
                        </span>
                      </div>
                    )}

                    {product.isFeatured && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase shadow-xs animate-pulse">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-1.5 font-creative">
                      {CATEGORIES.find(c => c.id === product.category)?.name || product.category}
                    </span>
                    
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-rose-600 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Price and Button Action */}
                    <div className="mt-auto space-y-3 pt-3 border-t border-slate-50">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-semibold text-slate-400">Precio Sugerido</span>
                        <span className="text-2xl font-black text-slate-900 font-display">
                          ${product.price.toLocaleString('es-AR')}
                        </span>
                      </div>

                      {/* Add to Inquiry Button */}
                      <button
                        onClick={() => handleToggleConsult(product)}
                        disabled={!product.inStock}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                          isAdded
                            ? 'bg-rose-500 text-white shadow-md hover:bg-rose-600'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            Quitar de la de lista
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            Agregar a Consulta
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search results */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs max-w-md mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-400 mb-2">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">No encontramos coincidencias</h3>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">
              Probá refinando la búsqueda o usando otras palabras clave. ¡O preguntanos directamente por WhatsApp!
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
