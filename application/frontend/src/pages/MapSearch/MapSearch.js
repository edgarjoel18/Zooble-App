import {useRef,useCallback, useEffect, useState} from 'react'

import {Link} from "react-router-dom"

import Axios from "axios";

import styles from './MapSearch.module.css'

import DropdownIcon from '../../images/Created Icons/Dropdown.svg'

import Select from 'react-select';

import makeAnimated from 'react-select/animated';

import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: 'calc(100vh - 100px)',
};

const options = {
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling:"none",
}

function MapSearch(props) {

    const panTo = useCallback(({lat,lng}) =>{
        mapRef.current.panTo({lat,lng});
        mapRef.current.setZoom(14);
    },[]);
    
    const mapRef = useRef(); //retain state without causing re-renders
    const onMapLoad = useCallback((map) =>{
        mapRef.current = map;
    }, []);
    
    //Only for horizontal prototype, real thing should fetch from db
    const businessCategoryOptions = [
        {value: 'Grooming', label: 'Grooming'},
        {value: 'Supplies', label: 'Supplies'},
        {value: 'Training', label: 'Training'},
        {value: 'Kennels', label: 'Kennels'},
        {value: 'Pet Stores', label: 'Pet Stores'}
    ];

    const dogBreedOptions = [
        {value: 'German Shepherd', label: 'German Shepherd'},
        {value: 'Labrador Retriever', label: 'Labrador Retriever'}
    ];

    const catBreedOptions = [
        {value: 'Manx', label: 'Manx'},
        {value: 'Siamese', label: 'Siamese'}
    ];

    const colorOptions = [
        {value: 'Black', label: 'Black'},
        {value: 'White', label: 'White'},
        {value: 'Brown', label: 'Brown'}
    ];

    const sizeOptions = [
        {value: 'Small', label: 'Small'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Large', label: 'Large'}
    ];

    const ageOptions = [
        {value: 'Young', label: 'Young'},
        {value: 'Adult', label: 'Adult'},
        {value: 'Senior', label: 'Senior'}
    ];

    const typeOptions = [
        {value: 'Dog', label: 'Dog'},
        {value: 'Cat', label: 'Cat'},
        {value: 'Lizard', label:'Lizard'},
        {value: 'Monkey', label: 'Monkey'},
    ];

    //Recieve search params for searchbar.js
    let state = props.location.state;
    console.log("Search Category: " + state.searchCategoryParam);
    console.log("Search Term: " + state.searchTermParam);
    const[searchCategory, setSearchCategory] = useState(state.searchCategoryParam);
    const[searchTerm, setSearchTerm] = useState(state.searchTermParam);
    const[resultsSortOption, setResultsSortOption] = useState('');
    const[recievedSearchResults, setRecievedSearchResults] = useState([]);  //store search results


    //for storing whether filter tab is displaying
    const [filterOverlayDisplay, setFilterOverlayDisplay] = useState('none');
    const [searchResultsDisplay, setSearchResultsDisplay] = useState('block')


    //For storing filter states
    const [businessCategoryFilters,setBusinessCategoryFilters] = useState([]);
    const [petTypeFilters,setPetTypeFilters] = useState([]);
    const [dogBreedFilters, setDogBreedFilters] = useState([]);
    const [catBreedFilters, setCatBreedFilters] = useState([]);
    const [petColorFilters, setPetColorFilters] = useState([]);
    const [petSizeFilters, setPetSizeFilters] = useState([]);
    const [petAgeFilters, setPetAgeFilters] = useState([]);
    const [shelterPetTypeFilters, setShelterPetTypeFilters] = useState([]);

    //for storing map location
    const[latitude,setLatitude] = useState();
    const[longitude,setLongitude] = useState();
    const[mapUrl,setMapUrl] = useState();

    const center = {lat: state.lat, lng: state.lng};

    useEffect(()=>{
        if(state.searchTermParam && state.searchCategoryParam){
            console.log('Fetching Search Results');
            setSearchCategory(state.searchCategoryParam);
            setSearchTerm(state.searchTermParam);
            Axios.get('/search', {  //take in filters here? for final version
                params: {
                  searchTerm: state.searchTermParam,
                  searchCategory:state.searchCategoryParam}})
                .then(response =>{
                console.log(response)
                console.log(response.data)
                console.log(response.data.searchResults)
                setRecievedSearchResults(response.data.searchResults)
                // setOverlayDisplay(true);
                displaySearchResults();
                console.log("Recieved Search Results: " + recievedSearchResults)
                
              })
              .catch(error =>{
                console.log("Error");
              })
        }
        else if(state.lat && state.lng){
        }

    },[state]);  //only fetch and reload when search params change


    //toggle display of filter overlay
    function displayFilterOverlay(){
        console.log("Filter overlay display turning on")
        setFilterOverlayDisplay('block');
        setSearchResultsDisplay('none');
    }

    function displaySearchResults(){
        console.log("Filter overlay display turning off")
        setFilterOverlayDisplay('none');
        setSearchResultsDisplay('block');
    }

    function customTheme(theme){
        return {
            ... theme,
            colors:{
                ... theme.colors,
                primary25: '#B3B3B3',
                primary:'#1CB48F',
            }
        }
    }

    const animatedComponents = makeAnimated();

    console.log(petTypeFilters);

    return (
            <>
            <div className={styles['map-search-results-container']}>
                <div className={styles['map-search-results-map']}>
                    {state.lat && state.lng && <GoogleMap 
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={center}
                        options={options}
                        onLoad={onMapLoad}
                        >
                        <Marker 
                            position={{lat:state.lat,lng:state.lng}}
                        />
                    </GoogleMap>}
                    {!state.lat && !state.lng && <div className={styles['map-coming-soon']}>Location Results Feature Coming Soon</div>}
                    {/* {state.lat && state.lng && <img src={`https://maps.googleapis.com/maps/api/staticmap?center=`+ state.lat +","+ state.lng +`&zoom=8&size=640x640&markers=color=gray%7C` + latitude +","+ longitude + "&key=AIzaSyDGz7t7D1PRi8X2Or-SHAie2OgWoFH--Bs"}/>} */}
                </div>
                
                <div className={styles['map-search-results-text']} style={{display: searchResultsDisplay}}>
                    <>
                        <div className={styles['map-search-header']}>
                            <span><span className={styles['map-search-header-text']}>Results</span><button className={styles['map-search-results-header-action']} onClick={displayFilterOverlay}>Filter</button></span>
                            <div className={styles['sort-dropdown']}>
                                <span className={styles['sort-dropdown-label']}>Sort By:</span>
                                <select className={styles['sort-dropdown-select']}  name="search-category" id="search-category" onChange= {e => setResultsSortOption(e.target.value)}>
                                    <option value="Account Age">Newly Added</option>
                                    <option value="Distance">Distance</option>
                                </select>
                                <img src={DropdownIcon}/>
                            </div>                
                        </div>
                        <div className={styles['map-search-results-text-list']}>
                            <ul>
                                {recievedSearchResults.length == 0 && <li className={styles['no-results']}>No Results</li>}
                                {recievedSearchResults && searchCategory == 'Pets' && recievedSearchResults.map((searchResult) => (
                                    <Link className={styles['profile-link']} to="/Profile"><li className={styles['search-result']} key={searchResult.pet_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                ))}
                                {recievedSearchResults && searchCategory == 'Businesses' && recievedSearchResults.map((searchResult) => (
                                    <Link className={styles['profile-link']} to="/Profile"><li className={styles['search-result']} key={searchResult.reg_business_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                ))}
                                {recievedSearchResults && searchCategory == 'Shelters' && recievedSearchResults.map((searchResult) => (
                                    <Link className={styles['profile-link']} to="/Profile"><li className={styles['search-result']} key={searchResult.reg_shelter_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                ))}
                                {recievedSearchResults && searchCategory == 'Pet Owners' && recievedSearchResults.map((searchResult) => (
                                    <Link className={styles['profile-link']} to="/Profile"><li className={styles['search-result']} key={searchResult.reg_pet_owner_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                ))}

                            </ul>
                        </div>
                    </>
                </div>
                <div className={styles["map-search-results-filter"]} style={{display: filterOverlayDisplay}}>
                    <>
                        <div className={styles['map-search-header']}>
                        <span><span className={styles['map-search-header-text']}>Filters</span><button className={styles['map-search-results-header-action']} onClick={displaySearchResults}>Back to Results</button></span>
                        </div>
                        {searchCategory=="Businesses" && 
                        <div className={styles['filter-business-categories']}>
                            <label for="business-categories">Categories</label>
                                <Select id="business-categories" name="business_categories"
                                    onChange={setBusinessCategoryFilters}
                                    options={businessCategoryOptions}
                                    placeholder="Select Business Categories"
                                    theme={customTheme}
                                    isSearchable
                                    isMulti
                                    components={animatedComponents}
                                />
                        </div>
                        }
                        {searchCategory=="Pets" &&
                        <>
                            <div className={styles['filter-pet-types']}>
                            <label for="pet-types">Types</label>
                                <Select id="pet-types" name="pet_types"
                                    onChange={setPetTypeFilters}
                                    options={typeOptions}
                                    placeholder="Select Pet Type(s)"
                                    theme={customTheme}
                                    isSearchable
                                    isMulti
                                    components={animatedComponents}
                                />
                            </div>
                            <div className={styles['filter-pet-size']}>
                                <label for="pet-sizes">Sizes</label>
                                    <Select id="pet-sizes" name="pet_sizes"
                                        onChange={setPetSizeFilters}
                                        options={sizeOptions}
                                        placeholder="Select Pet Size(s)"
                                        theme={customTheme}
                                        isSearchable
                                        isMulti
                                        components={animatedComponents}
                                    />
                            </div>
                            <div className={styles['filter-pet-colors']}>
                                <label for="pet-colors">Colors</label>
                                    <Select id="pet-colors" name="pet_colors"
                                        onChange={setPetColorFilters}
                                        options={colorOptions}
                                        placeholder="Select Pet Color(s)"
                                        theme={customTheme}
                                        isSearchable
                                        isMulti
                                        components={animatedComponents}
                                    />
                            </div>
                            <div className={styles['filter-pet-age']}>
                                <label for="pet-age">Age</label>
                                    <Select id="pet-age" name="pet_age"
                                        onChange={setPetAgeFilters}
                                        options={ageOptions}
                                        placeholder="Select Pet Age(s)"
                                        theme={customTheme}
                                        isSearchable
                                        isMulti
                                        components={animatedComponents}
                                    />
                            </div>
                            <div className={styles['filter-pet-breed']}>
                                <label for="dog-breed">Dog Breeds</label>
                                    <Select id="dog-breed" name="dog_breed"
                                        onChange={setDogBreedFilters}
                                        options={dogBreedOptions}
                                        placeholder="Select Dog Breed(s)"
                                        theme={customTheme}
                                        isSearchable
                                        isMulti
                                        components={animatedComponents}
                                    />
                            </div>

                            <div className={styles['filter-pet-breed']}>
                                <label for="cat-breed">Cat Breeds</label>
                                    <Select id="cat-breed" name="cat_breed"
                                        onChange={setCatBreedFilters}
                                        options={catBreedOptions}
                                        placeholder="Select Cat Breed(s)"
                                        theme={customTheme}
                                        isSearchable
                                        isMulti
                                        components={animatedComponents}
                                    />
                            </div>
                        </>
                        }
                        {searchCategory=="Shelters" &&
                            <div className={styles['filter-shelter-pets']}>
                                <label for="shelter-pet-types">Available Types of Pets</label>
                                    <Select id="shelter-pet-types" name="shelter_pet_types"
                                        onChange={setShelterPetTypeFilters}
                                        options={businessCategoryOptions}
                                        placeholder="Select Types of Pets"
                                        theme={customTheme}
                                        isSearchable
                                        isMulti
                                        components={animatedComponents}
                                    />
                            </div>
                        }
                    </> 
                </div>
            </div>
            </>     
    );
}

export default MapSearch;
