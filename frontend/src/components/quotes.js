
import React, { useState, useEffect } from 'react';
import './quotes.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quote() {
  const [quote, setQuote] = useState('');
  const [index, setIndex] = useState(0);
  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const[auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001')
          .then(res => {
            if (res.status === 200) {
              if (res.data.Status === "Success") {
                setAuth(true);
              } else {
                setAuth(false);
                setMessage(res.data.Error);
              }
            } else {
              setAuth(false);
              setMessage('An error occurred. Please try again.');
            }
          })
          .catch(err => {
            console.log(err);
            setAuth(false);
            setMessage('An error occurred. Please try again.');
          });
      }, []);

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
        <div>
          {auth ? (
          <div>
            <h2 style={{ color: '#ff6b81', textAlign: 'center', marginTop: '-5rem' }}>Random Quote Generator</h2>
            <div className="container">
              {quote && (
                <div className="quote-container">
                  <p className="quote-text">{quote}</p>
                  <button1  onClick={getNextQuote}>Click me to get Next Quote</button1>
                </div>
              )}
            </div>
          </div>

          ) : (
            <div className='content-overlay1'>
            <h3>{message}</h3>
            <br />
            <h3>Login Now to view Unwind.</h3>
            <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
      )}

        </div>
      );
    }


export default Quote; 