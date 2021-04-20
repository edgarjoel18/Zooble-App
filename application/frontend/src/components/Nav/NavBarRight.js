import {React, useState} from "react";
import {NavLink} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBar.module.css'

function NavBarRight({appUser}) {
  return (
        <>
        {(appUser) &&<NavLink className={styles["login-link"]} to="/login-page">Login</NavLink>}
        {(!appUser) &&<NavLink to="/Messages" className={styles["messages-menu"]}/>}
        {(!appUser) && <span className="account-menu-dropdown">
          <button className={styles["account-menu-dropdown-button"]}/>
          <ul className={styles["account-menu-dropdown-content"]}>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Profile">My Profile</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/MyPets">My Pets</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Logout">Logout</NavLink></li>
          </ul>
        </span>}
        </>
  );
}

export default NavBarRight;