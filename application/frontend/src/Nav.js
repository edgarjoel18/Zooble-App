import React from 'react'
import { NavLink } from 'react-router-dom';

import "./App.css"

function Nav() {
    return (
        <div>
            <NavLink className="nav-link" to="/" >Home</NavLink>
            <NavLink className="nav-link" to="/Edgar" >Edgar</NavLink>
            <NavLink className="nav-link" to="/Daniel" >Daniel</NavLink>
            <NavLink className="nav-link" to="/Em" >Em</NavLink>
            <NavLink className="nav-link" to="/Sabrina" >Sabrina</NavLink>
            <NavLink className="nav-link" to="/Wenjie" >Wenjie</NavLink>
        </div>
    )
}

export default Nav
