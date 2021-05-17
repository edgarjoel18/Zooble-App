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
          state: {lat:position.coords.latitude, lng:position.coords.longitude, searchTermParam: searchTerm, searchCategoryParam: searchCategory, prefilter: selectedPrefilter}
        }
        history.push(location)
      })
    }
    else{
      const location = {
        pathname:'/MapSearch',
        state: {lat:searchLocationLat, lng:searchLocationLng, searchTermParam: searchTerm, searchCategoryParam: searchCategory,  prefilter: selectedPrefilter}
      }
      history.push(location)
    }

    
  }

  useEffect(() =>{
    const getPetTypes = Axios.get('/api/pet-types')   //get business types from database
    const getBusinessTypes = Axios.get('/api/business-types')   //get business types from database
    const getDogBreeds = Axios.get('/api/dog-breeds')   //get business types from database
    const getCatBreeds = Axios.get('/api/cat-breeds')   //get business types from database
    

    Promise.all([getPetTypes,getBusinessTypes,getDogBreeds,getCatBreeds])
    .then((responses) =>{
        typeOptions =  responses[0].data;
        businessCategoryOptions = responses[1].data;
        dogBreedOptions = responses[2].data;
        catBreedOptions = responses[3].data;
    })
    .catch((err) =>{
        console.log(err);
    })
  },[])

  useEffect(() => {
    console.log(searchLocationLat, searchLocationLng);
  }, [searchLocationLat, searchLocationLng])

  const results = useCategoryMatch(searchTerm);
  // console.log(results);

  function useCategoryMatch(searchTerm){
    const throttledTerm = useThrottle(searchTerm, 100);  //need to throttle function because it runs whenever searchTerm is set
    let filters = [];
    if(searchCategory == 'Pets'){
      //set autocompletable prefilters to pet type and breed
      filters = typeOptions.concat(dogBreedOptions,catBreedOptions);
      // console.log("Filters: ",filters);
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
      searchTerm.trim() === ""
      ? null
      : matchSorter(filters, searchTerm,{
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
      <Combobox
        onSelect={(prefilter) => {
            console.log(prefilter);
            setSelectedPrefilter(prefilter)  //set prefilter to selected one to pass to mapsearch page
            setSearchTerm("");
        }}>
        <ComboboxInput 
          className={styles['searchbar-term-input']} 
          onChange={(event) => setSearchTerm(event.target.value)}  //set search term
          onKeyPress={event => {  //handle enter button press
            if(event.key === 'Enter'){
              search();
            }
          }}/>
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
                search();
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