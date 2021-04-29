import axios from "axios";
import {useRef, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import parrotPng from '../../images/parrot.png';

import styles from './NavBar.module.css'

let useClickOutside = (handler) =>{
  let domNode = useRef();

  useEffect(() =>{
    let maybeHandler = (event)=>{
      if(!domNode.current.contains(event.target)){
        handler();
      }
    }
  
    document.addEventListener("mousedown", maybeHandler);
  
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    }
  })

  return domNode
}

function NavBarRight({appUser, updateLoginState}) {
  const history = useHistory();

  const [accountMenuDisplay, setAccountMenuDisplay] = useState('none');

  function logoutHandler(){
    axios.get("/api/logout").then((response) =>{
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

  function accountMenuToggle(){
    if(accountMenuDisplay == 'block')
    {
      setAccountMenuDisplay('none');
    }
    else{
      setAccountMenuDisplay('block');
    }
  }

  // useEffect(() =>{
  //   console.log('AppUser in NavbarRight changed to: ', appUser)
  // },[appUser])

  let domNode = useClickOutside(()=>{
    setAccountMenuDisplay('none')
  })

  return (
        <>
        {!appUser && <button className={styles["login-link"]} onClick={()=>history.push("/login-page")}>Login</button>}
        {appUser && <NavLink to="/Messages" className={styles["messages-menu"]}>Messages</NavLink>}
        {appUser &&<span className="account-menu-dropdown">
          <button className={styles["account-menu-dropdown-button"]} onClick={accountMenuToggle}>Account</button>
          <ul ref={domNode} className={styles["account-menu-dropdown-content"]} style={{display: accountMenuDisplay}}>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Profile">My Profile</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/MyPets">My Pets</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/" onClick={logoutHandler}>Logout</NavLink></li>
          </ul>
        </span>}
        </>
  );
}


export default NavBarRight;