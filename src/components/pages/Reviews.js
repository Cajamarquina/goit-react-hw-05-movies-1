import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMovieReviews } from '../API';

function Reviews({ match }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const response = await getMovieReviews(match.params.movieId);
        setReviews(response.results); 
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    }
    fetchMovieReviews();
  }, [match.params.movieId]);

  return (
    <div>
      <h1>Movie Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}

Reviews.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Reviews;