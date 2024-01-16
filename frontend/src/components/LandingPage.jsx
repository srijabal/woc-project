import React, { useState, useEffect } from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';


function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.desc.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && ' | '} 
              {item.link ? (
                <Link to={item.link}>{item.text}</Link>
              ) : (
                item.text
              )}
            </React.Fragment>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
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
    
    <div className='lp-container' style={{ backgroundImage: 'url("/bg.jpg")', backgroundSize: 'cover'}}>
      <Navbar />
        <div style={{
          flexGrow: 1,
          height: '80vh',
        }}>
          <header className="header">
            <h1>Welcome to StudyAce</h1>
            <h5>Where Excellence is the Norm and Productivity is the Key</h5>
          </header>
          {
            isLoggedIn ? (
              <section className='features' >
                <MultiActionAreaCard
                  title={"User Profile"}
                  desc={[
                    { text: "Create Todo Lists", link: "/todo" },
                    { text: "Import and Store Youtube Playlists", link: "/playlists" },
                  ]}
                  link="/user-profile"
                />
                
                <MultiActionAreaCard
                  title={"Relaxation Corner"}
                  desc={[
                    { text: "Soothing Music", link: "/music" },
                    { text: "Random Quotes Generator", link: "/quotes" },
                    { text: "Inhalation Exhalation gif", link: "/breathe" },
                  ]}
                  link="/user-profile"
                />
                <MultiActionAreaCard
                  title={"Problem Solver"}
                  desc={[
                    { text: "Search for your doubts and find all the answers you need", link:"/search" },
                  ]}
                  link="/user-profile"
                />
              </section>
            ) : null
          }
        </div>
          <footer className="footer" style={{
            width: '100%',
            textAlign: 'center',
          }}>
            <h4>&copy;StudyAce </h4>
          </footer>
    </div>
  );
};

export default LandingPage;

