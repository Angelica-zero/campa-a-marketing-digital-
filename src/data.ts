/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, Service, Promo } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'escolar',
    name: 'Útiles Escolares',
    iconName: 'Pencil',
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-50',
  },
  {
    id: 'oficina',
    name: 'Artículos de Oficina',
    iconName: 'Briefcase',
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-50',
  },
  {
    id: 'artistica',
    name: 'Artística',
    iconName: 'Palette',
    colorClass: 'text-purple-500',
    bgClass: 'bg-purple-50',
  },
  {
    id: 'papeleria',
    name: 'Papelería & Resmas',
    iconName: 'BookOpen',
    colorClass: 'text-emerald-500',
    bgClass: 'bg-emerald-50',
  },
];

export const PRODUCTS: Product[] = [
  // Escolares
  {
    id: 'p1',
    name: 'Lápices de Colores x12 Faber-Castell',
    description: 'Lápices ecológicos redondos de alta calidad con mina súper resistente y colores brillantes.',
    price: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    category: 'escolar',
    isFeatured: true,
    inStock: true,
    brand: 'Faber-Castell',
  },
  {
    id: 'p2',
    name: 'Cuaderno Universitario Rayado Éxito',
    description: 'Cuaderno tapa dura de 84 hojas con espiral metálico reforzado y hojas de 80g de alta calidad.',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    category: 'papeleria',
    isFeatured: true,
    inStock: true,
    brand: 'Éxito',
  },
  {
    id: 'p3',
    name: 'Microfibras Filgo Liner 0.4 Flow x10',
    description: 'Set de 10 microfibras de colores vibrantes para dibujo técnico, lettering y toma de apuntes.',
    price: 5200,
    imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80',
    category: 'escolar',
    isFeatured: true,
    inStock: true,
    brand: 'Filgo',
  },
  {
    id: 'p4',
    name: 'Carpeta Escolar N°3 con Cordón',
    description: 'Carpeta de 3 ganchos de cartón prensado reforzado, ideal para hojas escolares N°3.',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    category: 'escolar',
    isFeatured: false,
    inStock: true,
    brand: 'Ledesma',
  },
  {
    id: 'p5',
    name: 'Resaltadores Swing Cool x6 Pastel Maped',
    description: 'Kit de 6 resaltadores de tonos pastel con tecnología antiescurrimiento y trazo suave.',
    price: 4900,
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
    category: 'escolar',
    isFeatured: true,
    inStock: true,
    brand: 'Maped',
  },

  // Oficina
  {
    id: 'p6',
    name: 'Resma de Papel A4 Report 75g (500 hojas)',
    description: 'Papel ultra blanco multifunción ideal para impresos láser, inkjet y fotocopiadoras.',
    price: 7800,
    imageUrl: 'https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?w=600&auto=format&fit=crop&q=80',
    category: 'papeleria',
    isFeatured: true,
    inStock: true,
    brand: 'Report',
  },
  {
    id: 'p7',
    name: 'Archivador Bibliorato Oficio Reforzado',
    description: 'Bibliorato de cartón forrado con herraje palanca niquelado y puntera metálica protectora.',
    price: 3900,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
    category: 'oficina',
    isFeatured: false,
    inStock: true,
    brand: 'The Agenda',
  },
  {
    id: 'p8',
    name: 'Abrochadora de Mesa Metálica Pizzini',
    description: 'Abrochadora profesional metálica con capacidad para hasta 25 hojas de papel bond standard.',
    price: 6400,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    category: 'oficina',
    isFeatured: false,
    inStock: true,
    brand: 'Pizzini',
  },

  // Artistica
  {
    id: 'p9',
    name: 'Acuarelas Profesionales x24 Pastillas',
    description: 'Paleta completa de pigmentos de alta saturación con pincel recargable con depósito de agua.',
    price: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=600&auto=format&fit=crop&q=80',
    category: 'artistica',
    isFeatured: true,
    inStock: true,
    brand: 'Pizzini Art',
  },
  {
    id: 'p10',
    name: 'Set de Pinceles Sintéticos x6 Diferentes Puntas',
    description: 'Pinceles de pelo de nylon fino para acrílicos, acuarelas y óleo. Incluye chatos y redondos.',
    price: 3600,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    category: 'artistica',
    isFeatured: false,
    inStock: true,
    brand: 'Eterna',
  },
  {
    id: 'p11',
    name: 'Acrílicos Decorativos Eterna x6 Colores Premium',
    description: 'Pintura acrílica de excelente consistencia y gran poder cubritivo. Frascos de 50ml cada uno.',
    price: 5400,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    category: 'artistica',
    isFeatured: true,
    inStock: true,
    brand: 'Eterna',
  },

  // Papelería adicional
  {
    id: 'p12',
    name: 'Notas Autoadhesivas 76x76mm Pastel x4',
    description: 'Tacos de notas reposicionables en suaves colores pastel para recordatorios de oficina o estudio.',
    price: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
    category: 'oficina',
    isFeatured: false,
    inStock: true,
    brand: 'Kores',
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Fotocopias e Impresiones',
    iconName: 'Printer',
    description: 'Servicio de fotocopiado e impresión de documentos, apuntes, tesis e informes en blanco/neggro o a todo color.',
    basePrice: 50,
    bannerBg: 'bg-gradient-to-br from-indigo-500 to-purple-600 outline-indigo-200',
    badge: 'La más rápida',
    details: [
      'Impresión rápida por sistema láser o chorro de tinta',
      'Papel de 75g y 80g de alta blancura',
      'Descuentos especiales por cantidad (ideal para estudiantes)',
      'Opciones de doble faz automático'
    ]
  },
  {
    id: 's2',
    name: 'Anillados y Encuadernación',
    iconName: 'Layers',
    description: 'Protege y organiza tus apuntes, monografías, manuales u hojas sueltas con nuestros anillados metálicos o espiralados de plástico.',
    basePrice: 1500,
    bannerBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 outline-emerald-200',
    badge: 'Organiza tus apuntes',
    details: [
      'Espiral plástico de alta elasticidad',
      'Tapas de PP transparentes u opacas de colores',
      'Tamaños A4, Carta u Oficio',
      'Trabajos en el acto (según disponibilidad)'
    ]
  },
  {
    id: 's3',
    name: 'Plastificados y Laminación',
    iconName: 'ShieldAlert',
    description: 'Servicio de plastificado en caliente para preservar credenciales, menús, carátulas y documentos importantes del paso del tiempo.',
    basePrice: 1800,
    bannerBg: 'bg-gradient-to-br from-amber-500 to-rose-600 outline-amber-200',
    badge: 'Protección permanente',
    details: [
      'Espesor de 150 micrones súper rígido',
      'Excelente transparencia y sellado hermético',
      'Tamaño Carnet hasta Oficio / A4',
      'Previene arrugas, humedad y manchas'
    ]
  }
];

