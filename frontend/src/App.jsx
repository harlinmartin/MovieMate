import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer/Footer'; // Added a custom footer for extra project polish
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import { WatchlistProvider } from './utils/WatchlistContext';
import './index.css';

// AuthProvider must be outside WatchlistProvider since watchlist depends on auth state
// Both must be inside Router so they can use navigation hooks
function App() {
  return (
    <Router>
      <AuthProvider>
        <WatchlistProvider>
          <div className="app">
            <Navbar />
            
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv" element={<TVShows />} />
                {/* This route handles both movies and tv shows details */}
                <Route path="/:type/:id" element={<MovieDetail />} />
                <Route path="/watchlist" element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </WatchlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
