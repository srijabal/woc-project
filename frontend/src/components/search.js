import React, { useState } from 'react';
import { GoogleSearch } from './googlesearch';
import Navbar from './Navbar';
import './search.css';
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
    <Navbar/>
    <h1 style={{ textAlign: 'center', color: '#3a9b96' , fontSize:'3.5rem'}}>Problem Solver</h1>

    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {error && <p className="error-message">{error}</p>}
      {searchResults && (
        <div>
          <h1 style={{ textAlign: 'center', color: '#000' , fontSize:'2rem'}}>Here are your search Results</h1>
          <ul className="search-results">
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
  </div>
);
};

export default Search;
