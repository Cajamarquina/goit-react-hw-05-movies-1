import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movie }) => {
  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const location = useLocation();

  return (
    <li className="movie-item">
      <Link to={`movies/${movie.id}`} state={{ from: location.pathname }}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : defaultImg}
          alt={movie.title}
          className="movie-poster"
          style={{ maxWidth: '250px' }}
        />
        <p className="movie-title">{movie.title}</p>
      </Link>
    </li>
  );
};

export default MoviesList;
