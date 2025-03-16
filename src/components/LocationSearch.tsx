import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Loader2, MapPin } from 'lucide-react';
import { searchCities } from '@/utils/cityService';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, CommandInput, CommandList } from "@/components/ui/command";

interface LocationSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

interface City {
  name: string;
  state?: string;
  country: string;
}

export default function LocationSearch({ onSearch, isLoading }: LocationSearchProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.length >= 2) {
      setSearchLoading(true);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(async () => {
        try {
          const results = await searchCities(value);
          setCities(results);
        } catch (error) {
          console.error('Error searching cities:', error);
          setCities([]);
        } finally {
          setSearchLoading(false);
        }
      }, 300);
    } else {
      setCities([]);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [value]);

  const handleSelect = (city: City) => {
    const locationString = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`;
    setValue(locationString);
    setOpen(false);
    onSearch(locationString);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full max-w-md"
      initial={false}
      animate={open ? { 
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
      } : { 
        scale: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <div className="relative flex items-center rounded-lg border border-white/20 bg-black/40 backdrop-blur-xl">
          <MapPin className="absolute left-3 h-4 w-4 text-white/70" />
          <Input
            placeholder="Search for a city..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setOpen(true)}
            className="pl-9 pr-8 py-6 bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            data-lpignore="true"
          />
          {(isLoading || searchLoading) && (
            <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-white/70" />
          )}
        </div>

        <AnimatePresence>
          {open && (value.length >= 2 || cities.length > 0) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-white/20 bg-black/40 backdrop-blur-xl shadow-lg"
            >
              <div className="max-h-[300px] overflow-y-auto py-1">
                {searchLoading ? (
                  <div className="px-3 py-6 text-center text-sm text-white/50">
                    Searching cities...
                  </div>
                ) : cities.length === 0 ? (
                  <div className="px-3 py-6 text-center text-sm text-white/50">
                    No cities found
                  </div>
                ) : (
                  cities.map((city) => (
                    <button
                      key={`${city.name}-${city.state || ''}-${city.country}`}
                      onClick={() => handleSelect(city)}
                      className="flex w-full items-center px-3 py-2 text-left hover:bg-white/10 text-white/90"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-white/70 mr-2" />
                      <span>{city.name}</span>
                      {city.state && <span className="text-white/50">, {city.state}</span>}
                      <span className="text-white/50">, {city.country}</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 