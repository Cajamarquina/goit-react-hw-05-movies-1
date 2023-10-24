import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../API';
import { useParams } from 'react-router-dom';

function Movies() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (movieId) {
      async function fetchMovie() {
        try {
          const response = await getMovieDetails(movieId);
          setMovieDetails(response);
        } catch (error) {
          console.error('Error fetching movie details: ', error);
        }
      }

      fetchMovie();
    }
  }, [movieId]);

  return (
    <div>
      {movieDetails && (
        <div>
          <h2>Movie Details</h2>
          <p>Title: {movieDetails.title}</p>
          <p>Overview: {movieDetails.overview}</p>
        </div>
      )}
    </div>
  );
}

export default Movies;

