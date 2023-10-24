import React, { useEffect, useState } from 'react';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../API';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const location = useLocation();
  const backLink = location.state?.from ?? '/';

  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);

        const castResponse = await getMovieCast(movieId);
        setCast(castResponse.cast);

        const reviewsResponse = await getMovieReviews(movieId);
        setReviews(reviewsResponse.results);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    }

    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <Link to={backLink}>
        <button className="go-back-button">
          <span className="arrow-icon">←</span> Go back
        </button>
      </Link>
      {movieDetails && (
        <div>
          <h2>{movieDetails.title}</h2>
          <img
            src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : defaultImg}
            alt="poster"
            className="movie-poster"
            style={{ maxWidth: '250px' }}
          />
          <p>User Score: {movieDetails.vote_average}</p>
          <p>Overview: {movieDetails.overview}</p>
          <p>Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
        
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

      <Outlet cast={cast} reviews={reviews} />
    </div>
  );
}

export default MovieDetails;