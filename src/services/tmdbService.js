import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbService = {
  // Get trending movies for the Hero section and Home grid
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
  }
};
