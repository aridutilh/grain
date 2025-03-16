const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

console.log('Environment variables:', {
  'VITE_OPENWEATHER_API_KEY': import.meta.env.VITE_OPENWEATHER_API_KEY,
  'API_KEY value': API_KEY
});

if (!API_KEY) {
  throw new Error('OpenWeather API key is missing. Please add VITE_OPENWEATHER_API_KEY to your environment variables.');
}

export const OPENWEATHER_CONFIG = {
  apiKey: API_KEY,
  baseUrl: 'https://api.openweathermap.org',
  endpoints: {
    geocoding: '/geo/1.0/direct',
    weather: '/data/2.5/weather'
  }
} as const; 