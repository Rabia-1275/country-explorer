import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { loadFavorites, deleteFavorite } from "./FavoritesModel";
import type { Country } from "../../types/country";

export function useFavoritesViewModel() {
  const { user } = useAuthContext();
  const userId = user?.uid ?? "";
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadFavorites(userId);
        setFavorites(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const removeItem = async (countryCode: string) => {
    if (!userId) return;
    try {
      await deleteFavorite(userId, countryCode);
      setFavorites((prev) => prev.filter((c) => c.codes.alpha_3 !== countryCode));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return { favorites, loading, error, removeItem } as const;
}
