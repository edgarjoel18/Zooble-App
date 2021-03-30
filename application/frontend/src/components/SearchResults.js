import React, {useState, useEffect} from "react";
import Axios from "axios"
import { NavLink } from 'react-router-dom';

function SearchResults(props) {

    useEffect(() =>{
        Axios.get('/search-results').then(response =>{
            console.log(response.data);
        })
    });
  return (
    <span>These are the search results</span>
  );
}

export default SearchResults;