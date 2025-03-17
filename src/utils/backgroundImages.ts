// Import real images
import sunny1 from '../assets/images/sunny1.jpg';
import cloudy1 from '../assets/images/cloudy1.jpg';
import rainy1 from '../assets/images/rainy1.jpg';

interface BackgroundSets {
  sunny: {
    day: string[];
    night: string[];
  };
  cloudy: {
    day: string[];
    night: string[];
  };
  rainy: {
    day: string[];
    night: string[];
  };
}

const backgroundSets: BackgroundSets = {
  sunny: {
    day: [sunny1],
    night: [rainy1]
  },
  cloudy: {
    day: [cloudy1],
    night: [rainy1]
  },
  rainy: {
    day: [cloudy1],
    night: [rainy1]
  }
};

export function getBackgroundSetForWeather(conditions: string, isDaytime: boolean = true): string[] {
  console.log('getBackgroundSetForWeather called with:', { conditions, isDaytime });
  
  // If it's nighttime, always return rainy1 regardless of conditions
  if (!isDaytime) {
    console.log('Nighttime detected, returning rainy1');
    return [rainy1];
  }
  
  // For daytime conditions
  const normalizedConditions = conditions?.toLowerCase() || 'default';
  console.log('Normalized conditions:', normalizedConditions);
  
  switch (normalizedConditions) {
    case 'clear':
    case 'sunny':
      console.log('Sunny conditions detected, returning sunny1');
      return [sunny1];
    case 'clouds':
    case 'mist':
    case 'fog':
    case 'haze':
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      console.log('Cloudy/rainy conditions detected, returning cloudy1');
      return [cloudy1];
    default:
      console.log('Default case, returning sunny1');
      return [sunny1]; // Default to sunny for daytime landing page
  }
} 