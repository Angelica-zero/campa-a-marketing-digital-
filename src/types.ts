/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  inStock: boolean;
  brand: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  colorClass: string;
  bgClass: string;
}

export interface Service {
  id: string;
  name: string;
  iconName: string;
  description: string;
  basePrice: number;
  details: string[];
  bannerBg: string;
  badge: string;
}

export interface Promo {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  items: string[];
  badge: string;
  colorTheme: string; // e.g. blue, green, pink
}

export interface CartItem {
  id: string; // can be product id or promo id
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  itemType: 'product' | 'promo' | 'service_estimate';
  categoryOrDetails?: string;
}

export interface EstimateOptions {
  pageCount: number;
  copyCount: number;
  colorType: 'color' | 'bn';
  duplex: 'simple' | 'doble';
  paperSize: 'A4' | 'oficio';
  binding: boolean; // Anillado
  laminating: boolean; // Plastificado
}
