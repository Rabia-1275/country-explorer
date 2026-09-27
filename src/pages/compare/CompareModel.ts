import type { Country } from '../../types/country';

export function addToCompare(list: Country[], country: Country): Country[] {
  if (list.length >= 3) {
    return list;
  }
  
  const alreadyExists = list.some(c => c.codes.alpha_3 === country.codes.alpha_3);
  if (alreadyExists) {
    return list;
  }
  
  return [...list, country];
}

export function removeFromCompare(list: Country[], countryCode: string): Country[] {
  return list.filter(c => c.codes.alpha_3 !== countryCode);
}
