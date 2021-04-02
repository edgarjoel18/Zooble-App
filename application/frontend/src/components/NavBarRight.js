import React from "react";

function NavBarRight() {
  return (
    <span 
      className="navbar-right" 
      onClick={() => 
        alert('Welcome to Zooble!\nPlease wait for the future updates\nThank you!')
      }
    >
        Login
    </span>
  );
}

export default NavBarRight;