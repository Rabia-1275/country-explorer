// src/services/authService.ts

import { auth } from './firebaseService';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';

/** Map Firebase auth error codes to friendly messages */
function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Authentication error. Please try again.';
  }
}

/** Register a new user */
export async function registerUser(email: string, password: string): Promise<User> {
  try {
    const cred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: any) {
    throw new Error(mapFirebaseError(err.code));
  }
}

/** Log in an existing user */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const cred: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: any) {
    throw new Error(mapFirebaseError(err.code));
  }
}

/** Log out the current user */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err: any) {
    throw new Error(mapFirebaseError(err.code));
  }
}

/** Subscribe to auth state changes */
export function subscribeToAuthChanges(callback: (user: User | null) => void): () => void {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
  });
  return unsubscribe;
}
