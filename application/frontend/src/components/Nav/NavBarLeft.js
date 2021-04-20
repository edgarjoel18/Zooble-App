import React from "react";
import { NavLink } from "react-router-dom";

import LogoPng from '../../images/Created Icons/Logo.png';

import styles from './NavBar.module.css'

function NavBarLeft() {
  return (
    <span  className={styles["navbar-left"]}>
      <NavLink to="/">
        <img className={styles["logo-img"]} src={LogoPng}/>
      </NavLink>
    </span>
  );
}

export default NavBarLeft;