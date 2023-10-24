import axios from 'axios';

const API_KEY = '9a4b9e4760b7564e10a80d0c72f50665'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Function to fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axiosInstance.get('https://api.themoviedb.org/3/movie/popular');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to search for movies by keyword
export const searchMovies = async (keyword) => {
  try {
    const response = await axiosInstance.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        query: keyword,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get full movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`https://api.themoviedb.org/3/movie/{movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get cast information for a movie
export const getMovieCast = async (movieId) => {
  try {
    const response = await axiosInstance.get(`https://api.themoviedb.org/3/movie/{movieId}/credits`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get movie reviews
export const getMovieReviews = async (movieId) => {
  try {
    const response = await axiosInstance.get(`https://api.themoviedb.org/3/movie/{movieId}/reviews`);
    return response.data;
  } catch (error) {
    throw error;
  }
};