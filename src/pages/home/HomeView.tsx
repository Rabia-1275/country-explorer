import React from 'react';
import { useHomeViewModel } from './useHomeViewModel';
import CountryCard from '../../components/CountryCard';
import SkeletonCard from '../../components/SkeletonCard';
import './HomeView.css';
import { useAuthContext } from '../../context/AuthContext';
import { saveFavorite } from '../../pages/favorites/FavoritesModel';
import { saveWishlistItem } from '../../pages/wishlist/WishlistModel';
import { useCompareViewModel } from '../../pages/compare/useCompareViewModel';
import { useNavigate } from 'react-router-dom';

interface HomeViewProps {
  viewModel: ReturnType<typeof useHomeViewModel>;
}

export default function HomeView({ viewModel }: HomeViewProps) {
  const {
    countries,
    loading,
    error,
    selectedRegion,
    setSelectedRegion,
    sortOption,
    setSortOption,
  } = viewModel;

  // Auth and navigation
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Compare
  const { addCountry: addToCompare, compareList } = useCompareViewModel();

  // Handler for adding a country to favorites
  const handleAddFavorite = async (country) => {
    if (!user) {
      // Redirect unauthenticated users to login
      navigate('/auth');
      return;
    }
    try {
      await saveFavorite(user.uid, country);
    } catch (err) {
      console.error('Error saving favorite:', err);
    }
  };

  // Handler for adding a country to wishlist
  const handleAddWishlist = async (country) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    try {
      await saveWishlistItem(user.uid, country);
    } catch (err) {
      console.error('Error saving to wishlist:', err);
    }
  };

  const handleCompareClick = (country) => {
    const isAlreadyCompared = compareList.some(c => c.codes.alpha_3 === country.codes.alpha_3);
    if (!isAlreadyCompared && compareList.length >= 3) {
      alert('You can only compare up to 3 countries at a time.');
      return;
    }
    addToCompare(country);
  };

  return (
    <div className="home-view-container">
      <section className="hero-section">
        <h1 className="hero-title">Discover the World</h1>
        <p className="hero-subtitle">Search for any country to explore its details</p>
      </section>

      <section className="results-section">
        {loading && (
          <div className="countries-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {error && <div className="error-state">{error}</div>}

        {/* Filters */}
        {!loading && !error && (
          <div className="filters-container">
            <div className="filter-group">
              <label className="filter-label" htmlFor="region-select">Region</label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
                className="filter-select"
              >
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label" htmlFor="sort-select">Sort by</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={e => setSortOption(e.target.value as any)}
                className="filter-select"
              >
                <option value="name-asc">Name (A‑Z)</option>
                <option value="name-desc">Name (Z‑A)</option>
                <option value="pop-desc">Population (High‑Low)</option>
                <option value="pop-asc">Population (Low‑High)</option>
              </select>
            </div>
          </div>
        )}

        {!loading && !error && countries.length > 0 && (
          <div className="countries-grid">
            {countries.map((country, idx) => (
              <CountryCard
                key={country.codes?.alpha_3 || idx}
                country={country}
                onFavoriteClick={handleAddFavorite}
                onWishlistClick={handleAddWishlist}
                onCompareClick={handleCompareClick}
                isCompared={compareList.some(c => c.codes.alpha_3 === country.codes.alpha_3)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
