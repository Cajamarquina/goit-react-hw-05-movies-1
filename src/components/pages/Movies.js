import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchMovies } from '../API';
import { Outlet } from 'react-router-dom';
import MoviesList from '../components/MoviesList';

function Movies({ setSearchResults }) {
  const [keyword, setKeyword] = useState('');
  const [searchResultsData, setSearchResultsData] = useState([]);

  useEffect(() => {
    const storedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    if (storedSearchResults) {
      setSearchResultsData(storedSearchResults);
      setSearchResults(storedSearchResults);
    } else {
      setSearchResultsData([]);
      setSearchResults([]);
    }
  }, [setSearchResults]);

  const handleSearch = async () => {
    try {
      const response = await searchMovies(keyword);

      localStorage.setItem('searchResults', JSON.stringify(response.results));

      setSearchResultsData(response.results);
      setSearchResults(response.results);
    } catch (error) {
      console.error('Error searching movies: ', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResultsData.length > 0 ? (
        <div>
          <h2>Results</h2>
          <ul className="movies-list">
            {searchResultsData.map((movie) => (
              <MoviesList key={movie.id} movie={movie} isFromMovies={true}/> 
            ))}
          </ul>
          <Outlet />
        </div>
      ) : (
        <p>No results were found</p>
      )}
    </div>
  );
}

Movies.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Movies;
