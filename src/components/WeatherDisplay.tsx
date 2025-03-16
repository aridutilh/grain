
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/utils/weatherService';
import { CloudSun, CloudRain, Sun, CloudSnow, Loader2, MapPin } from 'lucide-react';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const WeatherDisplay = ({ weatherData, isLoading, error }: WeatherDisplayProps) => {
  const [icon, setIcon] = useState<JSX.Element>(<CloudSun className="h-12 w-12 text-blue-500" />);
  
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.conditions.toLowerCase();
      
      if (condition.includes('clear') || condition.includes('sun')) {
        setIcon(<Sun className="h-12 w-12 text-amber-500" />);
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
        setIcon(<CloudRain className="h-12 w-12 text-blue-500" />);
      } else if (condition.includes('snow')) {
        setIcon(<CloudSnow className="h-12 w-12 text-blue-200" />);
      } else {
        setIcon(<CloudSun className="h-12 w-12 text-blue-400" />);
      }
    }
  }, [weatherData]);
  
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mb-6 bg-white/90 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-lg text-gray-600">Fetching weather data...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mb-6 bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <div className="text-center">
            <CloudSun className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Weather Unavailable</h3>
            <p className="text-gray-600 mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!weatherData) {
    return null;
  }
  
  return (
    <Card className="w-full max-w-md mx-auto mb-6 bg-white/90 backdrop-blur shadow-lg border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-1">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <p className="text-sm text-gray-600">{weatherData.location}</p>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</h2>
            <p className="text-gray-600 capitalize">{weatherData.conditions}</p>
          </div>
          <div className="flex-shrink-0">{icon}</div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Light conditions:</span>{' '}
            {weatherData.sunlight === 'bright' && 'Bright sunlight'}
            {weatherData.sunlight === 'medium' && 'Moderate light'}
            {weatherData.sunlight === 'low' && 'Overcast/Low light'}
            {weatherData.sunlight === 'night' && 'Night/Very low light'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
