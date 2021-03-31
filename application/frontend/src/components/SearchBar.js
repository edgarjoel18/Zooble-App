import React, {useEffect, useState} from "react";
import Axios from "axios";
import { NavLink } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState('');
  
  const onClickHandler = (e) =>{
    Axios.get('/search-results',{params: {searchTerm}}).then(response =>{
      console.log(response.data.searchResults)
    })
  }

  return (
    <span className="navbar-searchbar">
      {searchTerm}
      <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={onClickHandler} >Search</button>
      {searchResults}
    </span>
  );
}

export default SearchBar;