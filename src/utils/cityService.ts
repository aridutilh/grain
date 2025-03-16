import { OPENWEATHER_CONFIG } from './apiConfig';

interface CityResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export const searchCities = async (query: string): Promise<CityResult[]> => {
  if (!query.trim() || query.length < 3) return [];

  try {
    console.log('Searching for cities with query:', query);
    const url = `${OPENWEATHER_CONFIG.baseUrl}${OPENWEATHER_CONFIG.endpoints.geocoding}?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHER_CONFIG.apiKey}`;
    console.log('Request URL:', url);

    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to fetch city suggestions: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!Array.isArray(data)) {
      console.error('Unexpected API response format:', data);
      return [];
    }

    const cities = data.map(city => ({
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }));

    console.log('Processed cities:', cities);
    return cities;
  } catch (error) {
    console.error('Error in searchCities:', error);
    return [];
  }
}; 