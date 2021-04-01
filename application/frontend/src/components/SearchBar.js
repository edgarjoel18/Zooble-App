import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useHistory } from 'react-router-dom';

import './SearchBar.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState('Pet');
  const [overlayDisplay, setOverlayDisplay] = useState('none');
  const [recievedSearchResults, setRecievedSearchResults] = useState([])
  
  function OnClickHandler(e){
    Axios.get('/search',{
      params: {
        searchTerm: searchTerm,
        searchCategory:searchCategory}})
      .then(response =>{
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
    <div className="search_and_search_results_container">
      <span className="search-category-dropdown">
        <select name="search-category" id="search-category" onChange= {e => setSearchCategory(e.target.value)}>
          <option value="Pet">Pets</option>
          <option value="Business">Businesses</option>
          <option value="Shelter">Shelters</option>
        </select>
      </span>
      <span className="navbar-searchbar">
        <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={OnClickHandler} >Search</button>
      </span>
      <div style={overlayStyle} className="search-results-overlay">
        <div className = "modal-main">

        <ul>
          {recievedSearchResults && searchCategory == 'Pet' &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}>{searchResult.name} {searchResult.age_name} {searchResult.size_name}</li>
              
          ))}
          {recievedSearchResults && searchCategory == 'Business' &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}>{searchResult.name} {searchResult.reg_business_id} {searchResult.reg_user_id}</li>
          ))}
          {recievedSearchResults && searchCategory == 'Shelter' &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}>{searchResult.name} {searchResult.reg_shelter_id} {searchResult.reg_user_id}</li>
          ))}

        </ul>
        <div className="center">
        <button onClick= {() => {
                      setOverlayDisplay('none');
                      }} className="overlay-button">Close</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;