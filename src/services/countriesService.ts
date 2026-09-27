import type { Country } from '../types/country';

const BASE_URL = import.meta.env.VITE_COUNTRIES_API_URL;
const API_KEY = import.meta.env.VITE_COUNTRIES_API_KEY;

export async function searchCountries(query: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/countries/v5?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No countries found matching "${query}".`);
      }
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    const results = json?.data?.objects;
    
    if (!results || results.length === 0) {
      throw new Error(`No countries found matching "${query}".`);
    }

    return results as Country[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while searching for countries.');
  }
}

export async function getCountryByCode(code: string): Promise<Country> {
  try {
    const response = await fetch(`${BASE_URL}/countries/v5?q=${encodeURIComponent(code)}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Country with code "${code}" not found.`);
      }
      throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    const results = json?.data?.objects as Country[];
    
    if (!results || results.length === 0) {
      throw new Error(`Country with code "${code}" not found.`);
    }

    const exactMatch = results.find(c => c.codes?.alpha_3?.toLowerCase() === code.toLowerCase());
    return exactMatch || results[0];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching the country.');
  }
}
// Export a function to fetch all countries for a given region using the REST Countries v5 API
export async function getCountriesByRegion(region: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/countries/v5?region=${encodeURIComponent(region)}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No countries found for region "${region}".`);
      }
      throw new Error(`Failed to fetch region ${region}: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    const results = json?.data?.objects as Country[];
    if (!results || results.length === 0) {
      throw new Error(`No countries found for region "${region}".`);
    }
    return results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching countries by region.');
  }
}
