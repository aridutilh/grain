const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('Google Maps API key is missing. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
}

export const GOOGLE_MAPS_CONFIG = {
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  defaultOptions: {
    zoom: 13,
    center: { lat: 0, lng: 0 },
  },
} as const;

export const FILM_STORE_SEARCH_OPTIONS = {
  type: 'store',
  keyword: 'film camera store OR photography store OR film development',
  radius: 5000, // 5km radius
} as const; 