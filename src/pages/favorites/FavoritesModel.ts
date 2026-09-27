// src/pages/favorites/FavoritesModel.ts

import type { Country } from '../../types/country';
import { addFavorite, removeFavorite, getFavorites } from '../../services/firebaseService';

/** Load all favorite countries for a user */
export async function loadFavorites(userId: string): Promise<Country[]> {
  return await getFavorites(userId);
}

/** Save a country to the user's favorites */
export async function saveFavorite(userId: string, country: Country): Promise<void> {
  await addFavorite(userId, country);
}

/** Delete a favorite country by its alpha‑3 code */
export async function deleteFavorite(userId: string, countryCode: string): Promise<void> {
  await removeFavorite(userId, countryCode);
}
