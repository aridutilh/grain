const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Don't log the actual API key to console for security
console.log('Environment variables for Google Maps:', {
  'VITE_GOOGLE_MAPS_API_KEY': GOOGLE_MAPS_API_KEY ? '[KEY FOUND]' : '[MISSING]',
});

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key is missing. Film store search will use fallback data.');
}

export const GOOGLE_MAPS_CONFIG = {
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  defaultOptions: {
    zoom: 13,
    center: { lat: 0, lng: 0 },
  },
} as const;

// We provide multiple proxy options, and the code will try them in order
export const PROXY_OPTIONS = [
  // Option 1: Direct call (might work with proper CORS setup)
  'https://maps.googleapis.com',
  
  // Option 2: Custom backend proxy (requires server deployment)
  // Now using corsproxy.io as our primary option
  'https://corsproxy.io/?' + encodeURIComponent('https://maps.googleapis.com'),
  
  // Option 3: Free public proxy (may have request limits)
  'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://maps.googleapis.com')
];

// Default to corsproxy.io
export const MAPS_PROXY_SERVICE = PROXY_OPTIONS[1];

// Common parameters for film store searches
export const FILM_STORE_SEARCH_OPTIONS = {
  keyword: 'film camera store OR photography store OR film development OR camera shop',
  radius: 5000, // 5km radius
  rankby: 'prominence',
  types: ['store', 'shopping_mall', 'establishment']
} as const;

// Provides a more user-friendly error message from API error codes
export const getAPIErrorMessage = (statusCode: string): string => {
  const errorMessages: Record<string, string> = {
    'ZERO_RESULTS': 'No stores found in this area.',
    'OVER_QUERY_LIMIT': 'The API usage limit has been reached.',
    'REQUEST_DENIED': 'The request was denied. Check API key configuration.',
    'INVALID_REQUEST': 'Invalid request parameters.',
    'UNKNOWN_ERROR': 'Unknown server error. Please try again later.',
    'NOT_FOUND': 'The requested resource was not found.'
  };
  
  return errorMessages[statusCode] || `API error: ${statusCode}`;
}; 