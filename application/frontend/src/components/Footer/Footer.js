import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {

  return (
    <div className={styles["footer"]}>
      <div className={styles["our-team-footer"]}>Our Team<br />
        <NavLink className={styles["nav-link"]} to="/Edgar" >Edgar</NavLink>
        <NavLink className={styles["nav-link"]} to="/Daniel" >Daniel</NavLink>
        <NavLink className={styles["nav-link"]} to="/Em" >Em</NavLink>
        <NavLink className={styles["nav-link"]} to="/Sabrina" >Sabrina</NavLink>
        <NavLink className={styles["nav-link"]} to="/Wenjie" >Wenjie</NavLink>
        <NavLink className={styles["nav-link"]} to="/Cameron" > Cameron</NavLink>
        <NavLink className={styles["nav-link"]} to="/Wameedh" > Wameedh</NavLink>
      </div>
      <div className={styles['logos']}>
        <a href="https://www.linkedin.com/"><i className="fa fa-facebook"></i></a>
        <a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
        <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a>
        <a href=""><i className="fa fa-envelope"></i></a>
      </div>
      <div className={styles['terms-conditions']}>
        <a href="https://www.linkedin.com/"><i className="terms-of-use"></i>Terms of Use</a>
        <a><i></i>|</a>
        <a href="https://www.instagram.com/"><i className="privacy-policy"></i>Privacy Policy</a>
      </div>
    </div>
  );
}

export default Footer;