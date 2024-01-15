
import React from 'react';
import './breathe.css';
import Navbar from './Navbar';

const BreatheAnimation = () => {
  return (
    <>
    <Navbar/>
   
            <h2 style={{ color: '#3a9b96',display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'center' }}>Inhalation-Exhalation gif</h2>
    <div className='breathe'>
      <div className='background'></div>
      <div className="wrapper">
        <div className="circle"></div>
        <p className="breathing-text in">Breathe In</p>
        <p className="breathing-text out">Breathe Out</p>
      </div>

      
        <div className="message">
          Breathe in through the nose as the circle expands <br />
          Hold, and release through the mouth as it contracts.
        </div>
        
      
    </div>
    </>
  );
};

export default BreatheAnimation;
