import {useEffect} from 'react'
import SearchBar from '../Search/SearchBar'
import NavBarLeft from '../Nav/NavBarLeft'
import NavBarRight from '../Nav/NavBarRight'
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css'

function NavBar({appUser, updateLoginState}) {
    console.log(appUser);
    useEffect(() => {
        console.log('AppUser in Navbar changed to: ', appUser)
    }, [appUser])
    
    return (
        <div className={styles["navbar"]}>
            <NavBarLeft appUser={appUser}/>
            <SearchBar/>
            <NavBarRight appUser={appUser} updateLoginState={updateLoginState}/>
        </div>
    )
}

export default NavBar;
