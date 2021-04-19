import {React, useEffect, useState} from 'react'

import {Link} from "react-router-dom"

import Axios from "axios";

import styles from './MapSearch.module.css'

import DropdownIcon from '../../images/Created Icons/Dropdown.svg'

// import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';

function MapSearch(props) {
    let state = props.location.state;
    console.log("Search Category: " + state.searchCategoryParam);
    console.log("Search Term: " + state.searchTermParam);
    const[searchCategory, setSearchCategory] = useState(state.searchCategoryParam);
    const[searchTerm, setSearchTerm] = useState(state.searchTermParam);
    const[resultsSortOption, setResultsSortOption] = useState('');
    const[recievedSearchResults, setRecievedSearchResults] = useState([]);

    useEffect(()=>{
        console.log('useEffect');
        Axios.get('/search', {
            params: {
              searchTerm: state.searchTermParam,
              searchCategory:state.searchCategoryParam}})
            .then(response =>{
            // console.log(response)
            // console.log(response.data)
            // console.log(response.data.searchResults)
            setRecievedSearchResults(response.data.searchResults)
            // setOverlayDisplay(true);
            console.log("Recieved Search Results: " + recievedSearchResults)
            
          })
          .catch(error =>{
            console.log("Error");
          })
    },[state]);

    return (
        <>
        <div className={styles['map-search-results-container']}>
            <div className={styles['map-search-results-map']}>
                {/* <img src={`https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=2048x2048&key=AIzaSyDGz7t7D1PRi8X2Or-SHAie2OgWoFH--Bs`}/> */} {/* Uncomment to see Map*/}
            </div>
            <div className={styles['map-search-results-text']}>
                <div className={styles['map-search-results-header']}>
                    <span><h1 className={styles['map-search-results-header-text']}>Results</h1><h5 className={styles['map-search-results-header-filter']}>Filter</h5></span>
                <div className={styles['sort-dropdown']}>
                    <span><h5>Sort By:</h5></span> 
                <select name="search-category" id="search-category" onChange= {e => setResultsSortOption(e.target.value)}>
                        <option value="Account Age">Newly Added</option>
                        <option value="Distance">Distance</option>
                </select>
                <img src={DropdownIcon}/>
                </div>                
                </div>
                <div className={styles['map-search-results-text-list']}>
                <ul>
                {recievedSearchResults.length == 0 && <li>No Results</li>}
                {recievedSearchResults && searchCategory == 'Pets' && recievedSearchResults.map((searchResult) => (
                    <Link to="/Profile"><li key={searchResult.pet_id}><img src={searchResult.profile_pic}/><span><h3>{searchResult.name}</h3></span></li></Link>
                
                ))}
                {recievedSearchResults && searchCategory == 'Businesses' && recievedSearchResults.map((searchResult) => (
                     <Link to="/Profile"><li key={searchResult.pet_id}><img src={searchResult.profile_pic}/><span><h3>{searchResult.name}</h3></span></li></Link>
                ))}
                {recievedSearchResults && searchCategory == 'Shelters' && recievedSearchResults.map((searchResult) => (
                    <Link to="/Profile"><li key={searchResult.pet_id}><img src={searchResult.profile_pic}/><span><h3>{searchResult.name}</h3></span></li></Link>
                ))}
                </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default MapSearch
