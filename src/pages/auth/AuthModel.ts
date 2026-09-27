// src/pages/auth/AuthModel.ts

import type { User } from 'firebase/auth';
import { registerUser, loginUser, logoutUser } from '../../services/authService';

/** Register a new user */
export async function register(email: string, password: string): Promise<User> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) throw new Error('Email cannot be empty');
  if (!password) throw new Error('Password cannot be empty');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  return await registerUser(trimmedEmail, password);
}

/** Log in an existing user */
export async function login(email: string, password: string): Promise<User> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) throw new Error('Email cannot be empty');
  if (!password) throw new Error('Password cannot be empty');
  return await loginUser(trimmedEmail, password);
}

/** Log out the current user */
export async function logout(): Promise<void> {
  await logoutUser();
}
