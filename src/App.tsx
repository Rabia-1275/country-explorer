import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import HomeView from './pages/home/HomeView';
import DetailView from './pages/detail/DetailView';
import AuthView from './pages/auth/AuthView';
import { useHomeViewModel } from './pages/home/useHomeViewModel';
import FavoritesView from './pages/favorites/FavoritesView';
import WishlistView from './pages/wishlist/WishlistView';
import CompareView from './pages/compare/CompareView';
function AppContent() {
  const homeViewModel = useHomeViewModel();
  const { user } = useAuthContext();

  return (
    <div className="app-container">
      <Header
        query={homeViewModel.query}
        setQuery={homeViewModel.setQuery}
        handleSearch={homeViewModel.handleSearch}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomeView viewModel={homeViewModel} />} />
          <Route path="/country/:code" element={<DetailView />} />
          <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthView />} />
          <Route path="/favorites" element={<FavoritesView />} />
          <Route path="/wishlist" element={<WishlistView />} />
          <Route path="/compare" element={<CompareView />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
