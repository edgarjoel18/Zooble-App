import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './HeroContainer.module.css';

//Import components
import CallToActionButton from '../Buttons/CallToActionButton'

//Import Images
import DogOwnerImage from '../../images/Third Party Images/undraw_Modern_woman_lxh7 1.svg'
import CatOwnerImage from '../../images/Third Party Images/undraw_chilling_8tii 1.svg'

function HeroContainer() {

  const [text, setText] = useState('Find a Friend');


  function onMouseover(e) {
    setText('Coming Soon');
  }

  function onMouseout(e) {
    setText('Find a Friend');
  }

  return (
    <div className={styles['hero-container']}>
      <div className={styles['left-side']}>
        {/* <img className={styles['left-side-cat']} src={CatOwnerImage}/>  */}
        <img className={styles['left-side-dog']} src={DogOwnerImage} />
      </div>
      <div className={styles['right-side']}>

        <div className={styles['right-side-text']}><h1>The Social Network for your furry (or not so furry) friends</h1></div>
        <div className={styles['right-side-subtext']}><h2>Sign Up or Search for a Pet to Get Started</h2></div>
        <div className={styles['button-container']}>
          <NavLink to="/account-type">
            <button className={styles['signup-button']}><span><h3>Sign Up</h3></span></button>
          </NavLink>
          <button className={styles['find-friend-button']} onMouseEnter={onMouseover} onMouseLeave={onMouseout}>
            <span><h3>{text}</h3></span>
          </button>
          {/* <img className={styles['right-side-dog']} src={DogOwnerImage}/> */}
        </div>
      </div>
    </div>
  );
}

export default HeroContainer;