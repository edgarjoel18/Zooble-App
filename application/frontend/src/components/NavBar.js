import React from 'react'
import SearchBar from './SearchBar'
import NavBarLeft from './NavBarLeft'
import NavBarRight from './NavBarRight'

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
