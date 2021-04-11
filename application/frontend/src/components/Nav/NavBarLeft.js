import React from "react";
import { NavLink } from "react-router-dom";

import LogoPng from '../../images/ZoobleLogo.png';

function NavBarLeft() {
  return (
    <span  className="navbar-left">
      <NavLink to="/">
        <img className="logo-img" src={LogoPng}/>
      </NavLink>
    </span>
  );
}

export default NavBarLeft;