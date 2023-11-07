import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchTrendingMovies } from '../API';
import MoviesList from './MoviesList';

function Home() {
  const { data: trendingMovies, isLoading, isError } = useQuery('trendingMovies', fetchTrendingMovies);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading trending movies.</div>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul className="movies-list">
        {trendingMovies.results
          .sort((a, b) => b.vote_average - a.vote_average) // Sort movies by vote_average in descending order
          .map((movie) => (
            <MoviesList key={movie.id} movie={movie} location={location.pathname} /> 
          ))}
      </ul>
      <Outlet />
    </div>
  );
}

Home.propTypes = {
  trendingMovies: PropTypes.object,
};

export default Home;