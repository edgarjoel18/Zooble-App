import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useHistory } from 'react-router-dom';

import './SearchBar.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [overlayDisplay, setOverlayDisplay] = useState('none');
  const [recievedSearchResults, setRecievedSearchResults] = useState([])
  
  function OnClickHandler(e){
    Axios.get('/search',{params: {searchTerm}}).then(response =>{
      // console.log(response)
      // console.log(response.data)
      // console.log(response.data.searchResults)
      setOverlayDisplay('block');
      setRecievedSearchResults(response.data.searchResults)
      console.log(recievedSearchResults)
    })
  }

  const overlayStyle = {display: overlayDisplay};

  return (
    <div>
      <span className="navbar-searchbar">
        {searchTerm}
        <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={OnClickHandler} >Search</button>
      </span>
      <div style={overlayStyle} className="search-results-overlay">
        <ul>
          {recievedSearchResults &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}>{searchResult.name}</li>
          ))}
        </ul>
        <button onClick= {() => {
                      setOverlayDisplay('none');
                      }} className="overlay-button">Close</button>
      </div>
    </div>
  );
}

export default SearchBar;