import React from "react";
import './HeroContainer.css';

function HeroContainer() {
  return (
    <div className='hero-container'>
      <div className='left-side'> 
        <div>Hero Image</div>
      </div>
      <div className='right-side'>
        <div className='right-side-text'>The Social Network for furry (or not so furry) friends</div>
        <div className='button-container'>
          <button 
          className='signup-button'
          onClick={() => 
            alert('Welcome to Zooble!\nPlease wait for the future updates\nThank you!')
          }
          >
            <span>Sign Up</span>
          </button>
          <button 
          className='find-friend-button'
          onClick={() => 
            alert('Welcome to Zooble!\nPlease wait for the future updates\nThank you!')
          }
          >
            <span>Find a Friend</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroContainer;