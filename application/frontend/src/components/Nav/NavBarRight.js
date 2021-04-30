import axios from "axios";
import {useRef, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import parrotPng from '../../images/parrot.png';
import DropdownArrow from '../../images/Created Icons/Arrow.svg';

import styles from './NavBar.module.css'

let useClickOutside = (handler) =>{
  let domNode = useRef();

  useEffect(() =>{
    let maybeHandler = (event)=>{
      if(domNode){
        if(domNode.current && !domNode.current.contains(event.target)){
          handler();
        }
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

  const [accountMenuDisplay, setAccountMenuDisplay] = useState({display: 'none'});

  function logoutHandler(){
    axios.get("/api/logout").then((response) =>{
      console.log(response.data.loggedIn);
      console.log(response.data.user);
      updateLoginState(response.data.loggedIn,response.data.user);
      console.log("App User after Logout:", appUser);
      history.push('/');
    })
    .catch((err) =>{
      console.log(err);
    });

  }

  function accountMenuToggle(){
    if(accountMenuDisplay =={display:'block'}){
      setAccountMenuDisplay({display: 'none'});
    }
    else{
      setAccountMenuDisplay({display: 'block'});
    }
    
  }

  // useEffect(() =>{
  //   console.log('AppUser in NavbarRight changed to: ', appUser)
  // },[appUser])

  let domNode = useClickOutside(()=>{
    setAccountMenuDisplay({display: 'none'})
  })

  return (
        <>
        {!appUser && <button className={styles["login-link"]} onClick={()=>history.push("/login-page")}>Login</button>}
        {appUser && <NavLink to="/Messages" className={styles["messages-menu"]}>Messages</NavLink>}
        {appUser &&<span ref={domNode} className="account-menu-dropdown">
          <button className={styles["account-menu-dropdown-button"]} onClick={accountMenuToggle}>Account<img className={styles["account-menu-dropdown-arrow"]} src={DropdownArrow}/></button>
          <ul  className={styles["account-menu-dropdown-content"]} style={ accountMenuDisplay}>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/Profile">My Profile</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/MyPets">My Pets</NavLink></li>
            <li><NavLink className={styles["account-menu-dropdown-link"]} to="/" onClick={logoutHandler}>Logout</NavLink></li>
          </ul>
        </span>}
        </>
  );
}


export default NavBarRight;