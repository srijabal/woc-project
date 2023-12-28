
import React from 'react';
import './breathe.css';

const BreatheAnimation = () => {
  return (
    <main>
    
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
        
      
    </main>
  );
};

export default BreatheAnimation;
