import React from "react";
import {NavLink} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBar.module.css'

function NavBarRight() {
  return (
    <span className={styles["navbar-right"]}>
       {/* <img className={styles["parrot-img"]} src={parrotPng}/> */}
        <NavLink className={styles["login-link"]} to="/login-page"><h2>Login</h2></NavLink>
    </span>
  );
}

export default NavBarRight;