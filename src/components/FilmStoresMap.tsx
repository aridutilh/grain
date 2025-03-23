import { useEffect, useState } from 'react';
import { MapPin, Clock, ExternalLink, Star, Info } from 'lucide-react';

interface FilmStore {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating?: number;
  userRatingsTotal?: number;
  lat: number;
  lng: number;
  openNow: boolean;
  placeUrl: string;
}

interface FilmStoresListProps {
  stores: FilmStore[];
  isLoading: boolean;
  searchLocation?: string;
}

export const FilmStoresMap = ({ stores, isLoading, searchLocation }: FilmStoresListProps) => {
  const [dataSource, setDataSource] = useState<'real' | 'city' | 'generic'>('real');
  const [locationName, setLocationName] = useState<string>('');
  
  useEffect(() => {
    if (searchLocation) {
      const parts = searchLocation.split(',');
      const cityName = parts.length > 1 ? parts[0].trim() : searchLocation.trim();
      setLocationName(cityName);
    }
  }, [searchLocation]);
  
  useEffect(() => {
    if (stores.length > 0) {
      if (stores[0].id.startsWith('mock_place_') || stores[0].id.startsWith('mock_online_')) {
        setDataSource('generic');
      } else if (stores[0].id.startsWith('mock_') || stores[0].id.startsWith('generated_')) {
        setDataSource('city');
      } else {
        setDataSource('real');
      }
      
      if (!searchLocation) {
        try {
          let extractedLocation = '';
          
          for (const store of stores) {
            if (!store.address) continue;
            
            const locationMatch = store.address.match(/Location:\s+([^)]+)/);
            if (locationMatch && locationMatch[1]) {
              extractedLocation = locationMatch[1].trim();
              break;
            }
            
            if (store.address.includes('near ')) {
              const nearIndex = store.address.indexOf('near ');
              if (nearIndex !== -1) {
                extractedLocation = store.address.substring(nearIndex + 5).trim();
                break;
              }
            }
          }
          
          if (extractedLocation) {
            setLocationName(extractedLocation);
          }
          else if (stores[0].address) {
            const addressParts = stores[0].address.split(',');
            if (addressParts.length > 1) {
              const cityCandidate = addressParts[addressParts.length - 2].trim();
              setLocationName(cityCandidate);
            } else if (addressParts.length === 1) {
              setLocationName(addressParts[0].trim());
            }
          }
        } catch (error) {
          console.warn('Error extracting location name', error);
        }
      }
    }
  }, [stores, searchLocation]);

  if (isLoading) {
    return (
      <div className="text-center py-4 text-white/70">
        Finding nearby film stores...
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <p className="text-center text-white/90">
          No local film shops found in this area. Try purchasing film online from:{' '}
          <a
            href="https://shop.lomography.com/en/films"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Lomography
          </a>,{' '}
          <a
            href="https://www.bhphotovideo.com/c/buy/Film/ci/9954/N/4093113320"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            B&H Photo
          </a>{' '}
          or{' '}
          <a
            href="https://www.amazon.com/s?k=35mm+film"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Amazon
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {dataSource !== 'real' && (
        <div className={`flex items-center gap-2 p-2 rounded-md mb-3 text-sm ${
          dataSource === 'city' 
            ? 'bg-blue-500/20 text-blue-200' 
            : 'bg-amber-500/20 text-amber-200'
        }`}>
          <Info className="h-4 w-4 shrink-0" />
          {dataSource === 'city' ? (
            <p>Showing popular film stores in this city</p>
          ) : (
            <p>
              We don't have recommended stores for your location, but they might exist! Check{' '}
              <a 
                href={`https://www.google.com/maps/search/film+store+${encodeURIComponent(locationName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                here
              </a>{' '}
              or shop online below.
            </p>
          )}
        </div>
      )}
      
      {stores.map((store) => (
        <a
          key={store.id}
          href={store.placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/15 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-white/90">{store.name}</h4>
              </div>
              <p className="text-sm text-white/70 mt-1">{store.address}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-blue-400">
                    {store.id.startsWith('mock_online_') 
                      ? 'Shop online' 
                      : dataSource !== 'real' 
                        ? 'Find on Google Maps' 
                        : 'View on Google Maps'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}; 