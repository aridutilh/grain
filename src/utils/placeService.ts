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
  ],
  // Tokyo
  'tokyo': [
    {
      place_id: 'mock_tokyo_1',
      name: 'Yodobashi Camera',
      vicinity: '1 Chome-1 Yoyogi, Shibuya City, Tokyo',
      rating: 4.6,
      user_ratings_total: 12540,
      geometry: {
        location: { lat: 35.684, lng: 139.702 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_tokyo_2',
      name: 'Map Camera',
      vicinity: '1 Chome-12-5 Nishishinjuku, Shinjuku City, Tokyo',
      rating: 4.7,
      user_ratings_total: 1876,
      geometry: {
        location: { lat: 35.693, lng: 139.699 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_tokyo_3',
      name: 'Lemon Camera',
      vicinity: '1 Chome-15-8 Ginza, Chuo City, Tokyo',
      rating: 4.5,
      user_ratings_total: 987,
      geometry: {
        location: { lat: 35.670, lng: 139.763 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_tokyo_4',
      name: 'Kitamura Camera',
      vicinity: '3 Chome-26-11 Shinjuku, Shinjuku City, Tokyo',
      rating: 4.3,
      user_ratings_total: 742,
      geometry: {
        location: { lat: 35.690, lng: 139.707 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Paris
  'paris': [
    {
      place_id: 'mock_paris_1',
      name: 'Nation Photo',
      vicinity: '27 Bd Voltaire, 75011 Paris',
      rating: 4.6,
      user_ratings_total: 824,
      geometry: {
        location: { lat: 48.852, lng: 2.380 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_paris_2',
      name: 'Le Petit Format',
      vicinity: '48 Rue Sainte-Croix de la Bretonnerie, 75004 Paris',
      rating: 4.8,
      user_ratings_total: 213,
      geometry: {
        location: { lat: 48.857, lng: 2.356 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_paris_3',
      name: 'Prophot',
      vicinity: '18 Rue de la Perle, 75003 Paris',
      rating: 4.5,
      user_ratings_total: 493,
      geometry: {
        location: { lat: 48.861, lng: 2.362 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Berlin
  'berlin': [
    {
      place_id: 'mock_berlin_1',
      name: 'Fotoimpex',
      vicinity: 'Alte Schönhauser Str. 32b, 10119 Berlin',
      rating: 4.8,
      user_ratings_total: 532,
      geometry: {
        location: { lat: 52.527, lng: 13.408 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_berlin_2',
      name: 'Calumet Photographic',
      vicinity: 'Bessemerstraße 82, 10. OG, 12103 Berlin',
      rating: 4.4,
      user_ratings_total: 418,
      geometry: {
        location: { lat: 52.467, lng: 13.385 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_berlin_3',
      name: 'Foto Meyer',
      vicinity: 'Welserstraße 1, 10777 Berlin',
      rating: 4.6,
      user_ratings_total: 324,
      geometry: {
        location: { lat: 52.498, lng: 13.341 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Sydney
  'sydney': [
    {
      place_id: 'mock_sydney_1',
      name: 'Rewind Photo Lab',
      vicinity: '60 Oxford St, Darlinghurst NSW 2010',
      rating: 4.9,
      user_ratings_total: 214,
      geometry: {
        location: { lat: -33.876, lng: 151.216 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_sydney_2',
      name: 'Paxtons Camera',
      vicinity: '28 Elizabeth St, Sydney NSW 2000',
      rating: 4.5,
      user_ratings_total: 378,
      geometry: {
        location: { lat: -33.868, lng: 151.207 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_sydney_3',
      name: 'Hillvale Photo',
      vicinity: '16-30 Vine St, Redfern NSW 2016',
      rating: 4.7,
      user_ratings_total: 156,
      geometry: {
        location: { lat: -33.892, lng: 151.204 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Toronto
  'toronto': [
    {
      place_id: 'mock_toronto_1',
      name: 'Downtown Camera',
      vicinity: '460 King St E, Toronto, ON M5A 1L7',
      rating: 4.7,
      user_ratings_total: 842,
      geometry: {
        location: { lat: 43.653, lng: -79.367 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_toronto_2',
      name: 'Aden Camera',
      vicinity: '2985 Bloor St W, Etobicoke, ON M8X 1C1',
      rating: 4.6,
      user_ratings_total: 475,
      geometry: {
        location: { lat: 43.647, lng: -79.508 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_toronto_3',
      name: 'Henry\'s',
      vicinity: '185 Church St, Toronto, ON M5B 1Y7',
      rating: 4.5,
      user_ratings_total: 523,
      geometry: {
        location: { lat: 43.654, lng: -79.378 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Mexico City
  'mexico_city': [
    {
      place_id: 'mock_mexico_1',
      name: 'Foto Regis',
      vicinity: 'Av. Juárez 56, Centro Histórico, Mexico City',
      rating: 4.6,
      user_ratings_total: 423,
      geometry: {
        location: { lat: 19.433, lng: -99.143 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_mexico_2',
      name: 'Lumen',
      vicinity: 'Plaza Rio de Janeiro 54, Roma Norte, Mexico City',
      rating: 4.7,
      user_ratings_total: 217,
      geometry: {
        location: { lat: 19.417, lng: -99.159 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_mexico_3',
      name: 'Fotomecanica',
      vicinity: 'Dr. Atl 182, Santa María la Ribera, Mexico City',
      rating: 4.5,
      user_ratings_total: 187,
      geometry: {
        location: { lat: 19.451, lng: -99.157 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Amsterdam
  'amsterdam': [
    {
      place_id: 'mock_amsterdam_1',
      name: 'Foto Analogique',
      vicinity: 'Vijzelstraat 115, 1017 HJ Amsterdam',
      rating: 4.8,
      user_ratings_total: 342,
      geometry: {
        location: { lat: 52.366, lng: 4.891 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_amsterdam_2',
      name: 'Kiekie',
      vicinity: 'Utrechtsestraat 37, 1017 VH Amsterdam',
      rating: 4.7,
      user_ratings_total: 218,
      geometry: {
        location: { lat: 52.363, lng: 4.897 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_amsterdam_3',
      name: 'HALBE Frames & Fotocadeau',
      vicinity: 'Cruquiusweg 111D, 1019 AG Amsterdam',
      rating: 4.6,
      user_ratings_total: 187,
      geometry: {
        location: { lat: 52.371, lng: 4.933 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Los Angeles
  'los_angeles': [
    {
      place_id: 'mock_la_1',
      name: 'Freestyle Photo & Imaging Supplies',
      vicinity: '5124 Sunset Blvd, Los Angeles, CA 90027',
      rating: 4.7,
      user_ratings_total: 854,
      geometry: {
        location: { lat: 34.098, lng: -118.300 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_la_2',
      name: 'Samy\'s Camera',
      vicinity: '431 S Fairfax Ave, Los Angeles, CA 90036',
      rating: 4.6,
      user_ratings_total: 1320,
      geometry: {
        location: { lat: 34.067, lng: -118.361 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_la_3',
      name: 'FilmFoto LA',
      vicinity: '525 N Fairfax Ave, Los Angeles, CA 90036',
      rating: 4.8,
      user_ratings_total: 386,
      geometry: {
        location: { lat: 34.081, lng: -118.361 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_la_4',
      name: 'The Darkroom Lab',
      vicinity: '5370 Wilshire Blvd, Los Angeles, CA 90036',
      rating: 4.9,
      user_ratings_total: 432,
      geometry: {
        location: { lat: 34.062, lng: -118.346 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Chicago
  'chicago': [
    {
      place_id: 'mock_chicago_1',
      name: 'Central Camera Company',
      vicinity: '230 S Wabash Ave, Chicago, IL 60604',
      rating: 4.8,
      user_ratings_total: 756,
      geometry: {
        location: { lat: 41.879, lng: -87.626 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_chicago_2',
      name: 'Chicago Film Society',
      vicinity: '1345 W Argyle St, Chicago, IL 60640',
      rating: 4.7,
      user_ratings_total: 325,
      geometry: {
        location: { lat: 41.973, lng: -87.662 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_chicago_3',
      name: 'Dodd Camera',
      vicinity: '71 E Madison St, Chicago, IL 60602',
      rating: 4.6,
      user_ratings_total: 218,
      geometry: {
        location: { lat: 41.882, lng: -87.625 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Munich
  'munich': [
    {
      place_id: 'mock_munich_1',
      name: 'Foto Gregor',
      vicinity: 'Schützenstraße 8, 80335 München',
      rating: 4.6,
      user_ratings_total: 721,
      geometry: {
        location: { lat: 48.139, lng: 11.564 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_munich_2',
      name: 'Foto Sauter',
      vicinity: 'Sonnenstraße 26, 80331 München',
      rating: 4.7,
      user_ratings_total: 863,
      geometry: {
        location: { lat: 48.137, lng: 11.566 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_munich_3',
      name: 'Lomography Embassy Store Munich',
      vicinity: 'Schellingstraße, 80799 München',
      rating: 4.8,
      user_ratings_total: 347,
      geometry: {
        location: { lat: 48.152, lng: 11.576 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Hamburg
  'hamburg': [
    {
      place_id: 'mock_hamburg_1',
      name: 'Foto Wannack',
      vicinity: 'Grindelallee 91, 20146 Hamburg',
      rating: 4.7,
      user_ratings_total: 574,
      geometry: {
        location: { lat: 53.568, lng: 9.984 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_hamburg_2',
      name: 'Photohaus Möller',
      vicinity: 'Osterstraße 125, 20255 Hamburg',
      rating: 4.6,
      user_ratings_total: 486,
      geometry: {
        location: { lat: 53.578, lng: 9.956 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_hamburg_3',
      name: 'Meister Camera',
      vicinity: 'Große Theaterstraße 42, 20354 Hamburg',
      rating: 4.8,
      user_ratings_total: 329,
      geometry: {
        location: { lat: 53.556, lng: 9.989 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Manchester
  'manchester': [
    {
      place_id: 'mock_manchester_1',
      name: 'Dale Photographic',
      vicinity: '11-13 Dale St, Manchester M1 1JA',
      rating: 4.7,
      user_ratings_total: 412,
      geometry: {
        location: { lat: 53.483, lng: -2.236 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_manchester_2',
      name: 'PARALLAX Photographic',
      vicinity: '4 Stephenson Square, Manchester M1 1DN',
      rating: 4.8,
      user_ratings_total: 285,
      geometry: {
        location: { lat: 53.481, lng: -2.235 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_manchester_3',
      name: 'Wilkinson Cameras',
      vicinity: '17 Cross St, Manchester M2 1WE',
      rating: 4.6,
      user_ratings_total: 347,
      geometry: {
        location: { lat: 53.482, lng: -2.245 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Osaka
  'osaka': [
    {
      place_id: 'mock_osaka_1',
      name: 'Kimura Camera',
      vicinity: '1 Chome-2-13 Umeda, Kita Ward, Osaka',
      rating: 4.6,
      user_ratings_total: 783,
      geometry: {
        location: { lat: 34.702, lng: 135.498 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_osaka_2',
      name: 'Yodobashi Camera Osaka',
      vicinity: '1 Chome-1 Umeda, Kita Ward, Osaka',
      rating: 4.5,
      user_ratings_total: 8423,
      geometry: {
        location: { lat: 34.703, lng: 135.497 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_osaka_3',
      name: 'BIC Camera',
      vicinity: '1 Chome-1-10 Nishishinsaibashi, Chuo Ward, Osaka',
      rating: 4.4,
      user_ratings_total: 6257,
      geometry: {
        location: { lat: 34.672, lng: 135.500 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_osaka_4',
      name: 'Film Camera Vintage Osaka',
      vicinity: '2 Chome-8-12 Shinsaibashisuji, Chuo Ward, Osaka',
      rating: 4.8,
      user_ratings_total: 387,
      geometry: {
        location: { lat: 34.673, lng: 135.503 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Kyoto
  'kyoto': [
    {
      place_id: 'mock_kyoto_1',
      name: 'Film Camera Kyoto',
      vicinity: '570 Higashiyama, Gionmachi, Higashiyama Ward, Kyoto',
      rating: 4.9,
      user_ratings_total: 324,
      geometry: {
        location: { lat: 35.003, lng: 135.778 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_kyoto_2',
      name: 'Yodobashi Camera Kyoto',
      vicinity: 'Higashishiokoji Takakuracho, Shimogyo Ward, Kyoto',
      rating: 4.5,
      user_ratings_total: 4568,
      geometry: {
        location: { lat: 34.985, lng: 135.759 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_kyoto_3',
      name: 'Kyotographie Film Lab',
      vicinity: '352 Kamishichiken Minamigawa, Kamigyo Ward, Kyoto',
      rating: 4.7,
      user_ratings_total: 186,
      geometry: {
        location: { lat: 35.028, lng: 135.748 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Vancouver
  'vancouver': [
    {
      place_id: 'mock_vancouver_1',
      name: 'Beau Photo Supplies',
      vicinity: '1520 W 6th Ave, Vancouver, BC V6J 1R2',
      rating: 4.8,
      user_ratings_total: 432,
      geometry: {
        location: { lat: 49.266, lng: -123.138 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_vancouver_2',
      name: 'The Lab Vancouver',
      vicinity: '930 W 1st St, North Vancouver, BC V7P 1A2',
      rating: 4.7,
      user_ratings_total: 287,
      geometry: {
        location: { lat: 49.320, lng: -123.115 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_vancouver_3',
      name: 'Kerrisdale Cameras',
      vicinity: '2170 W 41st Ave, Vancouver, BC V6M 1Z1',
      rating: 4.6,
      user_ratings_total: 356,
      geometry: {
        location: { lat: 49.234, lng: -123.155 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Montreal
  'montreal': [
    {
      place_id: 'mock_montreal_1',
      name: 'Photo Service',
      vicinity: '60 Av. du Mont-Royal O, Montréal, QC H2T 2S6',
      rating: 4.7,
      user_ratings_total: 462,
      geometry: {
        location: { lat: 45.518, lng: -73.583 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_montreal_2',
      name: 'Lozeau',
      vicinity: '6229 St-Hubert, Montréal, QC H2S 2L9',
      rating: 4.6,
      user_ratings_total: 873,
      geometry: {
        location: { lat: 45.540, lng: -73.605 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_montreal_3',
      name: 'Camtec Photo',
      vicinity: '3292 Bd St-Laurent, Montréal, QC H2X 2Y3',
      rating: 4.8,
      user_ratings_total: 219,
      geometry: {
        location: { lat: 45.512, lng: -73.571 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Melbourne
  'melbourne': [
    {
      place_id: 'mock_melbourne_1',
      name: 'Michaels Camera Video Digital',
      vicinity: '263-269 Elizabeth St, Melbourne VIC 3000',
      rating: 4.7,
      user_ratings_total: 1352,
      geometry: {
        location: { lat: -37.812, lng: 144.962 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_melbourne_2',
      name: 'FilmNeverDie',
      vicinity: '2A/288 Brunswick St, Fitzroy VIC 3065',
      rating: 4.9,
      user_ratings_total: 378,
      geometry: {
        location: { lat: -37.798, lng: 144.978 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_melbourne_3',
      name: 'Hillvale Photo',
      vicinity: '15-17 Easey St, Collingwood VIC 3066',
      rating: 4.8,
      user_ratings_total: 256,
      geometry: {
        location: { lat: -37.802, lng: 144.986 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_melbourne_4',
      name: 'DigiDirect Melbourne',
      vicinity: '460 Bourke St, Melbourne VIC 3000',
      rating: 4.5,
      user_ratings_total: 843,
      geometry: {
        location: { lat: -37.814, lng: 144.958 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Boston
  'boston': [
    {
      place_id: 'mock_boston_1',
      name: 'Hunt\'s Photo & Video',
      vicinity: '100 Main St, Melrose, MA 02176',
      rating: 4.7,
      user_ratings_total: 732,
      geometry: {
        location: { lat: 42.456, lng: -71.066 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_boston_2',
      name: 'Bromfield Camera',
      vicinity: '10 Bromfield St, Boston, MA 02108',
      rating: 4.6,
      user_ratings_total: 418,
      geometry: {
        location: { lat: 42.357, lng: -71.060 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_boston_3',
      name: 'ColorTek of Boston',
      vicinity: '235 Walnut St, Brookline, MA 02445',
      rating: 4.8,
      user_ratings_total: 276,
      geometry: {
        location: { lat: 42.331, lng: -71.121 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Edinburgh
  'edinburgh': [
    {
      place_id: 'mock_edinburgh_1',
      name: 'Ffordes Photographic',
      vicinity: '24 Haddington Pl, Edinburgh EH7 4AF',
      rating: 4.8,
      user_ratings_total: 328,
      geometry: {
        location: { lat: 55.960, lng: -3.179 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_edinburgh_2',
      name: 'Jessops Edinburgh',
      vicinity: '36 Shandwick Pl, Edinburgh EH2 4RT',
      rating: 4.5,
      user_ratings_total: 387,
      geometry: {
        location: { lat: 55.950, lng: -3.209 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_edinburgh_3',
      name: 'Camera Base Edinburgh',
      vicinity: '27 Bruntsfield Pl, Edinburgh EH10 4HJ',
      rating: 4.7,
      user_ratings_total: 213,
      geometry: {
        location: { lat: 55.938, lng: -3.204 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Fukuoka
  'fukuoka': [
    {
      place_id: 'mock_fukuoka_1',
      name: 'Camera no Kitamura',
      vicinity: '2-1-1 Tenjin, Chuo Ward, Fukuoka',
      rating: 4.5,
      user_ratings_total: 687,
      geometry: {
        location: { lat: 33.590, lng: 130.399 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_fukuoka_2',
      name: 'Map Camera Fukuoka',
      vicinity: '3-10-18 Haruyoshi, Chuo Ward, Fukuoka',
      rating: 4.7,
      user_ratings_total: 342,
      geometry: {
        location: { lat: 33.585, lng: 130.393 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_fukuoka_3',
      name: 'Yodobashi Camera Hakata',
      vicinity: '1-5 Hakataekichūōgai, Hakata Ward, Fukuoka',
      rating: 4.4,
      user_ratings_total: 5218,
      geometry: {
        location: { lat: 33.590, lng: 130.420 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Stockholm
  'stockholm': [
    {
      place_id: 'mock_stockholm_1',
      name: 'Brunos Bildverkstad',
      vicinity: 'Götgatan 31, 116 21 Stockholm',
      rating: 4.8,
      user_ratings_total: 389,
      geometry: {
        location: { lat: 59.318, lng: 18.072 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_stockholm_2',
      name: 'Crimson Stockholm',
      vicinity: 'Skeppargatan 28, 114 52 Stockholm',
      rating: 4.7,
      user_ratings_total: 267,
      geometry: {
        location: { lat: 59.335, lng: 18.088 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_stockholm_3',
      name: 'Fotografiska',
      vicinity: 'Stadsgårdshamnen 22, 116 45 Stockholm',
      rating: 4.9,
      user_ratings_total: 1354,
      geometry: {
        location: { lat: 59.318, lng: 18.085 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ],
  // Zurich
  'zurich': [
    {
      place_id: 'mock_zurich_1',
      name: 'Digital Kamera Service',
      vicinity: 'Badenerstrasse 281, 8003 Zürich',
      rating: 4.7,
      user_ratings_total: 542,
      geometry: {
        location: { lat: 47.374, lng: 8.515 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_zurich_2',
      name: 'Foto Video Zumstein',
      vicinity: 'Rennweg 26, 8001 Zürich',
      rating: 4.6,
      user_ratings_total: 682,
      geometry: {
        location: { lat: 47.373, lng: 8.539 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_zurich_3',
      name: 'Light + Byte AG',
      vicinity: 'Förrlibuckstrasse 66, 8005 Zürich',
      rating: 4.8,
      user_ratings_total: 329,
      geometry: {
        location: { lat: 47.383, lng: 8.519 }
      },
      opening_hours: { open_now: true },
      business_status: 'OPERATIONAL'
    }
  ]
};

// Helper to generate generic mock stores for locations without specific data
const generateGenericMockStores = (lat: number, lng: number): PlaceResult[] => {
  return [
    {
      place_id: 'mock_online_1',
      name: 'Shop Online: Lomography',
      vicinity: 'lomography.com',
      rating: 4.9,
      user_ratings_total: 1827,
      geometry: {
        location: { lat: lat, lng: lng }
      },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_online_2',
      name: 'Shop Online: Amazon Film Photography',
      vicinity: 'amazon.com',
      rating: 4.6,
      user_ratings_total: 5289,
      geometry: {
        location: { lat: lat, lng: lng }
      },
      business_status: 'OPERATIONAL'
    },
    {
      place_id: 'mock_online_3',
      name: 'Shop Online: B&H Photo',
      vicinity: 'bhphotovideo.com',
      rating: 4.7,
      user_ratings_total: 12112,
      geometry: {
        location: { lat: lat, lng: lng }
      },
      business_status: 'OPERATIONAL'
    }
  ];
};

// Determine which city the coordinates are closest to
const getCityKey = (lat: number, lng: number): string | null => {
  const cityCoordinates = {
    'san_francisco': { lat: 37.77, lng: -122.41 },
    'new_york': { lat: 40.71, lng: -74.00 },
    'london': { lat: 51.50, lng: -0.12 },
    'tokyo': { lat: 35.68, lng: 139.76 },
    'paris': { lat: 48.85, lng: 2.35 },
    'berlin': { lat: 52.52, lng: 13.40 },
    'sydney': { lat: -33.87, lng: 151.21 },
    'toronto': { lat: 43.65, lng: -79.38 },
    'mexico_city': { lat: 19.43, lng: -99.13 },
    'amsterdam': { lat: 52.37, lng: 4.89 },
    'los_angeles': { lat: 34.05, lng: -118.24 },
    'chicago': { lat: 41.88, lng: -87.63 },
    'munich': { lat: 48.14, lng: 11.58 },
    'hamburg': { lat: 53.55, lng: 9.99 },
    'manchester': { lat: 53.48, lng: -2.24 },
    'osaka': { lat: 34.69, lng: 135.50 },
    'kyoto': { lat: 35.01, lng: 135.76 },
    'vancouver': { lat: 49.28, lng: -123.12 },
    'montreal': { lat: 45.50, lng: -73.57 },
    'melbourne': { lat: -37.81, lng: 144.96 },
    'boston': { lat: 42.46, lng: -71.05 },
    'edinburgh': { lat: 55.95, lng: -3.19 },
    'fukuoka': { lat: 33.59, lng: 130.40 },
    'stockholm': { lat: 59.33, lng: 18.07 },
    'zurich': { lat: 47.37, lng: 8.54 }
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

// Update the getGoogleMapsPlaceUrl function to handle online stores
export const getGoogleMapsPlaceUrl = (placeId: string): string => {
  if (placeId === 'mock_online_1') {
    return 'https://shop.lomography.com/';
  } else if (placeId === 'mock_online_2') {
    return 'https://www.amazon.com/s?k=film+photography';
  } else if (placeId === 'mock_online_3') {
    return 'https://www.bhphotovideo.com/c/browse/Film-Darkroom/ci/987/N/4294551076';
  } else if (placeId.startsWith('mock_')) {
    // For mock city data, create a more accurate search URL
    const storeName = extractStoreNameFromPlaceId(placeId);
    const cityName = extractCityFromPlaceId(placeId);
    
    if (storeName && cityName) {
      // Encode the store name and city for the URL
      const encodedSearch = encodeURIComponent(`${storeName} ${cityName}`);
      return `https://www.google.com/maps/search/${encodedSearch}`;
    } else if (cityName) {
      // If we can't extract a store name, just search for film stores in the city
      return `https://www.google.com/maps/search/film+store+${cityName.replace(/\s+/g, '+')}`;
    }
    
    return `https://www.google.com/maps/search/film+store`;
  } else if (placeId.startsWith('generated_')) {
    return `https://www.google.com/maps/search/film+store`;
  }
  
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
};

// Helper function to extract store name from a mock place ID
function extractStoreNameFromPlaceId(placeId: string): string | null {
  // For our predefined city stores, find the corresponding store name
  for (const [city, stores] of Object.entries(citySpecificStores)) {
    const store = stores.find(s => s.place_id === placeId);
    if (store) {
      return store.name;
    }
  }
  return null;
}

// Helper function to extract city name from a mock place ID
function extractCityFromPlaceId(placeId: string): string | null {
  // Match patterns like mock_sf_1, mock_new_york_2, etc.
  const match = placeId.match(/mock_([a-z_]+)_\d+/);
  if (match && match[1]) {
    // Convert city key to readable name
    const cityKey = match[1];
    return cityKey
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return null;
} 