export interface FilmStock {
  id: string;
  name: string;
  brand: string;
  iso: number;
  format: ('35mm' | '120' | 'sheet')[];
  type: 'color' | 'blackAndWhite';
  description: string;
  idealConditions: ('bright' | 'medium' | 'low' | 'night')[];
  imageUrl: string;
  lomographyUrl: string;
}

// Film stock database
export const filmStocks: FilmStock[] = [
  {
    id: 'portra400',
    name: 'Portra 400',
    brand: 'Kodak',
    iso: 400,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Fine grain, exceptional skin tones, and excellent color rendition even when overexposed.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/L57PVKV.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Portra+400&age=forever'
  },
  {
    id: 'portra160',
    name: 'Portra 160',
    brand: 'Kodak',
    iso: 160,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Finer grain than Portra 400, excellent for bright conditions with superb skin tones.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/jLEOCRn.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Portra+160&age=forever'
  },
  {
    id: 'ektar100',
    name: 'Ektar 100',
    brand: 'Kodak',
    iso: 100,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Vibrant colors, ultra-fine grain, perfect for landscape and nature photography.',
    idealConditions: ['bright'],
    imageUrl: 'https://i.imgur.com/SsKo14w.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Ektar+100&age=forever'
  },
  {
    id: 'hp5plus',
    name: 'HP5 Plus',
    brand: 'Ilford',
    iso: 400,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Classic black and white film with beautiful grain, extremely versatile in various lighting conditions.',
    idealConditions: ['bright', 'medium', 'low'],
    imageUrl: 'https://i.imgur.com/L5Kwyym.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=HP5+Plus&age=forever'
  },
  {
    id: 'trix400',
    name: 'Tri-X 400',
    brand: 'Kodak',
    iso: 400,
    format: ['35mm', '120'],
    type: 'blackAndWhite',
    description: 'Iconic black and white film with distinctive grain structure, excellent contrast.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/1KvTCUO.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Tri-X+400&age=forever'
  },
  {
    id: 'fujivelvia50',
    name: 'Velvia 50',
    brand: 'Fujifilm',
    iso: 50,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Ultra-vivid color slide film, exceptional for landscapes with extremely fine grain.',
    idealConditions: ['bright'],
    imageUrl: 'https://i.imgur.com/7LE8tLP.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Velvia+50&age=forever'
  },
  {
    id: 'fujipro400h',
    name: 'Pro 400H',
    brand: 'Fujifilm',
    iso: 400,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Beautiful pastel colors and excellent skin tones, works well in various lighting conditions.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/N7hqxSw.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Pro+400H&age=forever'
  },
  {
    id: 'delta3200',
    name: 'Delta 3200',
    brand: 'Ilford',
    iso: 3200,
    format: ['35mm', '120'],
    type: 'blackAndWhite',
    description: 'High-speed film for low light conditions, distinctive grain structure.',
    idealConditions: ['low', 'night'],
    imageUrl: 'https://i.imgur.com/AZl8lNF.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Delta+3200&age=forever'
  },
  {
    id: 'cinestill800t',
    name: 'CineStill 800T',
    brand: 'CineStill',
    iso: 800,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Tungsten-balanced color film, excellent for night photography and artificial lighting.',
    idealConditions: ['low', 'night'],
    imageUrl: 'https://i.imgur.com/RI1TmHn.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=CineStill+800T&age=forever'
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
    imageUrl: 'https://i.imgur.com/2IbFxWL.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Fujicolor+200&age=forever'
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
    imageUrl: 'https://i.imgur.com/Dc10OhF.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Gold+200&age=forever'
  },
  {
    id: 'ilforddelta100',
    name: 'Delta 100',
    brand: 'Ilford',
    iso: 100,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Fine grain black and white film with excellent tonal range.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/tFAQnbx.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Delta+100&age=forever'
  },
  {
    id: 'provia100f',
    name: 'Provia 100F',
    brand: 'Fujifilm',
    iso: 100,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Professional color slide film with neutral color balance and fine grain, excellent for landscapes and product photography.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/QX4J8n1.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Provia+100F&age=forever'
  },
  {
    id: 'acros100ii',
    name: 'Acros II 100',
    brand: 'Fujifilm',
    iso: 100,
    format: ['35mm', '120'],
    type: 'blackAndWhite',
    description: 'Ultra-fine grain black and white film with excellent sharpness and smooth tonal gradation.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/Y5qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Acros+II+100&age=forever'
  },
  {
    id: 'tmax100',
    name: 'T-Max 100',
    brand: 'Kodak',
    iso: 100,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Extremely fine grain black and white film with high sharpness, perfect for detailed work.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/K8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=T-Max+100&age=forever'
  },
  {
    id: 'tmax400',
    name: 'T-Max 400',
    brand: 'Kodak',
    iso: 400,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Versatile black and white film with excellent detail and contrast, good for various lighting conditions.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/L8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=T-Max+400&age=forever'
  },
  {
    id: 'portra800',
    name: 'Portra 800',
    brand: 'Kodak',
    iso: 800,
    format: ['35mm', '120'],
    type: 'color',
    description: 'High-speed color film with beautiful skin tones, ideal for low light and indoor photography.',
    idealConditions: ['low', 'night'],
    imageUrl: 'https://i.imgur.com/M8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Portra+800&age=forever'
  },
  {
    id: 'superia400',
    name: 'Superia X-TRA 400',
    brand: 'Fujifilm',
    iso: 400,
    format: ['35mm'],
    type: 'color',
    description: 'Versatile consumer color film with vibrant colors and good exposure latitude.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/N8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Superia+X-TRA+400&age=forever'
  },
  {
    id: 'colorplus200',
    name: 'ColorPlus 200',
    brand: 'Kodak',
    iso: 200,
    format: ['35mm'],
    type: 'color',
    description: 'Budget-friendly color film with warm tones and good versatility.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/O8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=ColorPlus+200&age=forever'
  },
  {
    id: 'fomapan100',
    name: 'Fomapan 100',
    brand: 'Foma',
    iso: 100,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Classic black and white film with traditional grain structure and good tonal range.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/P8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Fomapan+100&age=forever'
  },
  {
    id: 'fomapan400',
    name: 'Fomapan 400',
    brand: 'Foma',
    iso: 400,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Versatile black and white film with pronounced grain and good contrast.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/Q8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Fomapan+400&age=forever'
  },
  {
    id: 'rpx25',
    name: 'RPX 25',
    brand: 'Rollei',
    iso: 25,
    format: ['35mm', '120'],
    type: 'blackAndWhite',
    description: 'Ultra-fine grain black and white film with exceptional detail, ideal for bright conditions.',
    idealConditions: ['bright'],
    imageUrl: 'https://i.imgur.com/R8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=RPX+25&age=forever'
  },
  {
    id: 'cinestill50d',
    name: 'CineStill 50D',
    brand: 'CineStill',
    iso: 50,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Motion picture film adapted for still photography, produces vibrant colors in daylight.',
    idealConditions: ['bright'],
    imageUrl: 'https://i.imgur.com/S8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=CineStill+50D&age=forever'
  },
  {
    id: 'kodakgold400',
    name: 'Gold 400',
    brand: 'Kodak',
    iso: 400,
    format: ['35mm'],
    type: 'color',
    description: 'Higher speed version of Gold 200, offering the same warm tones with better low-light performance. Great for everyday photography.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/T8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Gold+400&age=forever'
  },
  {
    id: 'fp4plus',
    name: 'FP4 Plus 125',
    brand: 'Ilford',
    iso: 125,
    format: ['35mm', '120', 'sheet'],
    type: 'blackAndWhite',
    description: 'Fine-grained black and white film with excellent sharpness and tonal range, perfect for detailed work in good lighting conditions.',
    idealConditions: ['bright', 'medium'],
    imageUrl: 'https://i.imgur.com/U8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=FP4+Plus+125&age=forever'
  },
  {
    id: 'lomo400',
    name: 'Color Negative 400',
    brand: 'Lomography',
    iso: 400,
    format: ['35mm', '120'],
    type: 'color',
    description: 'Vibrant colors with a distinctive look, great for creative photography with enhanced saturation and good exposure latitude.',
    idealConditions: ['medium', 'low'],
    imageUrl: 'https://i.imgur.com/V8qZ9n2.jpg',
    lomographyUrl: 'https://www.lomography.com/search?query=Color+Negative+400&age=forever'
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
