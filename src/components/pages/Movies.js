import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { searchMovies } from '../API';

function Movies({ searchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await searchMovies(searchTerm);
      searchResults(response.results); 
    } catch (error) {
      console.error('Error searching movies: ', error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

Movies.propTypes = {
  searchResults: PropTypes.func.isRequired,
};

export default Movies;
