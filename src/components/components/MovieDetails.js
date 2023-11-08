import React, { useEffect, useState, useRef } from 'react';
import { getMovieDetails } from '../API';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import Cast from '../components/Cast'; 
import Reviews from '../components/Reviews'; 

const GoBackBtn = () => {
  const location = useLocation();
  const previousPageRef = useRef(location.state?.from);

  return (
    <Link to={previousPageRef.current || '/goit-react-hw-05-movies'} className="go-back-button">
      <span className="arrow-icon">←</span> Go back
    </Link>
  );
};

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  useEffect(() => {
    async function fetchMovie() {
      try {
        if (!movieDetails) {
          const response = await getMovieDetails(movieId);
          setMovieDetails(response);
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchMovie();
  }, [movieId, movieDetails]);

  if (error) {
    return (
      <div>
        <GoBackBtn className="go-back-button" />
        <p>Error: Movie not found</p>
      </div>
    );
  }

  return (
    <div>
      <GoBackBtn className="go-back-button" />
      {movieDetails && (
        <div className="movie-details-container">
          <h2>{movieDetails.title}</h2>
          <div className="movie-details">
            <img
              src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : defaultImg}
              alt="poster"
              className="movie-poster"
              style={{ maxWidth: '250px' }}
            />
            <span className="movie-info">
              <p><b className="user-score">Rating: </b>{movieDetails.vote_average}</p>
              <p><b className="overview">Overview: </b>{movieDetails.overview}</p>
              <p><b className="genres">Genres: </b>{movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
            </span>
          </div>
        </div>
      )}

      <div>
        <h2>Additional Information</h2>
        <ul className="list">
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet>
        <Cast />
        <Reviews />
      </Outlet>
    </div>
  );
}

export default MovieDetails;
