// src/services/firebaseService.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration loaded from environment variables (Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export initialized Auth and Realtime Database instances
export const auth = getAuth(app);
export const db = getDatabase(app);
import { ref, set, get, remove } from 'firebase/database';
import type { Country } from '../types/country';

/** Add a country to the user's favorites. */
export async function addFavorite(userId: string, country: Country): Promise<void> {
  try {
    const favRef = ref(db, `favorites/${userId}/${country.codes.alpha_3}`);
    await set(favRef, country);
  } catch (error) {
    throw new Error(`Failed to add favorite: ${(error as Error).message}`);
  }
}

/** Remove a country from the user's favorites by its alpha‑3 code. */
export async function removeFavorite(userId: string, countryCode: string): Promise<void> {
  try {
    const favRef = ref(db, `favorites/${userId}/${countryCode}`);
    await remove(favRef);
  } catch (error) {
    throw new Error(`Failed to remove favorite: ${(error as Error).message}`);
  }
}

/** Retrieve all favorite countries for a user. */
export async function getFavorites(userId: string): Promise<Country[]> {
  try {
    const snapshot = await get(ref(db, `favorites/${userId}`));
    if (!snapshot.exists()) return [];
    const data = snapshot.val() as Record<string, Country>;
    return Object.values(data);
  } catch (error) {
    throw new Error(`Failed to fetch favorites: ${(error as Error).message}`);
  }
}

/** Add a country to the user's wishlist. */
export async function addWishlistItem(userId: string, country: Country): Promise<void> {
  try {
    const wishRef = ref(db, `wishlist/${userId}/${country.codes.alpha_3}`);
    await set(wishRef, country);
  } catch (error) {
    throw new Error(`Failed to add wishlist item: ${(error as Error).message}`);
  }
}

/** Remove a country from the user's wishlist. */
export async function removeWishlistItem(userId: string, countryCode: string): Promise<void> {
  try {
    const wishRef = ref(db, `wishlist/${userId}/${countryCode}`);
    await remove(wishRef);
  } catch (error) {
    throw new Error(`Failed to remove wishlist item: ${(error as Error).message}`);
  }
}

/** Retrieve all wishlist items for a user. */
export async function getWishlist(userId: string): Promise<Country[]> {
  try {
    const snapshot = await get(ref(db, `wishlist/${userId}`));
    if (!snapshot.exists()) return [];
    const data = snapshot.val() as Record<string, Country>;
    return Object.values(data);
  } catch (error) {
    throw new Error(`Failed to fetch wishlist: ${(error as Error).message}`);
  }
}
