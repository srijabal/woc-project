import React from 'react';
import './landing.css';
import Navigation from './navbar';

const LandingPage = () => {
    return (
        <div>
            <Navigation />
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

                </section>
                <footer className="footer">
                    <h4>&copy;StudyAce </h4>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;

