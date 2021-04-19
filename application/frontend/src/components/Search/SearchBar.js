import React, {useEffect, useLayoutEffect, useState} from "react";
import {Link, Switch, Route, Redirect} from "react-router-dom";
import Axios from "axios";

import styles from './SearchBar.module.css'

//components
import Modal from '../Modals/Modal.js'
import MapSearch from "../../pages/MapSearch/MapSearch";





// componentWillMount() and componentWillUnmount() functions work toghther
// to unable and disable scrolling on the main page

// change the scroll bar behavior when component mount  

  
// change the scroll bar behavior when component unmount  



function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState('Pets');
  const [overlayDisplay, setOverlayDisplay] = useState(false);
  const [recievedSearchResults, setRecievedSearchResults] = useState([]);

  useEffect(()=>{
    console.log('useEffect');
    if(overlayDisplay){
      console.log('modal open')
      document.body.style.overflow = "hidden";
    }
    else{
      console.log('modal closed')
      document.body.style.overflow = "auto";
    }
  },[overlayDisplay])

  function OnClickHandler(e){
  //   Axios.get('/search', {
  //     params: {
  //       searchTerm: searchTerm,
  //       searchCategory:searchCategory}})
  //     .then(response =>{
  //     // console.log(response)
  //     // console.log(response.data)
  //     // console.log(response.data.searchResults)
  //     setRecievedSearchResults(response.data.searchResults)
  //     // setOverlayDisplay(true);
  //     console.log(recievedSearchResults)
  //   })
  //   .catch(error =>{
  //     console.log("Error");
  //   })
  }

  const overlayStyle = {display: overlayDisplay};

  return (
    <>
      <div className={styles["searchbar"]}>
      <span className={styles["search-category-dropdown"]}>
        <select name="search-category" id="search-category" onChange= {e => setSearchCategory(e.target.value)}>
          <option value="Pets">Pets</option>
          <option value="Businesses">Businesses</option>
          <option value="Shelters">Shelters</option>
          {/* <option value="Users">Users</option>   need to add db user entities to implement this*/}
        </select>
      </span>   
      <span className={styles["searchbar-input"]}>
        {searchCategory=="Users" &&  <input type="text" placeholder= {"Search " + searchCategory.toLowerCase()} onChange={e => setSearchTerm(e.target.value)} 
        onKeyPress={event => {
          if (event.key === 'Enter') {
            OnClickHandler();
          }
        }}
        />}
        {searchCategory != "Users" && <input type="text" placeholder= {"Search " + searchCategory.toLowerCase() + " near you"} onChange={e => setSearchTerm(e.target.value)} 
        onKeyPress={event => {
          if (event.key === 'Enter') {
            OnClickHandler();
          }
        }}
        />}
      </span>

      
      <Link className={styles["searchbar-search"]}
            to={
              {pathname:"/MapSearch",
              state:{searchCategoryParam: searchCategory,
                     searchTermParam: searchTerm}}
            }
      />
      {/* <button onClick={OnClickHandler} ></button> */}
      </div>
  </>
  );
}

export default SearchBar;

// {searchResult.age_name} {searchResult.size_name}
// {searchResult.reg_business_id} {searchResult.reg_user_id}
// {searchResult.reg_shelter_id} {searchResult.reg_user_id}

/*<div style={overlayStyle} className={styles["search-results-overlay"]}>
<div className ={styles["modal-main"]}>
  Search Results
  <ul>
    {recievedSearchResults.length == 0 && <li>No Results</li>}
    {recievedSearchResults && searchCategory == 'Pet' &&
     recievedSearchResults.map((searchResult) => (
        <li key={searchResult.pet_id}><div class="clearfix"><img /><span>Name: {searchResult.name}<br></br>Age: {searchResult.age_name}<br></br>Size: {searchResult.size_name}</span></div></li>
        
    ))}
    {recievedSearchResults && searchCategory == 'Business' &&
     recievedSearchResults.map((searchResult) => (
        <li key={searchResult.pet_id}><div class="clearfix"><img /><span>{searchResult.name}</span></div></li>
    ))}
    {recievedSearchResults && searchCategory == 'Shelter' &&
     recievedSearchResults.map((searchResult) => (
        <li key={searchResult.pet_id}><div class="clearfix"><img/><span>{searchResult.name}</span></div></li>
    ))}

  </ul>
  <div className={styles["center"]}>
  <button onClick= {() => {
                setOverlayDisplay('none');
                componentWillUnmount();
                }} className={styles["overlay-button"]}>Close</button>
  </div>
  </div>
</div>*/

//<br></br>Age: {searchResult.age_name}<br></br>Size: {searchResult.size_name}