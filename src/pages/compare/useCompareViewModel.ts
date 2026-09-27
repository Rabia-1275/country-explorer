import { useState, useEffect } from 'react';
import type { Country } from '../../types/country';
import { addToCompare, removeFromCompare } from './CompareModel';

export function useCompareViewModel() {
  const [compareList, setCompareList] = useState<Country[]>(() => {
    try {
      const stored = sessionStorage.getItem('compareList');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load compareList from sessionStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('compareList', JSON.stringify(compareList));
    } catch (e) {
      console.error('Failed to save compareList to sessionStorage', e);
    }
  }, [compareList]);

  const addCountry = (country: Country) => {
    setCompareList(prev => addToCompare(prev, country));
  };

  const removeCountry = (countryCode: string) => {
    setCompareList(prev => removeFromCompare(prev, countryCode));
  };

  return { compareList, addCountry, removeCountry } as const;
}
