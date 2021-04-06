import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './HeroContainer.css';

import CatDogHero from '../images/cat_dog_image.png'

function HeroContainer() {

  const [text, setText] = useState('Find a Friend');


  function onMouseover(e){
    setText('Coming Soon');
  }

  function onMouseout(e){
    setText('Find a Friend');
  }

  return (
    <div className='hero-container'>
      <div className='left-side'> 
        {/* <div><img src={CatDogHero}></img></div> */}
      </div>
      <div className='right-side'>
        <div className='right-side-text'>The Social Network for your furry (or not so furry) friends</div>
        <div className='right-side-subtext'>Sign Up or Search for a Pet to Get Started</div>
        <div className='button-container'>
          <NavLink to="/signup-page">
          <button className='signup-button'><span>Sign Up</span></button>
          </NavLink>
          <button className='find-friend-button' onMouseEnter={onMouseover} onMouseLeave={onMouseout}>
           <span>{text}</span> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroContainer;