import React, { useState } from 'react';
import { GoogleSearch } from './googlesearch'; 
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const result = await GoogleSearch(searchTerm);
      setSearchResults(result.items);
      setError(null);
    } catch (err) {
      console.error('Error searching:', err);
      setSearchResults(null);
      setError('An error occurred during the search. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {searchResults && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
