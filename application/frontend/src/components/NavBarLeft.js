import React from "react";
import { NavLink } from "react-router-dom";

import LogoJpg from '../images/ZoobleLogo.jpg'

function NavBarLeft() {
  return (
    <span  className="navbar-left">
      <NavLink to="/">
        <img className="logo-img" src={LogoJpg}/>
      </NavLink>
    </span>
  );
}

export default NavBarLeft;