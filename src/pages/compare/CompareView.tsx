import React from 'react';
import { useCompareViewModel } from './useCompareViewModel';
import './CompareView.css';
import { Link } from 'react-router-dom';

export default function CompareView() {
  const { compareList, removeCountry } = useCompareViewModel();

  if (compareList.length === 0) {
    return (
      <div className="empty-compare" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Compare Countries</h2>
        <p>Select up to 3 countries to compare. Search or browse on the Home page and use the compare button on each country card.</p>
        <Link to="/" className="nav-link" style={{ display: 'inline-block', marginTop: '1rem' }}>Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="compare-view">
      <h2 className="compare-title">Comparing {compareList.length} Countr{compareList.length === 1 ? 'y' : 'ies'}</h2>
      
      <div className="compare-table-container">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="feature-col">Feature</th>
              {compareList.map(country => (
                <th key={country.codes.alpha_3} className="country-col">
                  <div className="country-header">
                    <button 
                      className="remove-btn" 
                      onClick={() => removeCountry(country.codes.alpha_3)}
                      aria-label={`Remove ${country.names.common}`}
                    >
                      &times;
                    </button>
                    <div className="flag-wrapper">
                      {country.flag?.url_svg || country.flag?.url_png ? (
                        <img 
                          src={country.flag?.url_svg || country.flag?.url_png} 
                          alt={`Flag of ${country.names.common}`} 
                          className="compare-flag"
                        />
                      ) : (
                        <span className="compare-emoji">{country.flag?.emoji || '🏳️'}</span>
                      )}
                    </div>
                    <h3 className="compare-country-name">{country.names.common}</h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-col">Capital</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>
                  {country.capitals && country.capitals.length > 0 ? country.capitals.map(c => c.name).join(', ') : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Region</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>{country.region}</td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Population</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>{country.population?.toLocaleString() || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Area</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>
                  {country.area?.kilometers ? `${country.area.kilometers.toLocaleString()} km²` : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Languages</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>
                  {country.languages && country.languages.length > 0
                    ? country.languages.map(l => l.name).join(', ')
                    : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Currencies</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>
                  {country.currencies && Object.keys(country.currencies).length > 0
                    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
                    : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Timezones</td>
              {compareList.map(country => (
                <td key={country.codes.alpha_3}>
                  {country.timezones?.join(', ') || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
