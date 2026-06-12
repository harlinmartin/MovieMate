import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('moviemate_token'));
  const [loading, setLoading] = useState(true);

  // On mount: if we have a token, validate it by fetching user profile
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.user);
        } catch (error) {
          // Token is invalid or expired
          console.error('Token validation failed:', error);
          localStorage.removeItem('moviemate_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register new user
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });

    if (res.data.success) {
      localStorage.setItem('moviemate_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }

    return res.data;
  };

  // Login existing user
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });

    if (res.data.success) {
      localStorage.setItem('moviemate_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }

    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('moviemate_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
