import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }
  , []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#6DA4AA" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Study ACE
          </Typography>
          {
            isLoggedIn ?
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            : 
            <>  
            <a href='/login'>
            <Button color="inherit">Login</Button>
            </a>
            <a href='/register'>
            <Button color="inherit">Register</Button>
            </a>
            </>
          }
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;