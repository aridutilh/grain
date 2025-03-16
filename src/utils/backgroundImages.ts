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
  // If it's nighttime, always return rainy1 regardless of conditions
  if (!isDaytime) {
    return [rainy1];
  }
  
  // For daytime conditions
  switch (conditions?.toLowerCase() || 'default') {
    case 'clear':
    case 'sunny':
      return [sunny1];
    case 'cloudy':
    case 'partly cloudy':
    case 'mostly cloudy':
    case 'rain':
    case 'rainy':
    case 'showers':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
    case 'drizzle':
      return [cloudy1];
    default:
      return [sunny1]; // Default to sunny for daytime landing page
  }
} 