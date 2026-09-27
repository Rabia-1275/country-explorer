import { useState, useEffect } from 'react';
import { DetailModel } from './DetailModel';
import type { Country } from '../../types/country';

const detailModel = new DetailModel();

export function useDetailViewModel(code: string | undefined) {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadCountry = async () => {
      if (!code) {
        setLoading(false);
        setError('No country code provided.');
        return;
      }

      setLoading(true);
      setError(null);
      setCountry(null);

      try {
        const result = await detailModel.getCountryByCode(code);
        if (mounted) {
          setCountry(result);
        }
      } catch (err) {
        if (mounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to load country details.');
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCountry();

    return () => {
      mounted = false;
    };
  }, [code]);

  return {
    country,
    loading,
    error
  };
}
