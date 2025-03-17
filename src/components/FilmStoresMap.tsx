import { useEffect, useState } from 'react';

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

interface FilmStoresListProps {
  stores: FilmStore[];
  isLoading: boolean;
}

export const FilmStoresMap = ({ stores, isLoading }: FilmStoresListProps) => {
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
      {stores.map((store) => (
        <a
          key={store.id}
          href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/15 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-white/90">{store.name}</h4>
              <p className="text-sm text-white/70">{store.address}</p>
              {store.distance > 0 && (
                <p className="text-sm text-white/50 mt-1">
                  {Math.round(store.distance)} meters away
                </p>
              )}
            </div>
            {store.rating > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-white/90">{store.rating.toFixed(1)}</span>
                {store.userRatingsTotal > 0 && (
                  <span className="text-sm text-white/50">
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