import React, { useState, useEffect } from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import Search from './search'; // Import the Search component
import axios from 'axios';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardActions } from '@mui/material';

function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}



const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return (
    <div className='lp-container' style={{ backgroundImage: 'url("/bg.jpg")', backgroundSize: 'cover' }}>
        <Navbar/>
      <div className='lp'>
          <div className="landing-container">
            <header className="header">
              <h1>Welcome to StudyAce</h1>
              <h4>Where Excellence is the Norm and Productivity is the Key</h4>
            </header>

          {
            isLoggedIn ? <section className='features' >
              <MultiActionAreaCard title={"User Profile"} desc={"Todo Lists, Progress Tracker, Import Youtube playlists"}/>
              <MultiActionAreaCard title={"Relaxation Corner"} desc={"Soothing music, Inhalation Exhalation gif, Dark/Light Mode, Quotes Generator"}/>
              <MultiActionAreaCard title={"AI problem solver"} desc={"Search for your doubts and find all the answers you need"}/>
              <MultiActionAreaCard title={"JEE and NEET Community"} desc={"Connect with like-minded peers and gain more knowledge"}/>
            </section>
            : null}
              <br />
            { <footer className="footer" style={{marginTop: "25rem", position: 'bottom'}}>
              <h4>&copy;StudyAce </h4>
            </footer> }
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
