import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Footer from './components/Footer/Footer'; // Added a custom footer for extra project polish
import { WatchlistProvider } from './utils/WatchlistContext';
import './index.css';

// I'm using a WatchlistProvider here to keep track of movies across different pages
// It saves everything to localStorage so you don't lose your list on refresh!
function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="app">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv" element={<TVShows />} />
              {/* This route handles both movies and tv shows details */}
              <Route path="/:type/:id" element={<MovieDetail />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
