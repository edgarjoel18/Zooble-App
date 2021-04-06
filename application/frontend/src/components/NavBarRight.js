import React from "react";
import {NavLink} from "react-router-dom";
import parrotPng from '../images/parrot.png';

function NavBarRight() {
  return (
    <span className="navbar-right">
       <img className="parrot-img" src={parrotPng}/>
        <NavLink to="/login-page">Login</NavLink>
    </span>
  );
}

export default NavBarRight;