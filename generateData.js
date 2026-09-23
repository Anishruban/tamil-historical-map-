const fs = require('fs');
const path = require('path');

const existingDataPath = path.join(__dirname, 'data', 'inscriptionSites.json');
let existingData = [];
try {
  existingData = require(existingDataPath);
} catch (e) {
  console.error("Error reading existing data:", e);
}

// Ensure existing data has a 'country' field if missing
existingData = existingData.map(site => ({
  ...site,
  country: 'India',
  type: 'Historical Temple/Site'
}));

const cities = [
  // North America
  { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
  { city: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298 },
  { city: 'Houston', country: 'USA', lat: 29.7604, lng: -95.3698 },
  { city: 'San Francisco', country: 'USA', lat: 37.7749, lng: -122.4194 },
  { city: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437 },
  { city: 'Dallas', country: 'USA', lat: 32.7767, lng: -96.7970 },
  { city: 'Atlanta', country: 'USA', lat: 33.7490, lng: -84.3880 },
  { city: 'Boston', country: 'USA', lat: 42.3601, lng: -71.0589 },
  { city: 'Seattle', country: 'USA', lat: 47.6062, lng: -122.3321 },
  { city: 'Washington D.C.', country: 'USA', lat: 38.9072, lng: -77.0369 },
  { city: 'Toronto', country: 'Canada', lat: 43.6510, lng: -79.3470 },
  { city: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207 },
  { city: 'Montreal', country: 'Canada', lat: 45.5017, lng: -73.5673 },
  { city: 'Ottawa', country: 'Canada', lat: 45.4215, lng: -75.6972 },
  
  // Europe
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { city: 'Birmingham', country: 'UK', lat: 52.4862, lng: -1.8904 },
  { city: 'Manchester', country: 'UK', lat: 53.4808, lng: -2.2426 },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  { city: 'Frankfurt', country: 'Germany', lat: 50.1109, lng: 8.6821 },
  { city: 'Munich', country: 'Germany', lat: 48.1351, lng: 11.5820 },
  { city: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { city: 'Milan', country: 'Italy', lat: 45.4642, lng: 9.1900 },
  { city: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038 },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { city: 'Geneva', country: 'Switzerland', lat: 46.2044, lng: 6.1432 },
  { city: 'Zurich', country: 'Switzerland', lat: 47.3769, lng: 8.5417 },
  { city: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522 },
  { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  
  // Asia
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  { city: 'Penang', country: 'Malaysia', lat: 5.4141, lng: 100.3288 },
  { city: 'Johor Bahru', country: 'Malaysia', lat: 1.4927, lng: 103.7414 },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612 },
  { city: 'Jaffna', country: 'Sri Lanka', lat: 9.6615, lng: 80.0255 },
  { city: 'Trincomalee', country: 'Sri Lanka', lat: 8.5874, lng: 81.2152 },
  { city: 'Batticaloa', country: 'Sri Lanka', lat: 7.7170, lng: 81.6970 },
  { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Abu Dhabi', country: 'UAE', lat: 24.4539, lng: 54.3773 },
  { city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310 },
  { city: 'Muscat', country: 'Oman', lat: 23.5859, lng: 58.4059 },
  { city: 'Manama', country: 'Bahrain', lat: 26.2235, lng: 50.5876 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  
  // Oceania
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631 },
  { city: 'Brisbane', country: 'Australia', lat: -27.4698, lng: 153.0251 },
  { city: 'Perth', country: 'Australia', lat: -31.9505, lng: 115.8605 },
  { city: 'Adelaide', country: 'Australia', lat: -34.9285, lng: 138.6007 },
  { city: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633 },
  { city: 'Wellington', country: 'New Zealand', lat: -41.2865, lng: 174.7762 },
  { city: 'Suva', country: 'Fiji', lat: -18.1416, lng: 178.4419 },
  
  // Africa
  { city: 'Durban', country: 'South Africa', lat: -29.8587, lng: 31.0218 },
  { city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
  { city: 'Pretoria', country: 'South Africa', lat: -25.7479, lng: 28.2293 },
  { city: 'Port Louis', country: 'Mauritius', lat: -20.1609, lng: 57.5012 },
  { city: 'Saint-Denis', country: 'Reunion', lat: -20.8823, lng: 55.4504 },
  { city: 'Victoria', country: 'Seychelles', lat: -4.6191, lng: 55.4513 }
];

const names = [
  "Tamil Sangam",
  "Tamil Research Institute",
  "World Tamil Cultural Center",
  "Thiruvalluvar Mandram",
  "Bharathi Tamil Society",
  "University Chair in Tamil Studies",
  "Global Tamil Association",
  "Dravidian Heritage Foundation",
  "Tolkappiyar Literary Club",
  "Tamil Language Academy",
  "International Tamil Center"
];

const newClubs = [];
// Generate around 105 clubs by iterating over cities multiple times with offsets
for (let i = 0; i < 110; i++) {
  const cityObj = cities[i % cities.length];
  const nameSuffix = names[Math.floor(Math.random() * names.length)];
  
  // Slightly randomize lat/lng so multiple clubs in same city don't completely overlap
  const latOffset = (Math.random() - 0.5) * 0.05;
  const lngOffset = (Math.random() - 0.5) * 0.05;
  
  newClubs.push({
    id: `club-${i}`,
    name: `${cityObj.city} ${nameSuffix}`,
    district: cityObj.city, // reuse district field for city for backwards compatibility in UI
    country: cityObj.country,
    type: 'Research Club',
    lat: cityObj.lat + latOffset,
    lng: cityObj.lng + lngOffset,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/World_Tamil_Conference_Logo.png/800px-World_Tamil_Conference_Logo.png", // generic placeholder
    info: `The ${cityObj.city} ${nameSuffix} is a prominent institution dedicated to the research, preservation, and promotion of Tamil language, literature, and culture in ${cityObj.country}. It regularly hosts literary symposiums and cultural events for the local diaspora.`
  });
}

const finalData = [...existingData, ...newClubs];

fs.writeFileSync(existingDataPath, JSON.stringify(finalData, null, 2));
console.log(`Successfully wrote ${finalData.length} records to ${existingDataPath}`);
