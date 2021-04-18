import {React, useState} from "react";
import {NavLink} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBarRight.module.css'

function NavBarRight() {
  return (
    <span className={styles["navbar-right"]}>
       {/* <img className={styles["parrot-img"]} src={parrotPng}/> */}
        {/* <NavLink className={styles["login-link"]} to="/login-page"><h2>Login</h2></NavLink> */}
        <a href="/Messages" className={styles["messages-menu"]}>Messages</a>
        <span className="account-menu-dropdown">
          <button className={styles["account-menu-dropdown-button"]}>Account</button>
          <ul className={styles["account-menu-dropdown-content"]}>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Profile">My Profile</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Pets">My Pets</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Logout">Logout</NavLink></li>
          </ul>
        </span>
    </span>
  );
}

export default NavBarRight;