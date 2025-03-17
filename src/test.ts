import { getRecommendedFilmStocks } from './utils/filmStocks';

// Test different scenarios
console.log('Testing film stock recommendations:');

// Scenario 1: Bright sunlight, color film in 35mm
console.log('\nScenario 1: Bright sunlight, color film in 35mm');
const brightColorFilms = getRecommendedFilmStocks('bright', {
  format: ['35mm'],
  type: ['color'],
  maxIso: 200
});
console.log(`Found ${brightColorFilms.length} matching films:`);
brightColorFilms.forEach(film => {
  console.log(`- ${film.name} (ISO ${film.iso}) by ${film.brand}`);
});

// Scenario 2: Low light, black and white film in any format
console.log('\nScenario 2: Low light, black and white film');
const lowLightBWFilms = getRecommendedFilmStocks('low', {
  format: [],
  type: ['blackAndWhite'],
  minIso: 400
});
console.log(`Found ${lowLightBWFilms.length} matching films:`);
lowLightBWFilms.forEach(film => {
  console.log(`- ${film.name} (ISO ${film.iso}) by ${film.brand}`);
});

// Scenario 3: Night photography, any type, high ISO
console.log('\nScenario 3: Night photography, high ISO films');
const nightFilms = getRecommendedFilmStocks('night', {
  format: [],
  type: [],
  minIso: 800
});
console.log(`Found ${nightFilms.length} matching films:`);
nightFilms.forEach(film => {
  console.log(`- ${film.name} (ISO ${film.iso}) by ${film.brand}`);
}); 