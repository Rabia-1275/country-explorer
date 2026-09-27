// src/pages/wishlist/WishlistModel.ts

import type { Country } from '../../types/country';
import { addWishlistItem, removeWishlistItem, getWishlist } from '../../services/firebaseService';

/** Load all wishlist items for a user */
export async function loadWishlist(userId: string): Promise<Country[]> {
  return await getWishlist(userId);
}

/** Save a country to the user's wishlist */
export async function saveWishlistItem(userId: string, country: Country): Promise<void> {
  await addWishlistItem(userId, country);
}

/** Delete a wishlist country by its alpha‑3 code */
export async function deleteWishlistItem(userId: string, countryCode: string): Promise<void> {
  await removeWishlistItem(userId, countryCode);
}

