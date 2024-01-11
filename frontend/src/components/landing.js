import React,  { useState, useEffect } from 'react';
import './landing.css';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './navbar';
import axios from 'axios';

const LandingPage = () => {

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

      const handleDelete = () => {
        axios.get('http://localhost:3001/logout')
          .then(res => {
            window.location.replace('http://localhost:3000');
          })
          .catch(err => console.log(err));
      };

    return (
        <div className='lp-container' style={{ backgroundImage: 'url("/bg.jpg")', backgroundSize: 'cover' }}>
        
            <div className='lp' >
                <Navigation />
                {auth ? (
                    <div className="landing-container">
                    <header className="header">
                        <h1>Welcome to StudyAce</h1>
                        <h4>Where Excellence is the Norm and Productivity is the Key</h4>
                    </header>

                    <section className='features'>
                        <div className="feature-box">
                            <h3>User Profile</h3>
                            <p>Todo Lists, Progress Tracker, Create Notes, Import Youtube playlists</p>
                        </div>
                        <div className="feature-box">
                            <h3>AI problem solver</h3>
                        </div>
                        <div className="feature-box">
                            <h3>Relaxation Corner</h3>
                            <p>Soothing music, Inhalation Exhalation gif, Dark/Light Mode, Quotes Generator</p>
                        </div>
                        <div className="feature-box">
                            <h3>JEE and NEET Student Community</h3>
                        </div>
                        <br />
                        <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
                    </section>

                    <footer className="footer">
                        <h4>&copy;StudyAce </h4>
                    </footer>
                </div>

                ) : (
                <div className='content-overlay1'>
                    <h3>{message}</h3>
                    <br />
                    <h3>Login</h3>
                    <Link to="/" className='btn btn-primary'>Login</Link>
                </div>
            )}
                
            </div>
        </div>
    );
};

export default LandingPage;