export const PROMOTIONS: Promo[] = [
  {
    id: 'pr1',
    name: 'Combo Escolar Primaria completo',
    description: 'Kit pensado especialmente para el comienzo de clases. ¡Todo lo que necesitan en una sola caja!',
    price: 12500,
    originalPrice: 15500,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    items: [
      '1 Caja de Lápices de Colores x12 Faber-Castell',
      '2 Lápices negros de grafito HB2',
      '1 Goma de borrar blanca dos banderas',
      '1 Regla plástica flexible de 20 cm Maped',
      '1 Sacapuntas con depósito para viruta',
      '2 Cuadernos tapa dura de 48 hojas'
    ],
    badge: 'Vuelta al Cole',
    colorTheme: 'amber'
  },
  {
    id: 'pr2',
    name: 'Súper Kit Secundaria & Universidad',
    description: 'El combo de resaltadores, cuadernos y lapiceras ideal para llevar al aula y organizar tu estudio.',
    price: 16900,
    originalPrice: 21200,
    imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80',
    items: [
      '2 Cuadernos Universitarios Rayados Éxito',
      '4 Lapiceras Bic Cristal (Azul, Negro, Rojo, Verde)',
      '1 Kit de 4 Resaltadores Swing Cool Maped',
      '1 Taco de notas autoadhesivas de colores',
      '1 Corrector líquido de cinta tipo lápiz'
    ],
    badge: 'Más Vendido 🌟',
    colorTheme: 'blue'
  },
  {
    id: 'pr3',
    name: 'Kit Oficina Básica',
    description: 'Equipa tu escritorio o espacio de home-office con los indispensables de papelería y archivo.',
    price: 19500,
    originalPrice: 24500,
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
    items: [
      '1 Resma de Papel A4 Hojas Blancas Report75g',
      '2 Archivadores Biblioratos reforzados',
      '1 Abrochadora de mesa metálica robusta',
      '1 Bloque de notas adhesivas amarillas 76x76',
      '2 Cajas de clips metálicos medianos'
    ],
    badge: 'Home Office',
    colorTheme: 'purple'
  }
];

export const STORE_INFO = {
  name: 'Librería Colores',
  tagline: 'Todo para aprender y crear',
  phone: '+5491122334455', // Replace with fake but realistic whatsapp phone number
  whatsappUrl: 'https://wa.me/5491122334455', // Simulated link with pre-filled message generator
  address: 'Italia 32, Villa del Rosario, Entre Ríos',
  schedule: 'Lunes a Viernes de 8:00 a 12:00 hs. y 16:00 a 19:30 hs. Sábados: Sólo por la mañana.',
  email: 'contacto@libreriacolores.com.ar',
  social: {
    instagram: '@libreria.colores',
    facebook: 'LibreriaColoresOk',
  },
  aboutText: 'Librería Colores nació en el año 2004 con la vocación de proveer los mejores elementos para el estudio y el trabajo en nuestra comunidad. Con más de 20 años de trayectoria continuada, nos hemos convertido en un referente de cercanía, confianza y asesoramiento especializado para familias, estudiantes universitarios y oficinas de la zona.',
  values: [
    {
      title: 'Más de 20 años de experiencia',
      description: 'Conocemos el rubro y sabemos exactamente qué producto sugerirte para tus tareas.',
      icon: 'Calendar'
    },
    {
      title: 'Atención Cercana y Cálida',
      description: 'Para nosotros no sos un cliente más. Ofrecemos el trato personalizado y la buena energía de siempre.',
      icon: 'Heart'
    },
    {
      title: 'Innovación & Creatividad',
      description: 'Siempre sumamos las últimas tendencias en lettering, diseño y artículos escolares artísticos.',
      icon: 'Sparkles'
    },
    {
      title: 'Servicio Rápido y de Calidad',
      description: 'Impresiones en el día y anillados veloces para que tus entregas se vean profesionales.',
      icon: 'Zap'
    }
  ]
};
