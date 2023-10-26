import React from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchTrendingMovies } from '../API';

function Home() {
  const { data: trendingMovies, isLoading, isError } = useQuery('trendingMovies', fetchTrendingMovies);
  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

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
            <li className="movie-item" key={movie.id}>
              <Link to={`movies/${movie.id}`}>
              <img
                    src={ movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : defaultImg}
                    alt={movie.title}
                    className="movie-poster"
                    style={{ maxWidth: '250px' }}
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
  trendingMovies: PropTypes.object,
};

export default Home;