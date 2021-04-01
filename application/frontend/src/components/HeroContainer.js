import React from "react";
import './HeroContainer.css';

function HeroContainer() {
  return (
    <div className='hero-container'>
      <div className='left-side'> 
        <img className='left-side-img'/> 
      </div>
      <div className='right-side'>
        <p className='right-side-text'>The Social Network for furry (or not so furry) friends</p>
        <div id='button-container'>
          <button className='signup-button'>
            <span>Sign Up</span>
          </button>
          <button className='find-Friend-button'>
            <span>Find a Friend</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroContainer;