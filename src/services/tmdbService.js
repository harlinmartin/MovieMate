import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// This service handles all our calls to the TheMovieDB API
// Make sure you have your VITE_TMDB_KEY in the .env file!
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbService = {
  // We use this for the big trending section on the home page
  getTrending: async (type = 'movie', timeWindow = 'day') => {
    try {
      const response = await tmdbApi.get(`/trending/${type}/${timeWindow}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending:', error);
      throw error;
    }
  },

  // Get popular movies/shows
  getPopular: async (type = 'movie', page = 1) => {
    try {
      const response = await tmdbApi.get(`/${type}/popular`, {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching popular ${type}:`, error);
      throw error;
    }
  },

  // Get details for a specific movie or TV show
  getDetails: async (type, id) => {
    try {
      const response = await tmdbApi.get(`/${type}/${id}`, {
        params: { append_to_response: 'videos,credits,similar' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for ${id}:`, error);
      throw error;
    }
  },

  // Search movies and TV shows
  search: async (query, page = 1) => {
    try {
      const response = await tmdbApi.get('/search/multi', {
        params: { query, page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },

  // Get list of genres
  getGenres: async (type = 'movie') => {
    try {
      const response = await tmdbApi.get(`/genre/${type}/list`);
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  // Discover movies/shows by genre
  getByGenre: async (type = 'movie', genreId, page = 1) => {
    try {
      const response = await tmdbApi.get(`/discover/${type}`, {
        params: { 
          with_genres: genreId,
          page
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching by genre:', error);
      throw error;
    }
  }
};
