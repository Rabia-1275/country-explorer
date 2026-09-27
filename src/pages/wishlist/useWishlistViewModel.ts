import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { loadWishlist, deleteWishlistItem } from "./WishlistModel";
import type { Country } from "../../types/country";

export function useWishlistViewModel() {
  const { user } = useAuthContext();
  const userId = user?.uid ?? "";
  const [wishlist, setWishlist] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadWishlist(userId);
        setWishlist(data);
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
      await deleteWishlistItem(userId, countryCode);
      setWishlist((prev) => prev.filter((c) => c.codes.alpha_3 !== countryCode));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return { wishlist, loading, error, removeItem } as const;
}
