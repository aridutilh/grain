
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { FilmStock, getRecommendedFilmStocks } from '@/utils/filmStocks';
import { getUserLocation, fetchWeatherData, WeatherData } from '@/utils/weatherService';
import WeatherDisplay from '@/components/WeatherDisplay';
import FilmFilters from '@/components/FilmFilters';
import FilmCard from '@/components/FilmCard';
import LocationPrompt from '@/components/LocationPrompt';
import { Camera, CloudSun } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [recommendedFilms, setRecommendedFilms] = useState<FilmStock[]>([]);
  const [filters, setFilters] = useState({
    format: [] as string[],
    type: [] as string[],
    minIso: 50,
    maxIso: 3200,
  });

  const fetchLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const position = await getUserLocation();
      setLocationPermission(true);
      
      const weather = await fetchWeatherData(
        position.coords.latitude,
        position.coords.longitude
      );
      
      setWeatherData(weather);
      
      // Get initial film recommendations based on weather
      const recommendations = getRecommendedFilmStocks(weather.sunlight, filters);
      setRecommendedFilms(recommendations);
      
      toast({
        title: "Location detected",
        description: `Weather data loaded for ${weather.location}`,
      });
    } catch (err) {
      console.error(err);
      setLocationPermission(false);
      setError("Could not access your location. Please enable location services and refresh the page.");
      
      toast({
        variant: "destructive",
        title: "Location error",
        description: "Could not access your location. Please enable location services.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: {
    format: string[];
    type: string[];
    minIso: number;
    maxIso: number;
  }) => {
    setFilters(newFilters);
    
    if (weatherData) {
      const recommendations = getRecommendedFilmStocks(weatherData.sunlight, newFilters);
      setRecommendedFilms(recommendations);
    }
  };

  useEffect(() => {
    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      // Ask for permission to check if we're allowed to get location
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            fetchLocation();
          } else if (permissionStatus.state === "prompt") {
            setLocationPermission(null); // Will show prompt
          } else {
            setLocationPermission(false);
            setError("Location access is denied. Please enable location services in your browser settings.");
          }
        });
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white bg-grain">
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Camera className="h-8 w-8 text-blue-500" />
            <CloudSun className="h-6 w-6 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Film Selector</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get film stock recommendations optimized for current weather conditions in your location.
          </p>
        </header>

        <div className="max-w-4xl mx-auto mb-8">
          {locationPermission === null ? (
            <LocationPrompt onRequestLocation={fetchLocation} />
          ) : (
            <WeatherDisplay 
              weatherData={weatherData} 
              isLoading={isLoading} 
              error={error} 
            />
          )}

          {weatherData && (
            <FilmFilters onFiltersChange={handleFiltersChange} />
          )}
        </div>

        {weatherData && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Recommended Film Stocks
              {filters.format.length > 0 || filters.type.length > 0 ? ' (Filtered)' : ''}
            </h2>
            
            {recommendedFilms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedFilms.map((film) => (
                  <FilmCard key={film.id} film={film} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No film stocks match your current filters. Try adjusting your filter criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
