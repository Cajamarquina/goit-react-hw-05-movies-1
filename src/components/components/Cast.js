import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../API';

export async function fetchMovieCast(movieId) {
  try {
    const response = await getMovieCast(movieId);
    return response.cast;
  } catch (error) {
    console.error('Error fetching cast information: ', error);
    return [];
  }
}

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  useEffect(() => {
    async function fetchCast() {
      const castData = await fetchMovieCast(movieId);
      setCast(castData);
    }
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast Information</h2>
      <ul className="actor-list list">
        {(cast || []).map((actor) => (
          <li className="actor-item" key={actor.id}> 
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${actor.profile_path}` : defaultImg}
              alt={actor.name}
              style={{ maxWidth: '250px' }}
            />
            <p><b>{actor.name}</b></p>
            {actor.character && <p>as {actor.character}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

Cast.propTypes = {
  cast: PropTypes.array, 
};

export default Cast;
