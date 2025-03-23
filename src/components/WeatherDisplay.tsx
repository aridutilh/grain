import { useEffect, useState, useRef } from 'react';
import { WeatherData } from '@/utils/weatherService';
import { CloudSun, CloudRain, Sun, CloudSnow, Loader2, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useTemperature } from '@/utils/temperatureContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WeatherDisplayProps {
  weather: WeatherData;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const WeatherDisplay = ({ weather, onBack, isLoading, error }: WeatherDisplayProps) => {
  const { getDefaultUnit, convertTemperature } = useTemperature();
  const [icon, setIcon] = useState<JSX.Element>(<CloudSun className="h-5 w-5 text-white/70" />);
  const [showAlternative, setShowAlternative] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimatingBack, setIsAnimatingBack] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle hover state changes
  useEffect(() => {
    if (isHovering) {
      // Immediately show alternative when hover starts
      setShowAlternative(true);
      setIsAnimatingBack(false);
      
      // Start cycling between units every 1.5 seconds after initial switch
      intervalRef.current = setInterval(() => {
        setShowAlternative(prev => !prev);
      }, 1500);
    } else if (!isHovering && !isAnimatingBack) {
      // When hover ends, clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Set animating back flag to true to trigger the smooth return animation
      setIsAnimatingBack(true);
    }
    
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]);
  
  useEffect(() => {
    if (weather) {
      const condition = weather.conditions.toLowerCase();
      
      if (condition.includes('clear') || condition.includes('sun')) {
        setIcon(<Sun className="h-5 w-5 text-amber-400" />);
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
        setIcon(<CloudRain className="h-5 w-5 text-blue-400" />);
      } else if (condition.includes('snow')) {
        setIcon(<CloudSnow className="h-5 w-5 text-blue-200" />);
      } else {
        setIcon(<CloudSun className="h-5 w-5 text-white/70" />);
      }
    }
  }, [weather]);
  
  // Handle animation complete for returning to default
  const handleAnimationComplete = () => {
    if (isAnimatingBack) {
      // Only reset to default temperature if we're not hovering and animation is complete
      if (!isHovering) {
        setShowAlternative(false);
      }
      setIsAnimatingBack(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-white/70">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Fetching weather data...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-red-400 flex items-center gap-2">
        <CloudSun className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }
  
  if (!weather) {
    return null;
  }

  const defaultUnit = getDefaultUnit(weather.country);
  const temperature = defaultUnit === 'C' ? weather.temperature : Math.round((weather.temperature * 9/5) + 32);
  const alternativeTemp = defaultUnit === 'C' ? Math.round((weather.temperature * 9/5) + 32) : weather.temperature;
  const localTimeString = weather.localTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="group flex items-center gap-1 text-white/70 hover:text-white transition-all duration-200"
          aria-label="Return to home"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="overflow-hidden w-0 group-hover:w-20 transition-all duration-200 whitespace-nowrap opacity-0 group-hover:opacity-100">
            Back home
          </span>
        </button>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-white/70" />
          <span className="text-white font-medium">{weather.location}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {icon}
        <div 
          className="relative text-white cursor-help min-w-[48px] text-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence mode="wait">
            {!showAlternative ? (
              <motion.div
                key="default"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 flex justify-center"
              >
                {temperature}°{defaultUnit}
              </motion.div>
            ) : (
              <motion.div
                key="alternative"
                initial={{ opacity: 0, scale: 1.1, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut" 
                }}
                onAnimationComplete={handleAnimationComplete}
                className="absolute inset-0 flex justify-center"
              >
                {alternativeTemp}°{defaultUnit === 'C' ? 'F' : 'C'}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="opacity-0">
            {temperature}°{defaultUnit}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-white/70">
        <Clock className="h-4 w-4" />
        <span className="text-sm">{localTimeString}</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;
