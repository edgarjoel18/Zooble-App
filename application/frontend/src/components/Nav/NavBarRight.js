import React from "react";
import {NavLink} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBar.module.css'

function NavBarRight() {
  return (
    <span className={styles["navbar-right"]}>
       {/* <img className={styles["parrot-img"]} src={parrotPng}/> */}
        <NavLink to="/login-page">Login</NavLink>
    </span>
  );
}

export default NavBarRight;