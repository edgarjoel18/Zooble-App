import {useRef,useCallback, useEffect, useState} from 'react'

import {Link,useLocation,useHistory} from "react-router-dom"

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
    // zoomControl: false,
}

let typeOptions = [];
let businessCategoryOptions = [];
let ageOptions = [];
let dogBreedOptions = [];
let catBreedOptions = [];
let colorOptions = [];
let sizeOptions = [];

const distanceOptions = [
    {value: 1, label:'Walking Distance (1 Mile)'},
    {value: 2, label: 'Biking Distance (2 Miles)'},
    {value: 5, label: 'Driving Distance (5 Miles)'}
];

function MapSearch(props) {
    

    const location = useLocation();
    let history = useHistory();

    const panTo = useCallback(({lat,lng}) =>{
        console.log({lat,lng});
        mapRef.current.panTo({lat,lng});
        mapRef.current.setZoom(18);
    },[]);
    
    const mapRef = useRef(); //retain state without causing re-renders
    const onMapLoad = useCallback((map) =>{
        mapRef.current = map;
    }, []);

    //Recieve search params from searchbar.js
    let state = props.location.state;
    console.log(state);


    if(typeof(state) =='undefined'){
        state = {lat: 0, lng: 0}
        history.push('/');
    }

    //For storing searchOptions
    const[searchCategory, setSearchCategory] = useState();
    const[searchTerm, setSearchTerm] = useState();
    const[resultsSortOption, setResultsSortOption] = useState('');
    const [searchDistance, setSearchDistance] = useState({value: 5, label: 'Driving Distance (5 Miles)'});

    //For storing Map attributes
    
    //For Storing Search Results
    const[recievedSearchResults, setRecievedSearchResults] = useState([]);
    console.log('Initial Recieved Search Results: ', recievedSearchResults); //1


    //for storing whether filter tab is displaying
    const [filterOverlayDisplay, setFilterOverlayDisplay] = useState('none');
    const [searchResultsDisplay, setSearchResultsDisplay] = useState('block')


    //For storing filter states
    const [businessCategoryFilters,setBusinessCategoryFilters] = useState([{}]);
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

    useEffect(() => {  //run once when page loads/refresh

        //Convert this to array assignments not iterate/push
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

        Axios.get('/api/ages')   //get business types from database
        .then(response =>{
            ageOptions = response.data;
            // console.log('ageOptions: ',ageOptions);
        })

        Axios.get('/api/sizes')   //get business types from database
        .then(response =>{
            sizeOptions = response.data;
            // console.log('sizeOptions: ',sizeOptions);
        })

        Axios.get('/api/colors')   //get business types from database
        .then(response =>{
            colorOptions = response.data;
            // console.log('colorOptions: ',colorOptions);
        })
    }, [])

    function search(){
        if(state.searchTermParam || state.searchCategoryParam){
            console.log('Fetching Search Results');
            console.log('Search Category: '+ state.searchCategoryParam);
            console.log('Search Term: ' + state.searchTermParam);
            console.log('Search Distance: ', searchDistance.value);
            console.log('Business Category Filters: ', businessCategoryFilters);
            console.log(typeof businessCategoryFilters);




            setSearchCategory(state.searchCategoryParam);
            setSearchTerm(state.searchTermParam);

            let searchParams = {};

            switch(state.searchCategoryParam){
                case 'Businesses':
                    let businessCategoryFilterValues = [];
                    for(let i = 0; i < businessCategoryFilters.length; i++){
                        businessCategoryFilterValues.push(businessCategoryFilters[i].value);
                    }
                    console.log("Switch: Businesses")
                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                        searchBizCategories : businessCategoryFilterValues
                    }
                    break
                case 'Shelters':
                    let shelterTypeFilterValues = [];
                    for(let i = 0; i < petTypeFilters.length; i++){
                        shelterTypeFilterValues.push(petTypeFilters[i].value);
                    }
                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                        searchPetTypes : shelterTypeFilterValues
                    }
                    break;
                case 'Pets':
                    let petTypeFilterValues = [];
                    let petColorFilterValues = [];
                    let petSizeFilterValues = [];
                    let petAgeFilterValues = [];
                    for(let i = 0; i < petTypeFilters.length; i++){
                        petTypeFilterValues.push(petTypeFilters[i].value);
                    }
                    for(let i = 0; i < petColorFilters.length; i++){
                        petTypeFilterValues.push(petColorFilters[i].value);
                    }
                    for(let i = 0; i < petSizeFilters.length; i++){
                        petTypeFilterValues.push(petSizeFilters[i].value);
                    }
                    for(let i = 0; i < petAgeFilters.length; i++){
                        petTypeFilterValues.push(petAgeFilters[i].value);
                    }
                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                        searchPetTypes: petTypeFilters,
                        searchPetColors: petColorFilters,
                        searchPetSizes: petSizeFilters,
                        searchPetAges: petAgeFilters
                    }
                    break;
                case 'Pet Owners':
                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                    }
                    break;
                
            }

            console.log("Search Params: ", searchParams)


            Axios.get('/api/search', {params: searchParams})
            .then(response =>{
                console.log("response: ",response)
                console.log("response.data: ",response.data)
                console.log("response.data.searchResults: ",response.data.searchResults)
                displaySearchResults();
                setRecievedSearchResults(response.data.searchResults);
                console.log("Recieved Search Results: ", recievedSearchResults)
                // setOverlayDisplay(true);
            })
            .catch(err =>{
                console.log(err);
            })
        }
        else if(state.lat && state.lng){
        }
    }

    useEffect(()=>{
        search();
    },[state,searchDistance]);  //only fetch results when search params or filters change


    //toggle display of filter overlay
    function displayFilterOverlay(){
        // console.log("Filter overlay display turning on")
        setFilterOverlayDisplay('flex');
        setSearchResultsDisplay('none');
    }

    function displaySearchResults(){
        // console.log("Filter overlay display turning off")
        setFilterOverlayDisplay('none');
        setSearchResultsDisplay('block');
    }

    function applyFilters(){
        search();
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

    // console.log(petTypeFilters);

    return (
            <>
            <div className={styles['map-search-results-container']}>
                <div className={styles['map-search-results-map']}>
                    {!state.lat && !state.lng && <GoogleMap 
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={center}
                        options={options}
                        onLoad={onMapLoad}
                        >
                        {recievedSearchResults && recievedSearchResults.map((searchResult) => (
                            <>
                             {/* <Marker position={{lat: state.lat, lng: state.lng}}/> */}
                            <Marker 
                            //     key={searchResult.address_id}
                                 position={{lat: parseFloat(searchResult.lat), lng: parseFloat(searchResult.lng)}}
                                
                            />
                            </>
                        ))}
{/* 
                        {!recievedSearchResults &&
                            // <Marker position={{lat: state.lat, lng: state.lng}}/>
                        } */}

                    </GoogleMap>}
                    {state.lat && state.lng && <div className={styles['map-coming-soon']}>Location Results Feature Coming Soon</div>}
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
                                {recievedSearchResults.length == 0 && <li className={styles['no-results']}>No {searchCategory} that Match your Search. But here are some {searchCategory} you might like: </li>}
                                {recievedSearchResults && searchCategory == 'Pets' && recievedSearchResults.map((searchResult) => (
                                    <Link className={styles['profile-link']} to={"/Profile/" + searchResult.name}><li className={styles['search-result']} key={searchResult.pet_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                ))}
                                {recievedSearchResults && searchCategory == 'Businesses' && recievedSearchResults.map((searchResult) => (
                                    <BusinessSearchResult searchResult={searchResult} panTo={panTo}/>
                                ))}
                                {recievedSearchResults && searchCategory == 'Shelters' && recievedSearchResults.map((searchResult) => (
                                    <ShelterSearchResult searchResult={searchResult} panTo={panTo}/>
                                ))}
                                {recievedSearchResults && searchCategory == 'Pet Owners' && recievedSearchResults.map((searchResult) => (
                                    <Link className={styles['profile-link']} to={"/Profile/" + "PetOwnerId=" +searchResult.reg_pet_owner_id}><li className={styles['search-result']} key={searchResult.reg_pet_owner_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
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
                        <>
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
                            <div className={styles['filter-distance']}>
                                <label for="distance">Distance</label>
                                    <Select id="distance" name="distance"
                                        onChange={setSearchDistance}
                                        options={distanceOptions}
                                        placeholder="Select Preferred Distance"
                                        theme={customTheme}
                                        isSearchable
                                        components={animatedComponents}
                                    />
                            </div>
                        </>
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
                            <>
                                <div className={styles['filter-shelter-pets']}>
                                    <label for="shelter-pet-types">Available Types of Pets</label>
                                        <Select id="shelter-pet-types" name="shelter_pet_types"
                                            onChange={setShelterPetTypeFilters}
                                            options={typeOptions}
                                            placeholder="Select Types of Pets"
                                            theme={customTheme}
                                            isSearchable
                                            isMulti
                                            components={animatedComponents}
                                        />
                                </div>
                                <div className={styles['filter-distance']}>
                                    <label for="distance">Distance</label>
                                        <Select id="distance" name="distance"
                                            onChange={setSearchDistance}
                                            options={distanceOptions}
                                            placeholder="Select Preferred Distance"
                                            theme={customTheme}
                                            isSearchable
                                            components={animatedComponents}
                                        />
                                </div>
                            </>
                        }
                        <button className={styles['filter-button']} onClick={applyFilters}>Apply Filters</button>
                    </>
                </div>
            </div>
            </>     
    );
}

function BusinessSearchResult({searchResult,panTo}){
    return (
        <li className={styles['search-result']} key={searchResult.reg_business_id} onClick={() => {panTo({lat: parseFloat(searchResult.lat), lng:parseFloat(searchResult.lng)})}}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li>
    )
}

function ShelterSearchResult({searchResult,panTo}){
    return (
        <li className={styles['search-result']} key={searchResult.reg_shelter_id} onClick={() => {panTo({lat: parseFloat(searchResult.lat), lng:parseFloat(searchResult.lng)})}}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li>
    )

}

export default MapSearch;
