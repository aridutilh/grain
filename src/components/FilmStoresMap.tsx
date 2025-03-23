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
}

export const FilmStoresMap = ({ stores, isLoading }: FilmStoresListProps) => {
  const [dataSource, setDataSource] = useState<'real' | 'city' | 'generic'>('real');
  
  useEffect(() => {
    // Check data source based on store IDs
    if (stores.length > 0) {
      if (stores[0].id.startsWith('mock_place_')) {
        setDataSource('generic');
      } else if (stores[0].id.startsWith('mock_') || stores[0].id.startsWith('generated_')) {
        setDataSource('city');
      } else {
        setDataSource('real');
      }
    }
  }, [stores]);

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
          No film shops nearby, try purchasing online on{' '}
          <a
            href="https://www.amazon.com/s?k=film+camera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Amazon
          </a>{' '}
          or{' '}
          <a
            href="https://www.lomography.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Lomography
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
          <p>
            {dataSource === 'city' 
              ? 'Showing popular film stores in this city (sample data)'
              : 'Showing sample stores - these may not be real locations near you'}
          </p>
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
                {store.openNow && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    Open Now
                  </span>
                )}
              </div>
              <p className="text-sm text-white/70 mt-1">{store.address}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-blue-400">
                    {dataSource !== 'real' 
                      ? (dataSource === 'city' ? 'View area on Google Maps' : 'Search on Google Maps') 
                      : 'View on Google Maps'}
                  </span>
                </div>
              </div>
            </div>
            
            {store.rating > 0 && (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white/90 font-medium">{store.rating.toFixed(1)}</span>
                </div>
                {store.userRatingsTotal > 0 && (
                  <span className="text-xs text-white/50">
                    ({store.userRatingsTotal})
                  </span>
                )}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}; 