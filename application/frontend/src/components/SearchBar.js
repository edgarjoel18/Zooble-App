import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useHistory } from 'react-router-dom';

import './SearchBar.css'

// componentWillMount() and componentWillUnmount() functions work toghther
// to unable and disble srolling on the main page

// change the scroll bar behavior when component mount  
function componentWillMount() {
  document.body.style.overflow = "hidden";
};
// change the scroll bar behavior when component unmount  
function componentWillUnmount() {
  document.body.style.overflow = "auto"; // or restore the original value
};


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
    componentWillMount();
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
      
        <input type="text" placeholder= {"Search " + searchCategory.toLowerCase() + "s near you"} onChange={e => setSearchTerm(e.target.value)} 
        onKeyPress={event => {
          if (event.key === 'Enter') {
            OnClickHandler();
          }
        }}
        />

        <button onClick={OnClickHandler} ></button>
        
      </span>
      <div style={overlayStyle} className="search-results-overlay">
        <div className = "modal-main">
        Search Results
        <ul>
          {recievedSearchResults.length == 0 && <li>No Results</li>}
          {recievedSearchResults && searchCategory == 'Pet' &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}><div class="clearfix"><img src={searchResult.profile_pic}/><span>Name: {searchResult.name}<br></br>Age: {searchResult.age_name}<br></br>Size: {searchResult.size_name}</span></div></li>
              
          ))}
          {recievedSearchResults && searchCategory == 'Business' &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}><div class="clearfix"><img src={searchResult.profile_pic}/><span>{searchResult.name}</span></div></li>
          ))}
          {recievedSearchResults && searchCategory == 'Shelter' &&
           recievedSearchResults.map((searchResult) => (
              <li key={searchResult.pet_id}><div class="clearfix"><img src={searchResult.profile_pic}/><span>{searchResult.name}</span></div></li>
          ))}

        </ul>
        <div className="center">
        <button onClick= {() => {
                      setOverlayDisplay('none');
                      componentWillUnmount();
                      }} className="overlay-button">Close</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

// {searchResult.age_name} {searchResult.size_name}
// {searchResult.reg_business_id} {searchResult.reg_user_id}
// {searchResult.reg_shelter_id} {searchResult.reg_user_id}