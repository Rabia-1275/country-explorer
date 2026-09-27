import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useFavoritesViewModel } from "./useFavoritesViewModel";
import CountryCard from "../../components/CountryCard";
import SkeletonCard from "../../components/SkeletonCard";

export default function FavoritesView() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="empty-state" style={{ padding: "3rem", textAlign: "center" }}>
        <p>Please log in to see your favorites.</p>
        <Link to="/auth" className="nav-link">Go to Login</Link>
      </div>
    );
  }

  const { favorites, loading, error, removeItem } = useFavoritesViewModel();

  if (loading) {
    return (
      <div className="countries-grid" style={{ padding: "2rem" }}>
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }
  if (error) return <p style={{ padding: "3rem", textAlign: "center", color: "#dc2626" }}>Error: {error}</p>;
  if (favorites.length === 0) {
    return <p style={{ padding: "3rem", textAlign: "center" }}>No favorites yet — start exploring!</p>;
  }

  return (
    <div className="countries-grid" style={{ padding: "2rem" }}>
      {favorites.map((c) => (
        <CountryCard
          key={c.codes.alpha_3}
          country={c}
          onFavoriteClick={() => removeItem(c.codes.alpha_3)}
        />
      ))}
    </div>
  );
}
