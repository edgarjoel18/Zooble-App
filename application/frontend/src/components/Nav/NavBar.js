import React from 'react'
import SearchBar from '../Search/SearchBar'
import NavBarLeft from '../Nav/NavBarLeft'
import NavBarRight from '../Nav/NavBarRight'
import { NavLink } from 'react-router-dom';

import './NavBar.css'

function NavBar() {
    return (
        <div className="navbar">
            <NavBarLeft />
            <SearchBar/>
            <NavBarRight/>
        </div>
    )
}

export default NavBar;
