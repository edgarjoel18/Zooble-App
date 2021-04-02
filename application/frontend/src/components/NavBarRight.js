import React from "react";
import {NavLink} from "react-router-dom";

function NavBarRight() {
  return (
    <span className="navbar-right">
        <NavLink to="/login-page">Login</NavLink>
    </span>
  );
}

export default NavBarRight;