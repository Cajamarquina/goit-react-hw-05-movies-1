import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { searchMovies } from '../API';
import { Link } from 'react-router-dom';

function Movies({ setSearchResults }) {
  const [keyword, setKeyword] = useState('');
  const [searchResultsData, setSearchResultsData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchMovies(keyword);
      setSearchResultsData(response.results);
      setSearchResults(response.results);
    } catch (error) {
      console.error('Error searching movies: ', error);
    }
  }

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResultsData.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul className="movies-list">
            {searchResultsData.map((movie) => (
              <li className="movie-item" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <p className="movie-title">{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Movies.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Movies;
