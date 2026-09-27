// src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { subscribeToAuthChanges } from '../services/authService';
import { logout as logoutFromModel } from '../pages/auth/AuthModel';

interface AuthContextProps {
  user: User | null;
  authLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await logoutFromModel();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, logout }}>
      {authLoading ? (
        <div className="auth-loading">Loading authentication…</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
