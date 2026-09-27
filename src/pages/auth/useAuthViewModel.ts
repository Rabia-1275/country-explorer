// src/pages/auth/useAuthViewModel.ts
import { useState, useCallback } from 'react';
import { register, login } from './AuthModel';

type AuthMode = 'login' | 'register';

export function useAuthViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (e: any) {
      setError(e.message ?? 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [mode, email, password]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    toggleMode,
    loading,
    error,
    handleSubmit,
  } as const;
}
