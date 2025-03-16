
export interface FilmStock {
  id: string;
  name: string;
  brand: string;
  iso: number;
  format: ('35mm' | '120mm' | 'sheet')[];
  type: 'color' | 'blackAndWhite';
  description: string;
  idealConditions: ('bright' | 'medium' | 'low' | 'night')[];
  imageUrl: string;
}

// Film stock database
export const filmStocks: FilmStock[] = [
  {
    id: 'portra400',
    name: 'Portra 400',
    brand: 'Kodak',
    iso: 400,
    format: ['35mm', '120mm'],
    type: 'color',
    description: 'Fine grain, exceptional skin tones, and excellent color rendition even when overexposed.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/L57PVKV.jpg'
  },
  {
    id: 'portra160',
    name: 'Portra 160',
    brand: 'Kodak',
    iso: 160,
    format: ['35mm', '120mm'],
    type: 'color',
    description: 'Finer grain than Portra 400, excellent for bright conditions with superb skin tones.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/jLEOCRn.jpg'
  },
  {
    id: 'ektar100',
    name: 'Ektar 100',
    brand: 'Kodak',
    iso: 100,
    format: ['35mm', '120mm'],
    type: 'color',
    description: 'Vibrant colors, ultra-fine grain, perfect for landscape and nature photography.',
    idealConditions: ['bright'],
    imageUrl: 'https://i.imgur.com/SsKo14w.jpg'
  },
  {
    id: 'hp5plus',
    name: 'HP5 Plus',
    brand: 'Ilford',
    iso: 400,
    format: ['35mm', '120mm', 'sheet'],
    type: 'blackAndWhite',
    description: 'Classic black and white film with beautiful grain, extremely versatile in various lighting conditions.',
    idealConditions: ['bright', 'medium', 'low'],
    imageUrl: 'https://i.imgur.com/L5Kwyym.jpg'
  },
  {
    id: 'trix400',
    name: 'Tri-X 400',
    brand: 'Kodak',
    iso: 400,
    format: ['35mm', '120mm'],
    type: 'blackAndWhite',
    description: 'Iconic black and white film with distinctive grain structure, excellent contrast.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/1KvTCUO.jpg'
  },
  {
    id: 'fujivelvia50',
    name: 'Velvia 50',
    brand: 'Fujifilm',
    iso: 50,
    format: ['35mm', '120mm'],
    type: 'color',
    description: 'Ultra-vivid color slide film, exceptional for landscapes with extremely fine grain.',
    idealConditions: ['bright'],
    imageUrl: 'https://i.imgur.com/7LE8tLP.jpg'
  },
  {
    id: 'fujipro400h',
    name: 'Pro 400H',
    brand: 'Fujifilm',
    iso: 400,
    format: ['35mm', '120mm'],
    type: 'color',
    description: 'Beautiful pastel colors and excellent skin tones, works well in various lighting conditions.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/N7hqxSw.jpg'
  },
  {
    id: 'delta3200',
    name: 'Delta 3200',
    brand: 'Ilford',
    iso: 3200,
    format: ['35mm', '120mm'],
    type: 'blackAndWhite',
    description: 'High-speed film for low light conditions, distinctive grain structure.',
    idealConditions: ['low', 'night'],
    imageUrl: 'https://i.imgur.com/AZl8lNF.jpg'
  },
  {
    id: 'cinestill800t',
    name: 'CineStill 800T',
    brand: 'CineStill',
    iso: 800,
    format: ['35mm', '120mm'],
    type: 'color',
    description: 'Tungsten-balanced color film, excellent for night photography and artificial lighting.',
    idealConditions: ['low', 'night'],
    imageUrl: 'https://i.imgur.com/RI1TmHn.jpg'
  },
  {
    id: 'fujicolor200',
    name: 'Fujicolor 200',
    brand: 'Fujifilm',
    iso: 200,
    format: ['35mm'],
    type: 'color',
    description: 'Versatile everyday color film with good balance of grain and color rendition.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/2IbFxWL.jpg'
  },
  {
    id: 'kodakgold200',
    name: 'Gold 200',
    brand: 'Kodak',
    iso: 200,
    format: ['35mm'],
    type: 'color',
    description: 'Warm color rendition, perfect for everyday shooting with good value.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/Dc10OhF.jpg'
  },
  {
    id: 'ilforddelta100',
    name: 'Delta 100',
    brand: 'Ilford',
    iso: 100,
    format: ['35mm', '120mm', 'sheet'],
    type: 'blackAndWhite',
    description: 'Fine grain black and white film with excellent tonal range.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/tFAQnbx.jpg'
  }
];

// Function to filter film stocks based on weather and preferences
export const getRecommendedFilmStocks = (
  sunlight: 'bright' | 'medium' | 'low' | 'night',
  filters: {
    format: string[];
    type: string[];
    minIso?: number;
    maxIso?: number;
  }
): FilmStock[] => {
  return filmStocks.filter(film => {
    // Filter by sunlight conditions
    if (!film.idealConditions.includes(sunlight)) {
      return false;
    }
    
    // Filter by format
    if (filters.format.length > 0 && !filters.format.some(f => film.format.includes(f as any))) {
      return false;
    }
    
    // Filter by type (color or black and white)
    if (filters.type.length > 0 && !filters.type.includes(film.type)) {
      return false;
    }
    
    // Filter by ISO range
    if (filters.minIso !== undefined && film.iso < filters.minIso) {
      return false;
    }
    
    if (filters.maxIso !== undefined && film.iso > filters.maxIso) {
      return false;
    }
    
    return true;
  });
};
