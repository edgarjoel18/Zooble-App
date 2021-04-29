import axios from "axios";
import {React, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBar.module.css'

function NavBarRight({appUser, updateLoginState}) {
  const history = useHistory();

  function logoutHandler(){
    axios.get("/logout").then((response) =>{
      console.log(response.data.loggedIn);
      console.log(response.data.user);
      updateLoginState(response.data.loggedIn,response.data.user);
    })
    .catch((err) =>{
      console.log(err);
    });
    console.log("App User after Logout:", appUser);
    history.push('/');
  }

  useEffect(() =>{
    console.log('AppUser in NavbarRight changed to: ', appUser)
  },[appUser])
  
  return (
        <>
        {!appUser && <button className={styles["login-link"]} onClick={()=>history.push("/login-page")}>Login</button>}
        {appUser && <NavLink to="/Messages" className={styles["messages-menu"]}>Messages</NavLink>}
        {appUser &&<span className="account-menu-dropdown">
          <button className={styles["account-menu-dropdown-button"]}>Account</button>
          <ul className={styles["account-menu-dropdown-content"]}>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Profile">My Profile</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/MyPets">My Pets</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/" onClick={logoutHandler}>Logout</NavLink></li>
          </ul>
        </span>}
        </>
  );
}


export default NavBarRight;