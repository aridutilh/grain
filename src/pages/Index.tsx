import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { FilmStock, getRecommendedFilmStocks } from '@/utils/filmStocks';
import { fetchWeatherByLocation, WeatherData } from '@/utils/weatherService';
import WeatherDisplay from '@/components/WeatherDisplay';
import LocationSearch from '@/components/LocationSearch';
import { Camera, ChevronDown } from 'lucide-react';
import BackgroundRotator from '@/components/BackgroundRotator';
import { getBackgroundSetForWeather } from '@/utils/backgroundImages';
import { searchCities } from '@/utils/cityService';
import { motion, AnimatePresence } from 'framer-motion';
import { Toggle } from "@/components/ui/toggle";
import { FilmStoresMap } from '@/components/FilmStoresMap';

interface FilmStore {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating?: number;
  userRatingsTotal?: number;
  lat: number;
  lng: number;
}

type FilterType = '35mm' | '120' | 'color' | 'bw';

const buttonStyles = "text-white/90 hover:text-white border border-white/20 data-[state=on]:bg-white/20 data-[state=on]:text-white";

const Index = () => {
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedFilms, setRecommendedFilms] = useState<FilmStock[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [isStoresExpanded, setIsStoresExpanded] = useState(false);
  const [stores, setStores] = useState<FilmStore[]>([]);
  const [isStoresLoading, setIsStoresLoading] = useState(false);

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const searchNearbyStores = async (lat: number, lng: number) => {
    try {
      console.log('Starting store search for lat:', lat, 'lng:', lng);
      
      // Wait for Google Maps to load
      if (!window.google) {
        console.log('Waiting for Google Maps to load...');
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Google Maps failed to load'));
          }, 10000); // 10 second timeout

          const checkGoogle = () => {
            if (window.google) {
              clearTimeout(timeout);
              console.log('Google Maps loaded successfully');
              resolve();
            } else {
              setTimeout(checkGoogle, 100);
            }
          };
          checkGoogle();
        });
      }

      // Create a temporary div for the PlacesService
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      
      const service = new google.maps.places.PlacesService(tempDiv);
      
      const request = {
        location: new google.maps.LatLng(lat, lng),
        radius: 10000, // 10km radius
        type: 'store',
        keyword: 'camera film photography'
      };

      console.log('Making Places API request:', request);

      service.nearbySearch(request, (results, status) => {
        // Clean up the temporary div
        document.body.removeChild(tempDiv);

        console.log('Places API response status:', status);
        console.log('Number of results:', results?.length || 0);

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Filter for camera/film stores and sort by rating
          const filmStores: FilmStore[] = results
            .filter((place: any) => {
              const name = place.name.toLowerCase();
              const types = place.types || [];
              const isFilmStore = (
                name.includes('camera') || 
                name.includes('film') || 
                name.includes('photo') ||
                name.includes('lomography') ||
                types.includes('camera_store') ||
                types.includes('photography_store')
              );
              console.log('Store:', name, 'Types:', types, 'Is film store:', isFilmStore);
              return isFilmStore;
            })
            .map((place: any) => ({
              id: place.place_id,
              name: place.name,
              address: place.vicinity,
              distance: google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(lat, lng),
                place.geometry.location
              ) / 1000, // Convert to kilometers
              rating: place.rating || 0,
              userRatingsTotal: place.user_ratings_total || 0,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }))
            .sort((a: FilmStore, b: FilmStore) => {
              // Sort by rating first, then by number of ratings
              if (a.rating !== b.rating) {
                return b.rating - a.rating;
              }
              return b.userRatingsTotal - a.userRatingsTotal;
            })
            .slice(0, 4); // Only show top 4 stores

          console.log('Found film stores:', filmStores.length);
          if (filmStores.length > 0) {
            setStores(filmStores);
          } else {
            console.log('No film stores found in the area');
            setStores([]);
          }
        } else {
          console.log('Places API error:', status);
          setStores([]);
        }
      });
    } catch (error) {
      console.error('Error searching for film stores:', error);
      setStores([]);
    } finally {
      setIsStoresLoading(false);
    }
  };

  const handleLocationSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const cities = await searchCities(location);
      const cityMatch = cities.find(city => 
        `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}` === location
      );

      const weather = await fetchWeatherByLocation(
        cityMatch ? { lat: cityMatch.lat, lon: cityMatch.lon } : location
      );
      
      setWeatherData(weather);
      updateRecommendations(weather, activeFilters);
      
      // Start loading stores immediately
      setIsStoresLoading(true);
      searchNearbyStores(weather.lat, weather.lon);
      
      toast({
        title: "Location found",
        description: `Weather data loaded for ${weather.location}`,
      });
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
      <div className="min-h-screen bg-transparent">
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
                      setStores([]);
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mb-6"
                >
                  <button
                    onClick={() => setIsStoresExpanded(!isStoresExpanded)}
                    className="w-full flex items-center justify-between text-white/90 hover:text-white transition-colors"
                  >
                    <h2 className="text-xl font-medium">Top Film Stores Nearby</h2>
                    <motion.div
                      animate={{ rotate: isStoresExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isStoresExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <FilmStoresMap stores={stores} isLoading={isStoresLoading} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
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

