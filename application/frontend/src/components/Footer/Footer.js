import React from "react";
import {NavLink} from "react-router-dom";

import styles from "./Footer.module.css";

function Footer() {
  
  return (
    <div className={styles["footer"]}>
        <div className={styles["our-team-footer"]}>Our Team<br/>
          <NavLink className={styles["nav-link"]} to="/Edgar" >Edgar</NavLink>
          <NavLink className={styles["nav-link"]} to="/Daniel" >Daniel</NavLink>
          <NavLink className={styles["nav-link"]} to="/Em" >Em</NavLink>
          <NavLink className={styles["nav-link"]} to="/Sabrina" >Sabrina</NavLink>
          <NavLink className={styles["nav-link"]} to="/Wenjie" >Wenjie</NavLink>
          <NavLink className={styles["nav-link"]} to="/Cameron" > Cameron</NavLink>
          <NavLink className={styles["nav-link"]} to="/Wameedh" > Wameedh</NavLink>
        </div>
    </div>
  );
}

export default Footer;