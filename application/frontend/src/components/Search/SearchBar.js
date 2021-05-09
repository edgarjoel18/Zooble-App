import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Link, Switch, Route, Redirect, useHistory} from "react-router-dom";
import Axios from "axios";
import {useThrottle} from '@react-hook/throttle'
import {matchSorter} from 'match-sorter'

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

let typeOptions = [];
let businessCategoryOptions = [];
let dogBreedOptions = [];
let catBreedOptions = [];


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

  const [selectedPrefilter, setSelectedPrefilter] = useState({});

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

  useEffect(() =>{
    Axios.get('/api/pet-types')   //get business types from database
    .then(response =>{
        typeOptions =  response.data;
        // console.log('typeOptions: ',typeOptions);
    })

    Axios.get('/api/business-types')   //get business types from database
    .then(response =>{
        businessCategoryOptions = response.data;
        // console.log('businessCategoryOptions: ',businessCategoryOptions);
    })

    Axios.get('/api/dog-breeds')   //get business types from database
    .then(response =>{
        dogBreedOptions = response.data;
        // console.log('dogBreedOptions: ',dogBreedOptions);
    })

    Axios.get('/api/cat-breeds')   //get business types from database
    .then(response =>{
        catBreedOptions = response.data;
        // console.log('catBreedOptions: ',catBreedOptions);
    })
  },[])

  useEffect(() => {
    console.log(searchLocationLat, searchLocationLng);
  }, [searchLocationLat, searchLocationLng])


  const [term,setTerm] = useState("");
  const results = useCategoryMatch(term);
  console.log(results);

  const handleChange = (event) => setTerm(event.target.value);

  function useCategoryMatch(term){
    const throttledTerm = useThrottle(term, 100);
    let filters = [];
    if(searchCategory == 'Pets'){
      //set autocompletable prefilters to pet type and breed
      filters = typeOptions.concat(dogBreedOptions,catBreedOptions);
    }
    if(searchCategory == 'Shelters'){
      //set autocompletable prefilters to pet type
      filters = typeOptions;
    }
    if(searchCategory == 'Businesses'){
      //set autocompletable prefilters to business type
      filters = businessCategoryOptions;
    }
    return useMemo( () => 
      term.trim() === ""
      ? null
      : matchSorter(filters, term,{
          keys: [(filter) => `${filter.label}`] 
      }),
      [throttledTerm]
    );
  }

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
      <Combobox>
        <ComboboxInput className={styles['searchbar-term-input']} onChange={handleChange}/>
        {results && (
          <ComboboxPopover className={styles['combobox-popover']}>
            {results.length > 0 ? (
              <ComboboxList className={styles['combobox-list']}>
                 {results.slice(0, 5).map((result) => (
                   <ComboboxOption
                     key={result.label}
                     value={result.label}
                   />
                 ))}
               </ComboboxList>
            ) : (
              <span style={{display: 'block', margin: 8}}>
                No Results Found
              </span>
            )}
          </ComboboxPopover>)}
      </Combobox>
      {/* <input 
          className={styles['searchbar-term-input']}
          type="text" 
          placeholder= {"Search for " + searchCategory}
          onChange={(e)=> {
            setSearchTerm(e.target.value);
          }}
          onKeyPress={event => {
            if(event.key === 'Enter'){
              history.push({ pathname:"/MapSearch", state:{searchCategoryParam: searchCategory, searchTermParam: searchTerm}})
            }
          }}
        /> */}
      <span className={styles["searchbar-input"]}>
        <Combobox className={styles['searchbar-location-input']}
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
          {/* Input Box */}
          {searchCategory !== "Pet Owners" && <ComboboxInput  
            value={value}
            placeholder= {searchCategory !== 'Pet Owners' && "Near Current Location"}
            onChange={(e)=> {
              setValue(e.target.value);
              // setSearchTerm(e.target.value);
            }}
            disabled={!ready }
            onKeyPress={event => {
              if(event.key === 'Enter'){
                history.push({ pathname:"/MapSearch", state:{searchCategoryParam: searchCategory, searchTermParam: searchTerm}})
              }
            }}
          />}
           {/* Dropdown List */}
          <ComboboxPopover className={styles['combobox-popover']}> 
            <ComboboxList className={styles['combobox-list']}>
              {status === "OK" &&
                data.map(({id,description}) => (
                <ComboboxOption key={id} value={description}/>
              ))}
            </ComboboxList>
          </ComboboxPopover>
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