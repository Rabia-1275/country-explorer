import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Country } from '../types/country';
import './CountryCard.css';

interface CountryCardProps {
  country: Country;
  onFavoriteClick?: (country: Country) => void;
  onWishlistClick?: (country: Country) => void;
  onCompareClick?: (country: Country) => void;
  isCompared?: boolean;
}

export default function CountryCard({ country, onFavoriteClick, onWishlistClick, onCompareClick, isCompared = false }: CountryCardProps) {
  const navigate = useNavigate();
  const flagSrc = country.flag?.url_svg || country.flag?.url_png;
  const [imgError, setImgError] = useState(!flagSrc);

  const goToDetail = () => {
    if (country.codes?.alpha_3) {
      navigate(`/country/${country.codes.alpha_3}`);
    }
  };

  return (
    <div className="country-card" onClick={goToDetail} style={{ cursor: 'pointer' }}>
      <div className="country-flag-container">
        {!imgError && flagSrc ? (
          <img 
            src={flagSrc} 
            alt={`Flag of ${country.names.common}`} 
            className="country-flag"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="country-flag-fallback">
            <span className="country-emoji">{country.flag?.emoji || '🏳️'}</span>
          </div>
        )}
        
        <div className="country-actions">
          <button className="action-btn" aria-label="Add to favorites" onClick={(e) => { e.stopPropagation(); if (onFavoriteClick) onFavoriteClick(country); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="action-btn" aria-label="Add to wishlist" onClick={(e) => { e.stopPropagation(); if (onWishlistClick) onWishlistClick(country); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button className={`action-btn ${isCompared ? 'active' : ''}`} aria-label="Add to compare" onClick={(e) => { e.stopPropagation(); if (onCompareClick) onCompareClick(country); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="country-details">
        <h3 className="country-name">{country.names.common}</h3>
        <div className="country-info-row">
          <span className="info-label">Region:</span>
          <span className="info-value">{country.region}</span>
        </div>
        <div className="country-info-row">
          <span className="info-label">Population:</span>
          <span className="info-value">{country.population.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
