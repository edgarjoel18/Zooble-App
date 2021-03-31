import React, {useEffect} from "react";
import Axios from "axios";
import { NavLink } from 'react-router-dom';

function SearchBar() {
  
  const onClickHandler = (e) =>{
    Axios.get('/search-results').then(response =>{
      console.log(response.data)
    })
  }

  return (
    <span className="navbar-searchbar">
      Searchbar
      <button onClick={onClickHandler}>Search</button>
    </span>
  );
}

export default SearchBar;