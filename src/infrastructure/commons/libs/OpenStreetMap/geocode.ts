import axios from 'axios';

interface Location {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    city_district: string;
    city: string;
    state: string;
    'ISO3166-2-lvl4': string;
    region: string;
    'ISO3166-2-lvl3': string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}

async function fetchLocationByCoordinates(
  lat: number,
  lon: number
): Promise<Location> {
  const url = `https://nominatim.openstreetmap.org/reverse?email=hydeblazack@gmail.com&format=json&lat=${lat}&lon=${lon}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
}

export { fetchLocationByCoordinates };
