const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

console.log('Environment variables:', {
  'VITE_OPENWEATHER_API_KEY': import.meta.env.VITE_OPENWEATHER_API_KEY,
  'API_KEY value': API_KEY
});

if (!API_KEY) {
  console.error('OpenWeather API key is missing. Please add it to your .env file.');
}

export const OPENWEATHER_CONFIG = {
  apiKey: API_KEY || 'your_api_key_here', // Temporary fallback for debugging
  baseUrl: 'https://api.openweathermap.org',
  endpoints: {
    geocoding: '/geo/1.0/direct',
    weather: '/data/2.5/weather'
  }
} as const; 