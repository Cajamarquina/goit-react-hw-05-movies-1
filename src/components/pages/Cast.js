import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMovieCast } from '../API';

function Cast({ match }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        const response = await getMovieCast(match.params.movieId);
        setCast(response.cast);
      } catch (error) {
        console.error('Error fetching cast information: ', error);
      }
    }
    fetchMovieCast();
  }, [match.params.movieId]);

  return (
    <div>
      <h1>Cast Information</h1>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
}

Cast.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Cast;
