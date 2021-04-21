import React from 'react'
import SearchBar from '../Search/SearchBar'
import NavBarLeft from '../Nav/NavBarLeft'
import NavBarRight from '../Nav/NavBarRight'
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css'

function NavBar({appUser, setAppUser}) {
    return (
        <div className={styles["navbar"]}>
            <NavBarLeft />
            <SearchBar/>
            <NavBarRight appUser={appUser} setAppUser={setAppUser}/>
        </div>
    )
}

export default NavBar;
