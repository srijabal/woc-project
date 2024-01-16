import React, { useState, useEffect } from 'react';
import './quotes.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Quotes() {
  const [quote, setQuote] = useState('');
  const [index, setIndex] = useState(0);
  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const[auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    axios.defaults.withCredentials = true;

    

  async function fetchQuotes() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotesList(data);
      setQuote(data[index].text);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  }

  function getNextQuote() {
    try {
      setIndex(prevIndex => (prevIndex + 1) % quotesList.length);
      setQuote(quotesList[index].text);
    } catch (error) {
      console.error('Error getting next quote:', error);
    }
  }

      return (
        <>
        <Navbar />
          <div style={{display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: '#3a9b96'}}>Random Quote Generator</h2>
            <div className="container">
              {quote && (
                <div className="quote-container">
                  <p className="quote-text">{quote}</p>
                  <div onClick={getNextQuote} className="button1">Click me to get Next Quote</div>
                </div>
              )}
            </div>
            </div>
        </>
      );
    }


export default Quotes; 