import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { useTheme } from '../context/ThemeContext';
import { useAuthContext } from '../context/AuthContext';

interface HeaderProps {
  query?: string;
  setQuery?: (val: string) => void;
  handleSearch?: () => void;
}

export default function Header({ query = '', setQuery = () => {}, handleSearch = () => {} }: HeaderProps) {
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    handleSearch();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Country Explorer</h1>
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
          <Link to="/compare" className="nav-link">Compare</Link>
        </nav>

        <div className="header-actions">
          <form className="search-bar" onSubmit={onSubmit}>
            <input 
              type="text" 
              placeholder="Search countries..." 
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                if (val.trim() === '') {
                  // Reset to home view when input cleared
                  navigate('/');
                }
              }}
            />
            <button type="submit" className="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <button className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <div className="desktop-auth">
            {user ? (
              <button className="logout-btn" onClick={logout} aria-label="Logout">Logout</button>
            ) : (
              <Link to="/auth" className="nav-link">Login</Link>
            )}
          </div>
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/favorites" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Favorites</Link>
          <Link to="/wishlist" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
          <Link to="/compare" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Compare</Link>
          {user ? (
            <button className="mobile-nav-link logout-text" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Logout</button>
          ) : (
            <Link to="/auth" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
}
