import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDetailViewModel } from './useDetailViewModel';
import SkeletonDetail from '../../components/SkeletonDetail';
import './DetailView.css';

export default function DetailView() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { country, loading, error } = useDetailViewModel(code);

  if (loading) {
    return <SkeletonDetail />;
  }

  if (error || !country) {
    return (
      <div className="detail-view-container">
        <div className="error-state">
          <h2>Oops!</h2>
          <p>{error || 'Country not found'}</p>
          <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  const formatList = (arr?: any[]) => arr && arr.length > 0 ? arr.join(', ') : 'N/A';
  const formatCurrencies = (currencies?: { name: string, symbol: string }[]) => 
    currencies && currencies.length > 0 ? currencies.map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A';
  const formatLanguages = (langs?: { name: string }[]) => 
    langs && langs.length > 0 ? langs.map(l => l.name).join(', ') : 'N/A';
  const formatCapitals = (caps?: { name: string }[]) =>
    caps && caps.length > 0 ? caps.map(c => c.name).join(', ') : 'N/A';

  return (
    <div className="detail-view-container">
      <button className="back-link" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="detail-content">
        <div className="detail-flag-container">
          {country.flag?.url_svg || country.flag?.url_png ? (
            <img 
              src={country.flag?.url_svg || country.flag?.url_png} 
              alt={`Flag of ${country.names.common}`} 
              className="detail-flag"
            />
          ) : (
            <div className="detail-flag-fallback">
              <span className="detail-emoji">{country.flag?.emoji || '🏳️'}</span>
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{country.names.official}</h1>
          {country.names.official !== country.names.common && (
            <h2 className="detail-subtitle">{country.names.common}</h2>
          )}

          <div className="info-grid">
            <div className="info-column">
              <p><strong>Capital:</strong> {formatCapitals(country.capitals)}</p>
              <p><strong>Region:</strong> {country.region || 'N/A'}</p>
              <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
              <p><strong>Area:</strong> {country.area?.kilometers ? `${country.area.kilometers.toLocaleString()} km²` : 'N/A'}</p>
            </div>
            <div className="info-column">
              <p><strong>Currencies:</strong> {formatCurrencies(country.currencies)}</p>
              <p><strong>Languages:</strong> {formatLanguages(country.languages)}</p>
              <p><strong>Timezones:</strong> {formatList(country.timezones)}</p>
              <p><strong>Calling Codes:</strong> {formatList(country.calling_codes)}</p>
              <p><strong>Driving Side:</strong> {country.cars?.driving_side ? country.cars.driving_side.charAt(0).toUpperCase() + country.cars.driving_side.slice(1) : 'N/A'}</p>
            </div>
          </div>

          <div className="borders-section">
            <h3>Border Countries:</h3>
            <div className="borders-list">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map(border => (
                  <Link key={border} to={`/country/${border}`} className="border-chip">
                    {border}
                  </Link>
                ))
              ) : (
                <span className="no-borders">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
