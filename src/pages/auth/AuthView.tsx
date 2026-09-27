// src/pages/auth/AuthView.tsx

import React from 'react';
import { useAuthViewModel } from './useAuthViewModel';
import './AuthView.css';

const AuthView: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    toggleMode,
    loading,
    error,
    handleSubmit,
  } = useAuthViewModel();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSubmit();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{mode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={onSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-label">
            Password
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Processing…' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="auth-toggle">
          {mode === 'login' ? (
            <span>
              Don’t have an account?{' '}
              <button type="button" className="auth-link" onClick={toggleMode}>
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" className="auth-link" onClick={toggleMode}>
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
