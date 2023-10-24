import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchTrendingMovies } from '../API';
import { Link, Outlet } from 'react-router-dom';


function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetchTrendingMovies();
        if (response && response.results) {
          // Sort movies by user score (vote_average) in descending order
          const sortedMovies = response.results.sort((a, b) => b.vote_average - a.vote_average);
          setTrendingMovies(sortedMovies);
        }
      } catch (error) {
        console.error('Error fetching trending movies: ', error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul className="movies-list">
        {trendingMovies.map((movie) => (
          <li className="movie-item" key={movie.id}>
            <Link to={`movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p className="movie-title">{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

Home.propTypes = {
  trendingMovies: PropTypes.array, 
};

export default Home;
