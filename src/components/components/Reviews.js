import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../API';

export async function fetchMovieReviews(movieId) {
  try {
    const response = await getMovieReviews(movieId);
    return response.results;
  } catch (error) {
    console.error('Error fetching reviews: ', error);
    return [];
  }
}

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData);
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Movie Reviews</h2>
      <ul className="review-list list">
        {(reviews || []).map((review) => (
          <li className="review-item" key={review.id}>
            <p><b>Author: </b>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
      {(reviews || []).length === 0 && <p>We don't have any reviews for this movie.</p>}
    </div>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
