// React and router imports
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Model and utilities
import { HomeModel, sortCountries } from './HomeModel';
import { getCountriesByRegion } from '../../services/countriesService';
import type { SortOption } from './HomeModel';
import type { Country } from '../../types/country';

const homeModel = new HomeModel();

export function useHomeViewModel() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [rawCountries, setRawCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [initialCountries, setInitialCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  // Apply sorting whenever raw data or sort option changes
  useEffect(() => {
    const sorted = sortCountries(rawCountries, sortOption);
    setCountries(sorted);
  }, [rawCountries, sortOption]);

  // Fetch region data when region changes (unless "All")
  useEffect(() => {
    const fetchRegion = async () => {
      if (selectedRegion === 'All') {
        // Restore original random set
        setRawCountries(initialCountries);
        return;
      }
      try {
        const regionData = await getCountriesByRegion(selectedRegion);
        setRawCountries(regionData);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('Failed to load region data.');
      }
    };
    fetchRegion();
  }, [selectedRegion, initialCountries]);

  // Load data based on URL query parameter (search or initial)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(location.search);
        const q = params.get('q')?.trim() ?? '';
        if (q) {
          setQuery(q);
          const results = await homeModel.getCountries(q);
          if (mounted) setRawCountries(results);
        } else {
          const initial = await homeModel.getInitialCountries();
          if (mounted) {
            setRawCountries(initial);
            setInitialCountries(initial);
          }
        }
      } catch (err) {
        if (mounted) setError('Failed to load countries.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [location.search]);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      // Reset to fresh random view
      navigate('/');
      const initial = await homeModel.getInitialCountries();
      setRawCountries(initial);
      setInitialCountries(initial);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await homeModel.getCountries(trimmed);
      setRawCountries(results);
      navigate(`/?q=${encodeURIComponent(trimmed)}`);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('An unexpected error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    countries,
    loading,
    error,
    handleSearch,
    selectedRegion,
    setSelectedRegion,
    sortOption,
    setSortOption,
  };
}
