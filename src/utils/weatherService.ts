import { OPENWEATHER_CONFIG } from './apiConfig';

// Interface for Weather data
export interface WeatherData {
  temperature: number;
  conditions: string;
  icon: string;
  sunlight: 'bright' | 'medium' | 'low' | 'night';
  location: string;
  country: string;
  localTime: Date;
  isDaytime: boolean;
}

interface Coordinates {
  lat: number;
  lon: number;
}

function calculateSunlightLevel(data: any): 'bright' | 'medium' | 'low' | 'night' {
  const currentTime = data.dt * 1000;
  const sunrise = data.sys.sunrise * 1000;
  const sunset = data.sys.sunset * 1000;
  const clouds = data.clouds?.all || 0;
  const conditions = data.weather[0].main.toLowerCase();

  // Night time
  if (currentTime < sunrise || currentTime > sunset) {
    return 'night';
  }

  // Day time conditions
  if (conditions.includes('clear') && clouds < 30) {
    return 'bright';
  } else if (conditions.includes('cloud') || conditions.includes('mist') || (clouds >= 30 && clouds < 70)) {
    return 'medium';
  } else if (conditions.includes('rain') || conditions.includes('snow') || conditions.includes('drizzle') || conditions.includes('thunderstorm') || clouds >= 70) {
    return 'low';
  }

  return 'medium';
}

// Fetch weather data from OpenWeatherMap API using city name or coordinates
export const fetchWeatherByLocation = async (location: string | Coordinates): Promise<WeatherData> => {
  try {
    console.log('Fetching weather for location:', location);
    
    const url = typeof location === 'string'
      ? `${OPENWEATHER_CONFIG.baseUrl}${OPENWEATHER_CONFIG.endpoints.weather}?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHER_CONFIG.apiKey}`
      : `${OPENWEATHER_CONFIG.baseUrl}${OPENWEATHER_CONFIG.endpoints.weather}?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${OPENWEATHER_CONFIG.apiKey}`;
    
    console.log('Weather API URL:', url);
    const response = await fetch(url);
    console.log('Weather API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Weather API Error:', errorText);
      throw new Error(`Location not found: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Weather API response data:', data);
    
    if (!data.weather?.[0] || !data.main?.temp) {
      console.error('Invalid weather data format:', data);
      throw new Error('Invalid weather data received');
    }

    // Calculate local time using UTC and timezone offset
    const utcTime = new Date();
    utcTime.setTime(utcTime.getTime() + utcTime.getTimezoneOffset() * 60 * 1000); // Convert to UTC
    const localTime = new Date(utcTime.getTime() + (data.timezone * 1000)); // Apply location's timezone offset
    
    const sunlight = calculateSunlightLevel(data);
    
    const weatherData: WeatherData = {
      temperature: Math.round(data.main.temp),
      conditions: data.weather[0].description,
      icon: data.weather[0].icon,
      sunlight,
      location: data.name,
      country: data.sys.country,
      localTime,
      isDaytime: sunlight !== 'night'
    };

    console.log('Processed weather data:', weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error in fetchWeatherByLocation:', error);
    throw error;
  }
};
