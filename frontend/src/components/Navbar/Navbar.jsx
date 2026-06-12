import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiBookmark, FiHome, FiFilm, FiTv, FiMenu, FiX, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../utils/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Movies', path: '/movies', icon: <FiFilm /> },
    { name: 'TV Shows', path: '/tv', icon: <FiTv /> },
    { name: 'Watchlist', path: '/watchlist', icon: <FiBookmark /> },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" aria-label="MovieMate Home">
          MOVIE<span>MATE</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search movies..." 
            aria-label="Search movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Submit search"><FiSearch /></button>
        </form>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.name}
            </Link>
          ))}

          {/* Auth section */}
          {isAuthenticated ? (
            <div className="nav-auth">
              <span className="nav-user">
                <FiUser />
                {user?.name?.split(' ')[0]}
              </span>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                <span className="nav-icon"><FiLogOut /></span>
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`nav-link login-link ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon"><FiLogIn /></span>
              Login
            </Link>
          )}
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
