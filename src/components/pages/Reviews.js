import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../API';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const response = await getMovieReviews(movieId);
        setReviews(response.results);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h1>Movie Reviews</h1>
      <ul className="list">
        {reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
