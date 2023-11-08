import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchTrendingMovies } from '../API';
import MoviesList from '../components/MoviesList';

function Home() {
  const { data: trendingMovies, isLoading, isError } = useQuery('trendingMovies', fetchTrendingMovies);

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
          .sort((a, b) => b.vote_average - a.vote_average)
          .map((movie) => (
            <MoviesList key={movie.id} movie={movie} isFromMovies={false}/> 
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
