import React, { useEffect, useState, useRef } from 'react';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../API';
import { useParams, Link, Outlet, useLocation} from 'react-router-dom';

const GoBackBtn = () => {
  const location = useLocation();
  const previousPageRef = useRef(location.state?.from);

  return (
    <Link to={previousPageRef.current || '/'} className="go-back-button">
      <span className="arrow-icon">←</span> Go back
    </Link>
  );
};

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

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
      <GoBackBtn />
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
            <Link to="cast" onClick={() => setCastVisible(!castVisible)}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" onClick={() => setReviewsVisible(!reviewsVisible)}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      {castVisible && <Outlet cast={cast} />}
      {reviewsVisible && <Outlet reviews={reviews} />}
    </div>
  );
}

export default MovieDetails;
