
// Interface for Weather data
export interface WeatherData {
  temperature: number;
  conditions: string;
  icon: string;
  sunlight: 'bright' | 'medium' | 'low' | 'night';
  location: string;
}

// Get user's location using browser geolocation
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

// Fetch weather data from OpenWeatherMap API
export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b5edaf9e026279c191f161c5caf688ac`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    // Determine sunlight level based on weather conditions and time
    let sunlight: 'bright' | 'medium' | 'low' | 'night' = 'medium';
    const conditions = data.weather[0].main.toLowerCase();
    const clouds = data.clouds?.all || 0;
    const dt = data.dt * 1000; // Convert to milliseconds
    const sunrise = data.sys.sunrise * 1000;
    const sunset = data.sys.sunset * 1000;
    
    // Check if it's nighttime
    if (dt < sunrise || dt > sunset) {
      sunlight = 'night';
    } else if (conditions.includes('clear') && clouds < 30) {
      sunlight = 'bright';
    } else if (conditions.includes('cloud') || conditions.includes('mist') || (clouds >= 30 && clouds < 70)) {
      sunlight = 'medium';
    } else if (conditions.includes('rain') || conditions.includes('snow') || conditions.includes('drizzle') || conditions.includes('thunderstorm') || clouds >= 70) {
      sunlight = 'low';
    }
    
    return {
      temperature: Math.round(data.main.temp),
      conditions: data.weather[0].description,
      icon: data.weather[0].icon,
      sunlight,
      location: data.name
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};
