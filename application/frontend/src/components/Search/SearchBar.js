import React, {useEffect, useLayoutEffect, useState} from "react";
import {Link, Switch, Route, Redirect, useHistory} from "react-router-dom";
import Axios from "axios";

import { useLoadScript} from '@react-google-maps/api';

import styles from '../Nav/NavBar.module.css'

import usePlacesAutocomplete,{
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


//For search input and suggestions
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox";

//Google Maps
const libraries = ["places"]






// componentWillMount() and componentWillUnmount() functions work toghther
// to unable and disable scrolling on the main page

// change the scroll bar behavior when component mount  

  
// change the scroll bar behavior when component unmount  



function SearchBar() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState('Pets');
  const [recievedSearchResults, setRecievedSearchResults] = useState([]);

  const [searchLocationLat, setSearchLocationLat] = useState(null);
  const [searchLocationLng, setSearchLocationLng] = useState(null);

  const {
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions:{
        location: {lat: () => 37.773972,lng: () => -122.431297},
        radius: 200 * 1000,
    },
  });

  function search(){
    if(searchLocationLat == null || searchLocationLng == null){
      navigator.geolocation.getCurrentPosition((position)=>{
        const location = {
          pathname:'/MapSearch',
          state: {lat:position.coords.latitude, lng:position.coords.longitude, searchTermParam: searchTerm, searchCategoryParam: searchCategory}
        }
        history.push(location)
      })
    }
    else{
      const location = {
        pathname:'/MapSearch',
        state: {lat:searchLocationLat, lng:searchLocationLng, searchTermParam: searchTerm, searchCategoryParam: searchCategory}
      }
      history.push(location)
    }

    
  }

  useEffect(() => {
    console.log(searchLocationLat, searchLocationLng);
  }, [searchLocationLat, searchLocationLng])

  return (
    <>
      <div className={styles["searchbar"]}>
      <span className={styles["search-category-dropdown"]}>
        <select name="search-category" id="search-category" onChange= {e => setSearchCategory(e.target.value)}>
          <option value="Pets">Pets</option>
          <option value="Businesses">Businesses</option>
          <option value="Shelters">Shelters</option>
          <option value="Pet Owners">Pet Owners</option>
        </select>
      </span>   
      <span className={styles["searchbar-input"]}>
        <Combobox 
            onSelect={async (address)=>{
                setValue(address,false);
                clearSuggestions();
                try{
                    console.log(address);
                    const results = await getGeocode({address});
                    const{lat,lng} = await getLatLng(results[0]);
                    console.log(lat,lng);
                    setSearchLocationLat(lat);
                    setSearchLocationLng(lng);
                } catch(error){
                    console.log("error!")
                }

                console.log(address)
            }}
          >
          {searchCategory=="Pet Owners" &&
          <>
          <input 
            type="text" 
            placeholder="Enter a username, or first name"
            onChange={(e)=> {
              setSearchTerm(e.target.value);
            }}
            onKeyPress={event => {
              if(event.key === 'Enter'){
                history.push(
                  {
                    pathname:"/MapSearch",
                    state:{searchCategoryParam: searchCategory, searchTermParam: searchTerm}
                  }
                  )
              }
            }}
          />
          <ComboboxInput 
            value={value}
            placeholder= {"Near:"}
            onChange={(e)=> {
                setValue(e.target.value);
            }}
            required
            disabled={!ready}
            onKeyPress={event => {
              if(event.key === 'Enter'){
                history.push(
                  {
                    pathname:"/MapSearch",
                    state:{searchCategoryParam: searchCategory, searchTermParam: searchTerm}
                  }
                  )
              }
            }}
          />
        </>
        }
        {searchCategory != "Pet Owners" &&
          <>
            <input
              type="text" 
              placeholder="Enter a username, or first name"
              onChange={(e)=> {
                setSearchTerm(e.target.value);
              }}
              onKeyPress={event => {
                if(event.key === 'Enter'){
                  history.push(
                    {
                      pathname:"/MapSearch",
                      state:{searchCategoryParam: searchCategory, searchTermParam: searchTerm}
                    }
                    )
                }
              }}
            />
            <ComboboxInput 
              value={value}
              placeholder= {"Near Current Location"}
              onChange={(e)=> {
                setValue(e.target.value);
                // setSearchTerm(e.target.value);
              }}
              disabled={!ready}
              onKeyPress={event => {
                if(event.key === 'Enter'){
                  history.push(
                    {
                            pathname:"/MapSearch",
                            state:{searchCategoryParam: searchCategory, searchTermParam: searchTerm}
                          }
                          )
                      }
                    }}
            />
          </>

        }
        {searchCategory != "Pet Owners" && <ComboboxPopover className={styles['combobox-popover']}>
            {status === "OK" && data.map(({id,description}) => 
                <ComboboxOption key={id} value={description}/>
            )}
        </ComboboxPopover>
        }
      </Combobox>
      </span>

      
      <button  
        className={styles["searchbar-search"]}
        onClick={search}
      />
      </div>
  </>
  );
}

export default SearchBar;