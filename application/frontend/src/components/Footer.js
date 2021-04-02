import React from "react";
import {NavLink} from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
        <div className="our-team-footer">Our Team<br/>
          <NavLink className="nav-link" to="/Edgar" >Edgar</NavLink>
          <NavLink className="nav-link" to="/Daniel" >Daniel</NavLink>
          <NavLink className="nav-link" to="/Em" >Em</NavLink>
          <NavLink className="nav-link" to="/Sabrina" >Sabrina</NavLink>
          <NavLink className="nav-link" to="/Wenjie" >Wenjie</NavLink>
          <NavLink className="nav-link" to="/Cameron" > Cameron</NavLink>
        </div>
    </div>
  );
}

export default Footer;