import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { FilmStock, getRecommendedFilmStocks } from '@/utils/filmStocks';
import { fetchWeatherByLocation, WeatherData } from '@/utils/weatherService';
import WeatherDisplay from '@/components/WeatherDisplay';
import LocationSearch from '@/components/LocationSearch';
import { Camera } from 'lucide-react';
import BackgroundRotator from '@/components/BackgroundRotator';
import { getBackgroundSetForWeather } from '@/utils/backgroundImages';
import { searchCities } from '@/utils/cityService';
import { motion, AnimatePresence } from 'framer-motion';
import { Toggle } from "@/components/ui/toggle";

type FilterType = '35mm' | '120' | 'color' | 'bw';

const buttonStyles = "text-white/90 hover:text-white border border-white/20 data-[state=on]:bg-white/20 data-[state=on]:text-white";

const Index = () => {
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedFilms, setRecommendedFilms] = useState<FilmStock[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [weatherData]);

  const handleLocationSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const cities = await searchCities(location);
      
      // If we have cities, use the first match instead of requiring exact match
      if (cities && cities.length > 0) {
        const weather = await fetchWeatherByLocation({
          lat: cities[0].lat,
          lon: cities[0].lon
        });
        
        setWeatherData(weather);
        updateRecommendations(weather, activeFilters);
      } else {
        // If no cities found, try direct location search as fallback
        const weather = await fetchWeatherByLocation(location);
        setWeatherData(weather);
        updateRecommendations(weather, activeFilters);
      }
    } catch (err) {
      console.error(err);
      setError("Could not find weather data for this location. Please try another city name.");
      
      toast({
        variant: "destructive",
        title: "Location error",
        description: "Could not find weather data for this location.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecommendations = (weather: WeatherData, filters: FilterType[]) => {
    let recommendations = getRecommendedFilmStocks(weather.sunlight, {
      format: filters.filter(f => ['35mm', '120'].includes(f)),
      type: filters.filter(f => ['color', 'bw'].includes(f)).map(f => f === 'bw' ? 'blackAndWhite' : f),
      minIso: 50,
      maxIso: weather.isDaytime ? 800 : 3200 // Higher ISO for night shots
    });

    // Sort by ISO (higher ISO first for night shots)
    recommendations.sort((a, b) => {
      if (!weather.isDaytime) {
        return b.iso - a.iso; // Higher ISO first for night
      }
      return a.iso - b.iso; // Lower ISO first for day
    });

    setRecommendedFilms(recommendations);
  };

  const toggleFilter = (filter: FilterType) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
    if (weatherData) {
      updateRecommendations(weatherData, newFilters);
    }
  };

  return (
    <BackgroundRotator 
      images={weatherData 
        ? getBackgroundSetForWeather(weatherData.conditions, weatherData.isDaytime)
        : getBackgroundSetForWeather('sunny', true)}
      interval={7000}
    >
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {weatherData ? (
            <>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <WeatherDisplay 
                    weather={weatherData} 
                    onBack={() => {
                      setWeatherData(null);
                      setActiveFilters([]);
                    }}
                  />
                  
                  <div className="flex flex-wrap gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Toggle
                      pressed={activeFilters.includes('35mm')}
                      onPressedChange={() => toggleFilter('35mm')}
                      className="text-white/90 hover:bg-black/40 hover:text-white/90 border border-white/20 data-[state=on]:bg-white/20 data-[state=on]:text-white transition-colors"
                    >
                      35mm
                    </Toggle>
                    <Toggle
                      pressed={activeFilters.includes('120')}
                      onPressedChange={() => toggleFilter('120')}
                      className="text-white/90 hover:bg-black/40 hover:text-white/90 border border-white/20 data-[state=on]:bg-white/20 data-[state=on]:text-white transition-colors"
                    >
                      120
                      
                    </Toggle>
                    <Toggle
                      pressed={activeFilters.includes('color')}
                      onPressedChange={() => toggleFilter('color')}
                      className="text-white/90 hover:bg-black/40 hover:text-white/90 border border-white/20 data-[state=on]:bg-white/20 data-[state=on]:text-white transition-colors"
                    >
                      Color
                    </Toggle>
                    <Toggle
                      pressed={activeFilters.includes('bw')}
                      onPressedChange={() => toggleFilter('bw')}
                      className="text-white/90 hover:bg-black/40 hover:text-white/90 border border-white/20 data-[state=on]:bg-white/20 data-[state=on]:text-white transition-colors"
                    >
                      B&W
                    </Toggle>
                  </div>
                </div>
                
                <AnimatePresence>
                  <div className="space-y-2">
                    {recommendedFilms.map((film, index) => (
                      <motion.a
                        key={film.id}
                        href={film.lomographyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="block bg-black/40 backdrop-blur-sm rounded-lg p-4 hover:bg-black/50 transition-colors"
                      >
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className="text-white">
                              <h3 className="font-medium">{film.name}</h3>
                              <p className="text-sm text-white/70">
                                {film.type === 'color' ? 'Color' : 'Black & White'} · {film.format.join(', ')} · ISO {film.iso}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-white/70">{film.description}</p>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white/90">
                              View on Lomography →
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                    {recommendedFilms.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-white/70"
                      >
                        No film stocks match your current filters.
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="min-h-screen flex flex-col">
              <AnimatePresence>
                {!weatherData && (
                  <motion.div 
                    className="flex-1 flex flex-col items-center justify-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                      </div>
                      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        Grain
                      </h1>
                      <p className="text-xl text-gray-200 max-w-xl mx-auto">
                        Film stock recommendations based on your local conditions
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="w-full max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <LocationSearch onSearch={handleLocationSearch} isLoading={isLoading} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
          made by <a href="https://dutilh.net" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">ari</a>
        </div>
      </div>
    </BackgroundRotator>
  );
};

export default Index;

