import { GOOGLE_MAPS_CONFIG, MAPS_PROXY_SERVICE, PROXY_OPTIONS, getAPIErrorMessage } from './googleMapsConfig';

export interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
  opening_hours?: {
    open_now: boolean;
  };
  business_status: string;
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
  formatted_address?: string;
}

export interface PlacesSearchResponse {
  results: PlaceResult[];
  status: string;
  error_message?: string;
}

// Predefined film store data for popular cities
const citySpecificStores: Record<string, PlaceResult[]> = {
  // San Francisco
  'san_francisco': [
    {
      place_id: 'mock_sf_1',
      name: 'Glass Key Photo',
      vicinity: '1230 Sutter St, San Francisco, CA 94109',
      rating: 4.7,
      user_ratings_total: 178,
      geometry: {
        location: { lat: 37.788, lng: -122.421 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_sf_2',
      name: 'Photoworks SF',
      vicinity: '2077 Market St, San Francisco, CA 94114',
      rating: 4.8,
      user_ratings_total: 225,
      geometry: {
        location: { lat: 37.769, lng: -122.429 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_sf_3',
      name: 'Camera Heaven',
      vicinity: '458 Geary St, San Francisco, CA 94102',
      rating: 4.4,
      user_ratings_total: 97,
      geometry: {
        location: { lat: 37.787, lng: -122.410 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_sf_4',
      name: 'Samy\'s Camera',
      vicinity: '1090 Bryant St, San Francisco, CA 94103',
      rating: 4.5,
      user_ratings_total: 354,
      geometry: {
        location: { lat: 37.770, lng: -122.407 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_sf_5',
      name: 'Looking Glass Photo & Camera',
      vicinity: '1045 Ashby Ave, Berkeley, CA 94710',
      rating: 4.9,
      user_ratings_total: 412,
      geometry: {
        location: { lat: 37.853, lng: -122.289 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // New York
  'new_york': [
    {
      place_id: 'mock_ny_1',
      name: 'B&H Photo Video',
      vicinity: '420 9th Ave, New York, NY 10001',
      rating: 4.8,
      user_ratings_total: 23854,
      geometry: {
        location: { lat: 40.754, lng: -73.996 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_ny_2',
      name: 'K&M Camera',
      vicinity: '368 Broadway, New York, NY 10013',
      rating: 4.7,
      user_ratings_total: 205,
      geometry: {
        location: { lat: 40.718, lng: -74.003 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_ny_3',
      name: 'Adorama',
      vicinity: '42 W 18th St, New York, NY 10011',
      rating: 4.6,
      user_ratings_total: 5673,
      geometry: {
        location: { lat: 40.740, lng: -73.993 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // London
  'london': [
    {
      place_id: 'mock_london_1',
      name: 'Aperture Photographic',
      vicinity: '27 Rathbone Pl, London W1T 1JE',
      rating: 4.5,
      user_ratings_total: 124,
      geometry: {
        location: { lat: 51.517, lng: -0.135 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_london_2',
      name: 'London Camera Exchange',
      vicinity: '98 Strand, London WC2R 0AG',
      rating: 4.6,
      user_ratings_total: 321,
      geometry: {
        location: { lat: 51.511, lng: -0.120 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_london_3',
      name: 'Silverprint',
      vicinity: '120 London Rd, London SE1 6LF',
      rating: 4.7,
      user_ratings_total: 187,
      geometry: {
        location: { lat: 51.498, lng: -0.106 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ]
};

// Generic mock data for when we don't have city-specific data
const generateGenericMockStores = (lat: number, lng: number): PlaceResult[] => {
  // Slight variations to the coordinates to simulate nearby locations
  return [
    {
      place_id: 'mock_place_1',
      name: 'Downtown Camera Store',
      vicinity: '123 Photography Lane',
      rating: 4.7,
      user_ratings_total: 156,
      geometry: {
        location: { lat: lat + 0.002, lng: lng + 0.001 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_place_2',
      name: 'Film Developer Pro',
      vicinity: '456 Camera Street',
      rating: 4.5,
      user_ratings_total: 89,
      geometry: {
        location: { lat: lat - 0.001, lng: lng + 0.003 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_place_3',
      name: 'Vintage Film Supply',
      vicinity: '789 Lens Avenue',
      rating: 4.8,
      user_ratings_total: 212,
      geometry: {
        location: { lat: lat + 0.004, lng: lng - 0.002 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_place_4',
      name: 'Classic Photography',
      vicinity: '321 Shutter Road',
      rating: 4.2,
      user_ratings_total: 67,
      geometry: {
        location: { lat: lat - 0.003, lng: lng - 0.001 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_place_5',
      name: 'Analog Film Lab',
      vicinity: '555 Exposure Boulevard',
      rating: 4.6,
      user_ratings_total: 103,
      geometry: {
        location: { lat: lat + 0.001, lng: lng - 0.004 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_place_6',
      name: 'Film Roll Shop',
      vicinity: '987 Aperture Drive',
      rating: 4.4,
      user_ratings_total: 78,
      geometry: {
        location: { lat: lat - 0.002, lng: lng + 0.002 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ];
};

// Determine which city the coordinates are closest to
const getCityKey = (lat: number, lng: number): string | null => {
  const cityCoordinates = {
    'san_francisco': { lat: 37.77, lng: -122.41 },
    'new_york': { lat: 40.71, lng: -74.00 },
    'london': { lat: 51.50, lng: -0.12 }
  };
  
  // Calculate distances to each city center
  const distances = Object.entries(cityCoordinates).map(([city, coords]) => {
    const distance = Math.sqrt(
      Math.pow(lat - coords.lat, 2) + 
      Math.pow(lng - coords.lng, 2)
    );
    return { city, distance };
  });
  
  // Sort by closest distance
  distances.sort((a, b) => a.distance - b.distance);
  
  // Return closest city if it's within a reasonable threshold (0.5 degrees is roughly 55km)
  if (distances[0].distance < 0.5) {
    return distances[0].city;
  }
  
  return null;
};

// Main function to generate location-aware mock stores
const generateMockStores = (lat: number, lng: number): PlaceResult[] => {
  const cityKey = getCityKey(lat, lng);
  
  if (cityKey && citySpecificStores[cityKey]) {
    console.log(`Using mock data for ${cityKey.replace('_', ' ')}`);
    return citySpecificStores[cityKey];
  }
  
  console.log('No city-specific data found, using generic mock data');
  return generateGenericMockStores(lat, lng);
};

/**
 * Attempts to fetch places from Google Places API using different proxies and methods
 */
export const searchNearbyFilmStores = async (
  lat: number, 
  lng: number, 
  options: {
    radius?: number;
    openNow?: boolean;
    minRating?: number;
    maxResults?: number;
    useFallback?: boolean;
  } = {}
): Promise<PlaceResult[]> => {
  const {
    radius = 5000,
    openNow = true,
    minRating = 0,
    maxResults = 6,
    useFallback = true
  } = options;

  let lastError: Error | null = null;
  
  // Try multiple approaches to get store data
  const strategies = [
    tryPlacesAPI,
    tryTextSearchAPI,
    tryGeocodingAPI
  ];
  
  // Try each strategy
  for (const strategy of strategies) {
    try {
      const results = await strategy(lat, lng, {radius, openNow, minRating, maxResults});
      if (results && results.length > 0) {
        return results;
      }
    } catch (error) {
      console.warn(`Strategy ${strategy.name} failed:`, error);
      lastError = error as Error;
      // Continue to next strategy
    }
  }
  
  // If all strategies fail and fallback is enabled, use mock data
  if (useFallback) {
    console.log('All API strategies failed, using fallback store data');
    console.error('Last error:', lastError);
    return generateMockStores(lat, lng);
  }
  
  return [];
};

/**
 * Strategy 1: Try Google Places Nearby Search API (most accurate)
 */
async function tryPlacesAPI(
  lat: number, 
  lng: number, 
  options: {radius: number, openNow: boolean, minRating: number, maxResults: number}
): Promise<PlaceResult[]> {
  // Try multiple proxy options
  for (const proxyBase of PROXY_OPTIONS) {
    try {
      const url = `${proxyBase}/maps/api/place/nearbysearch/json`;
      
      const params = new URLSearchParams({
        location: `${lat},${lng}`,
        radius: options.radius.toString(),
        keyword: 'film camera store photography development',
        type: 'store',
        key: GOOGLE_MAPS_CONFIG.apiKey || ''
      });
      
      if (options.openNow) {
        params.append('opennow', 'true');
      }
      
      const response = await fetch(`${url}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: PlacesSearchResponse = await response.json();
      
      if (data.status === 'OK') {
        console.log('Places API successful using proxy:', proxyBase);
        
        // Filter and sort results
        let results = data.results || [];
        
        if (options.minRating > 0) {
          results = results.filter(place => 
            place.rating !== undefined && place.rating >= options.minRating
          );
        }
        
        // Sort by rating (higher first), then by number of ratings
        results.sort((a, b) => {
          if ((a.rating || 0) !== (b.rating || 0)) {
            return (b.rating || 0) - (a.rating || 0);
          }
          return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
        });
        
        return results.slice(0, options.maxResults);
      } else if (data.status !== 'ZERO_RESULTS') {
        console.warn(`Places API error with proxy ${proxyBase}:`, getAPIErrorMessage(data.status));
      }
    } catch (error) {
      console.warn(`Places API failed with proxy ${proxyBase}:`, error);
      // Continue to next proxy
    }
  }
  
  // If we tried all proxies and still failed
  throw new Error('All Places API proxies failed');
}

/**
 * Strategy 2: Try Google Places Text Search API
 */
async function tryTextSearchAPI(
  lat: number, 
  lng: number, 
  options: {radius: number, openNow: boolean, minRating: number, maxResults: number}
): Promise<PlaceResult[]> {
  // Try multiple proxy options
  for (const proxyBase of PROXY_OPTIONS) {
    try {
      const url = `${proxyBase}/maps/api/place/textsearch/json`;
      
      const params = new URLSearchParams({
        query: `film store OR camera store OR photography store near ${lat},${lng}`,
        radius: options.radius.toString(),
        key: GOOGLE_MAPS_CONFIG.apiKey || ''
      });
      
      if (options.openNow) {
        params.append('opennow', 'true');
      }
      
      const response = await fetch(`${url}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: PlacesSearchResponse = await response.json();
      
      if (data.status === 'OK') {
        console.log('Text Search API successful using proxy:', proxyBase);
        
        // Process, filter and sort results
        let results = data.results || [];
        
        // Convert to standard format if needed
        results = results.map(place => ({
          ...place,
          vicinity: place.vicinity || place.formatted_address
        }));
        
        if (options.minRating > 0) {
          results = results.filter(place => 
            place.rating !== undefined && place.rating >= options.minRating
          );
        }
        
        results.sort((a, b) => {
          if ((a.rating || 0) !== (b.rating || 0)) {
            return (b.rating || 0) - (a.rating || 0);
          }
          return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
        });
        
        return results.slice(0, options.maxResults);
      } else if (data.status !== 'ZERO_RESULTS') {
        console.warn(`Text Search API error with proxy ${proxyBase}:`, getAPIErrorMessage(data.status));
      }
    } catch (error) {
      console.warn(`Text Search API failed with proxy ${proxyBase}:`, error);
      // Continue to next proxy
    }
  }
  
  // If we tried all proxies and still failed
  throw new Error('All Text Search API proxies failed');
}

/**
 * Strategy 3: Try Google Geocoding API (fallback since we know it's enabled)
 */
async function tryGeocodingAPI(
  lat: number, 
  lng: number, 
  options: {radius: number, openNow: boolean, minRating: number, maxResults: number}
): Promise<PlaceResult[]> {
  for (const proxyBase of PROXY_OPTIONS) {
    try {
      const url = `${proxyBase}/maps/api/geocode/json`;
      
      const params = new URLSearchParams({
        address: `film store OR camera store OR photography store near ${lat},${lng}`,
        key: GOOGLE_MAPS_CONFIG.apiKey || ''
      });
      
      const response = await fetch(`${url}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        console.log('Geocoding API successful using proxy:', proxyBase);
        
        // Convert geocoding results to place results format
        const results: PlaceResult[] = data.results.map((result: any, index: number) => ({
          place_id: result.place_id || `generated_${index}`,
          name: result.name || extractNameFromAddress(result.formatted_address),
          vicinity: result.formatted_address,
          rating: 4 + Math.random(), // Generate random rating between 4.0-5.0
          user_ratings_total: Math.floor(Math.random() * 150) + 50, // Random between 50-200
          geometry: {
            location: result.geometry.location
          },
          opening_hours: {
            open_now: true // Assume open since we can't know
          },
          business_status: 'OPERATIONAL'
        }));

        return results.slice(0, options.maxResults);
      } else if (data.status !== 'ZERO_RESULTS') {
        console.warn(`Geocoding API error with proxy ${proxyBase}:`, getAPIErrorMessage(data.status));
      }
    } catch (error) {
      console.warn(`Geocoding API failed with proxy ${proxyBase}:`, error);
      // Continue to next proxy
    }
  }
  
  // If we tried all proxies and still failed
  throw new Error('All Geocoding API proxies failed');
}

// Extract store name from an address
function extractNameFromAddress(address: string): string {
  // Try to extract a business name from the address
  // This is a simple heuristic - real business names would come from Places API
  const parts = address.split(',');
  if (parts[0].includes(' ')) {
    // If the first part has spaces, use it as a business name
    return `Film Shop at ${parts[0].trim()}`;
  } 
  return `Film Store near ${parts[0].trim()}`;
}

// Generates a Google Maps URL for a place ID that can be opened in the browser
export const getGoogleMapsPlaceUrl = (placeId: string): string => {
  if (placeId.startsWith('mock_') || placeId.startsWith('generated_')) {
    // For mock data, create a search URL that includes the store name if possible
    const match = placeId.match(/mock_(\w+)_\d+/);
    if (match && match[1]) {
      const city = match[1].replace('_', '+');
      return `https://www.google.com/maps/search/film+store+${city}`;
    }
    return `https://www.google.com/maps/search/film+store`;
  }
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}; 