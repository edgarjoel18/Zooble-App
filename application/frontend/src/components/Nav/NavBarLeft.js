import React from "react";
import { NavLink } from "react-router-dom";

import LogoPng from '../../images/Created Icons/LogoScript.png';

import styles from './NavBar.module.css'

function NavBarLeft({appUser}) {
  return (
    <span  className={styles["navbar-left"]}>
      {!appUser && <NavLink to="/">
        <img className={styles["logo-img"]} src={LogoPng}/>
      </NavLink>
      }
      {appUser && <NavLink to="/Feed">
        <img className={styles["logo-img-inactive"]} src={LogoPng}/>
      </NavLink>
      }
    </span>
  );
}

export default NavBarLeft;