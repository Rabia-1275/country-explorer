import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useWishlistViewModel } from "./useWishlistViewModel";
import CountryCard from "../../components/CountryCard";
import SkeletonCard from "../../components/SkeletonCard";

export default function WishlistView() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="empty-state" style={{ padding: "3rem", textAlign: "center" }}>
        <p>Please log in to see your wishlist.</p>
        <Link to="/auth" className="nav-link">Go to Login</Link>
      </div>
    );
  }

  const { wishlist, loading, error, removeItem } = useWishlistViewModel();

  if (loading) {
    return (
      <div className="countries-grid" style={{ padding: "2rem" }}>
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }
  if (error) return <p style={{ padding: "3rem", textAlign: "center", color: "#dc2626" }}>Error: {error}</p>;
  if (wishlist.length === 0) {
    return <p style={{ padding: "3rem", textAlign: "center" }}>Your wishlist is empty — save countries you want to visit!</p>;
  }

  return (
    <div className="countries-grid" style={{ padding: "2rem" }}>
      {wishlist.map((c) => (
        <CountryCard
          key={c.codes.alpha_3}
          country={c}
          onWishlistClick={() => removeItem(c.codes.alpha_3)}
        />
      ))}
    </div>
  );
}
