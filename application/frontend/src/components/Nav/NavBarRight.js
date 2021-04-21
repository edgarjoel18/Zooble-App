import {React, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBar.module.css'

function NavBarRight({appUser,setAppUser}) {

  let[,setState]=useState();
  let history = useHistory();

  function navRefresh(){
    console.log('refreshing');
    setState({});
  }
  
  console.log("AppUser from NavBarRight: ", appUser);

  function logoutHandler(){
    setAppUser('null');
    console.log("App User after Logout:", appUser);
    navRefresh();
    history.push('/');
  }
  
  return (
        <>
        {!appUser && <NavLink className={styles["login-link"]} to="/login-page">Login</NavLink>}
        {appUser && <NavLink to="/Messages" className={styles["messages-menu"]}/>}
        {appUser &&<span className="account-menu-dropdown">
          <button className={styles["account-menu-dropdown-button"]}/>
          <ul className={styles["account-menu-dropdown-content"]}>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Profile">My Profile</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/MyPets">My Pets</NavLink></li>
            <li><button className={styles["account-menu-dropdown-link"]} to="/" onClick={logoutHandler}>Logout</button></li>
          </ul>
        </span>}
        </>
  );
}


export default NavBarRight;