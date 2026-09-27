import { searchCountries } from '../../services/countriesService';
import type { Country } from '../../types/country';

// Seed keywords used to fetch a random set of countries for the initial view
const SEED_KEYWORDS = [
  'United', 'Republic', 'Island', 'Land', 'Stan',
  'South', 'North', 'New', 'Guinea', 'Saint',
  'Democratic', 'Central', 'Equatorial', 'Arab'
];

/**
 * HomeModel encapsulates data‑access logic for the Home page.
 * It provides methods for searching countries and for retrieving an initial
 * random collection of countries.
 */
export class HomeModel {
  /**
   * Search for countries whose **common** name matches the query.
   * The matching rules are:
   *   • Exact full‑name match (case‑insensitive)
   *   • Exact first‑word match
   *   • Prefix of the full name (e.g. "unit" matches "United States")
   */
  async getCountries(query: string): Promise<Country[]> {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      throw new Error('Search query must be at least 2 characters.');
    }
    const results = await searchCountries(trimmedQuery);
    return results.filter(c => {
      if (!c.names?.common) return false;
      const lower = c.names.common.toLowerCase();
      const q = trimmedQuery.toLowerCase();
      const firstWord = lower.split(/\s+/)[0];
      return lower === q || firstWord === q || lower.startsWith(q);
    });
  }

  /**
   * Retrieve a random set of countries for the default home view.
   * It picks three random seed keywords, fetches the matching countries, and
   * returns a shuffled list of up to 24 unique entries.
   */
  async getInitialCountries(): Promise<Country[]> {
    const shuffledKeywords = [...SEED_KEYWORDS].sort(() => 0.5 - Math.random());
    const selectedKeywords = shuffledKeywords.slice(0, 3);
    const promises = selectedKeywords.map(kw =>
      searchCountries(kw).catch(() => [] as Country[])
    );
    const resultsArray = await Promise.all(promises);
    const merged: Country[] = [];
    resultsArray.forEach(arr => merged.push(...arr));
    const uniqueMap = new Map<string, Country>();
    merged.forEach(country => {
      if (country.codes?.alpha_3 && !uniqueMap.has(country.codes.alpha_3)) {
        uniqueMap.set(country.codes.alpha_3, country);
      }
    });
    const uniqueCountries = Array.from(uniqueMap.values());
    const finalShuffled = uniqueCountries.sort(() => 0.5 - Math.random());
    return finalShuffled.slice(0, 24);
  }
}

// ---------------------------------------------------------------------------
// Exported utility types & functions (used by the view‑model for filtering & sorting)
// ---------------------------------------------------------------------------
export type SortOption = 'name-asc' | 'name-desc' | 'pop-desc' | 'pop-asc';

/** Filter the given list of countries by region. */
export const filterByRegion = (countries: Country[], region: string): Country[] => {
  if (!region || region === 'All') return countries;
  return countries.filter(c => c.region === region);
};

/** Sort the given list of countries according to the selected sort option. */
export const sortCountries = (countries: Country[], sortOption: SortOption): Country[] => {
  const sorted = [...countries];
  switch (sortOption) {
    case 'name-asc':
      sorted.sort((a, b) => a.names.common.localeCompare(b.names.common));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.names.common.localeCompare(a.names.common));
      break;
    case 'pop-desc':
      sorted.sort((a, b) => b.population - a.population);
      break;
    case 'pop-asc':
      sorted.sort((a, b) => a.population - b.population);
      break;
    default:
      break;
  }
  return sorted;
};
