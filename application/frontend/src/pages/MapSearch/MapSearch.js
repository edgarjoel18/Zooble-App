import {useRef,useCallback, useEffect, useState} from 'react'

import {Link,useLocation,useHistory} from "react-router-dom"

import Axios from "axios";

import styles from './MapSearch.module.css'

import DropdownIcon from '../../images/Created Icons/Dropdown.svg'

import Marker1  from '../../images/Third Party Icons/marker1.png'
import Marker2  from '../../images/Third Party Icons/marker2.png'
import Marker3  from '../../images/Third Party Icons/marker3.png'
import Marker4  from '../../images/Third Party Icons/marker4.png'
import Marker5  from '../../images/Third Party Icons/marker5.png'
import Marker6  from '../../images/Third Party Icons/marker6.png'
import Marker7  from '../../images/Third Party Icons/marker7.png'
import Marker8  from '../../images/Third Party Icons/marker8.png'
import Marker9  from '../../images/Third Party Icons/marker9.png'
import Marker10 from '../../images/Third Party Icons/marker10.png'

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
let markerColors = []
let markerBaseUrl = "../../images/Third\ Party\ Icons/marker"

const distanceOptions = [
    {value: 1, label:'Walking Distance (1 Mile)'},
    {value: 2, label: 'Biking Distance (2 Miles)'},
    {value: 5, label: 'Driving Distance (5 Miles)'}
];

function MapSearch(props) {
    let state = props.location.state;
    console.log("State: ",state);

    //For storing filter states
    const [businessCategoryFilters,setBusinessCategoryFilters] = useState([]);
    const [petTypeFilters,setPetTypeFilters] = useState([]);
    const [dogBreedFilters, setDogBreedFilters] = useState([]);
    const [catBreedFilters, setCatBreedFilters] = useState([]);
    const [petColorFilters, setPetColorFilters] = useState([]);
    const [petSizeFilters, setPetSizeFilters] = useState([]);
    const [petAgeFilters, setPetAgeFilters] = useState([]);
    const [shelterPetTypeFilters, setShelterPetTypeFilters] = useState([]);
    
    
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

    //For Storing Current Page
    const [currentPage, setCurrentPage] = useState(1);


    //for storing whether filter tab is displaying
    const [filterOverlayDisplay, setFilterOverlayDisplay] = useState('none');
    const [searchResultsDisplay, setSearchResultsDisplay] = useState('block')

    //for storing the number of pages of results
    const [maxResultsPages,setMaxResultsPages] = useState(1);




    //Check if state matches any dropdown options within the searchCategory to populate filter automatically
    
    //for storing map location
    const center = {lat: state.lat, lng: state.lng};

    useEffect(() => {  //run once when page loads/refresh
        const getPetTypes = Axios.get('/api/pet-types')   //get business types from database
        const getBusinessTypes = Axios.get('/api/business-types')   //get business types from database
        const getDogBreeds = Axios.get('/api/dog-breeds')   //get business types from database
        const getCatBreeds = Axios.get('/api/cat-breeds')   //get business types from database
        const getAges = Axios.get('/api/ages')   //get business types from database
        const getSizes = Axios.get('/api/sizes')   //get business types from database
        const getColors = Axios.get('/api/colors')   //get business types from database
        

        Promise.all([getPetTypes,getBusinessTypes,getDogBreeds,getCatBreeds,getAges,getSizes,getColors])
        .then((responses) =>{
            typeOptions =  responses[0].data;
            businessCategoryOptions = responses[1].data;
            dogBreedOptions = responses[2].data;
            catBreedOptions = responses[3].data;
            ageOptions = responses[4].data;
            sizeOptions = responses[5].data;
            colorOptions = responses[6].data;
        })
        .catch((err) =>{
            console.log(err);
        })
    }, [])



function search(){
        if(state.searchTermParam || state.searchCategoryParam){


            if(state.prefilter && Object.keys(state.prefilter).length !== 0){  //make sure object is not empty
                 applyPreFilters();
            }

            console.log("pet type filters", petTypeFilters);
            console.log("dog breed filters", dogBreedFilters);
            console.log("search start")
            console.log('Fetching Search Results');
            console.log('Search Category: '+ state.searchCategoryParam);
            console.log('Search Term: ' + state.searchTermParam);
            console.log('Search Distance: ', searchDistance.value);
            console.log('Business Category Filters: ', businessCategoryFilters);
            console.log('Current Page: ', currentPage);
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
                        searchPage: currentPage,
                        searchBizCategories : businessCategoryFilterValues
                    }
                    console.log("Business Search Params: ", searchParams)
                    break
                case 'Shelters':
                    let shelterTypeFilterValues = [];
                    for(let i = 0; i < shelterPetTypeFilters.length; i++){
                        shelterTypeFilterValues.push(shelterPetTypeFilters[i].value);
                    }
                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                        searchPage: currentPage,
                        searchPetTypes : shelterTypeFilterValues
                    }
                    break;
                case 'Pets':
                    let petTypeFilterValues = [];
                    let petColorFilterValues = [];
                    let petSizeFilterValues = [];
                    let petAgeFilterValues = [];
                    let dogBreedFilterValues = [];
                    let catBreedFilterValues = [];
                    for(let i = 0; i < petTypeFilters.length; i++){
                        petTypeFilterValues.push(petTypeFilters[i].value);
                    }
                    for(let i = 0; i < petColorFilters.length; i++){
                        petColorFilterValues.push(petColorFilters[i].value);
                    }
                    for(let i = 0; i < petSizeFilters.length; i++){
                        petSizeFilterValues.push(petSizeFilters[i].value);
                    }
                    for(let i = 0; i < petAgeFilters.length; i++){
                        petAgeFilterValues.push(petAgeFilters[i].value);
                    }
                    for(let i = 0; i < dogBreedFilters.length; i++){
                        dogBreedFilterValues.push(dogBreedFilters[i].value);
                    }
                    for(let i = 0; i < catBreedFilters.length; i++){
                        catBreedFilterValues.push(catBreedFilters[i].value);
                    }

                    if(petTypeFilters.length > 0 && !petTypeFilters.some(petType => petType.label == "Cat")){
                        catBreedFilterValues = [];
                    }
        
                    if(petTypeFilters.length > 0 && !petTypeFilters.some(petType => petType.label == "Dog")){
                        dogBreedFilterValues = [];
                    }

                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                        searchPage: currentPage,
                        searchPetTypes: petTypeFilterValues,
                        searchPetColors: petColorFilterValues,
                        searchPetSizes: petSizeFilterValues,
                        searchPetAges: petAgeFilterValues,
                        searchDogBreeds: dogBreedFilterValues,
                        searchCatBreeds: catBreedFilterValues
                    }
                    break;
                case 'Pet Owners':
                    searchParams = {
                        searchTerm: state.searchTermParam,
                        searchCategory:state.searchCategoryParam,
                        searchLatitude: state.lat,
                        searchLongitude: state.lng,
                        searchDistance: searchDistance.value,
                        searchPage: currentPage
                    }
                    break;
                
            }

            console.log("Search Params: ", searchParams)


            Axios.get('/api/search', {params: searchParams})
            .then(response =>{
                console.log("response: ",response)
                console.log("response.data: ",response.data)
                if(response.data.length !== 0){
                    setMaxResultsPages(Math.ceil(response.data[0].results_count/10))
                }
                console.log(response.data)
                
                setRecievedSearchResults(response.data);
                displaySearchResults();
                console.log("Recieved Search Results: ", recievedSearchResults)
                console.log("Recieved Search Results Length: ", recievedSearchResults.length)
                // console.log("Results Count: ", response.data.resultsCount);
                // setOverlayDisplay(true);
            })
            .catch(err =>{
                console.log(err);
            })
        }
        console.log("search end")
    }

    function applyPreFilters(){
        console.log("applyPreFilters start");
        console.log("Applying preFilter if present")
        console.log("Prefilter: ", state.prefilter);
        if(state.searchCategoryParam === "Pets"){
            console.log("searchcategory: pets")
            Object.keys(typeOptions).forEach(function(key) {
                var option = typeOptions[key];
                console.log("Prefilter: ", state.prefilter);
                if((state.prefilter).toLowerCase() === (option.label).toLowerCase()){
                    console.log("Found Match!");
                    console.log("Option: ", option);
                    setPetTypeFilters([option]);
                }
            })

            Object.keys(dogBreedOptions).forEach(function(key) {
                var option = dogBreedOptions[key];
                console.log("Prefilter: ", state.prefilter);
                if((state.prefilter).toLowerCase() === (option.label).toLowerCase()){
                    console.log("Found Match!");
                    console.log("Option: ",option);
                    setDogBreedFilters([option]);
                }
            })

            Object.keys(catBreedOptions).forEach(function(key) {
                var option = catBreedOptions[key];
                console.log("Prefilter: ", state.prefilter);
                if((state.prefilter).toLowerCase() === (option.label).toLowerCase()){
                    console.log("Found Match!");
                    console.log("Option: ",option);
                    setCatBreedFilters([option]);
                }
            })      
        }
        
        if(state.searchCategoryParam === "Shelters"){
            console.log("searchcategory: shelters")
            Object.keys(typeOptions).forEach(function(key) {
                var option = typeOptions[key];
                console.log("Prefilter: ", state.prefilter);
                if((state.prefilter).toLowerCase() === (option.label).toLowerCase()){
                    console.log("Found Match!");
                    console.log("Option: ",option);
                    setPetTypeFilters([option]);
                }
            })
        }
        if(state.searchCategoryParam === "Businesses"){
            console.log("searchcategory: businesses")
            Object.keys(businessCategoryOptions).forEach(function(key) {
                var option = businessCategoryOptions[key];

                console.log("Prefilter: ", state.prefilter);
                if((state.prefilter).toLowerCase() === (option.label).toLowerCase()){
                    console.log("Found Match!");
                    console.log("Option: ",option);
                    setBusinessCategoryFilters([option]);
                }
            })
        }
        console.log("applyPreFilters end")
    }

    useEffect(()=>{
        search();
    },[state, currentPage]);  //only fetch results when search params or filters or page changes


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
        setCurrentPage(1);
        search();
    }

    function nextPage(){
        console.log("On page ", currentPage)
        console.log("Going to next page");
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        console.log("On page ", currentPage);
        // search();
    }

    function previousPage(){
        console.log("On page ", currentPage)
        if(currentPage > 1){
            console.log("Going to previous page");
            setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
            console.log("On page ", currentPage);
            // search();
        }
        else{
            console.log("On the first page already!");
            console.log("On page ", currentPage);
        }
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
                    {state.lat && state.lng && <GoogleMap 
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={center}
                        options={options}
                        onLoad={onMapLoad}
                        >
                        {recievedSearchResults && recievedSearchResults.map((searchResult, index) => (  //need to change index to something else later
                            <>
                             {/* <Marker position={{lat: state.lat, lng: state.lng}}/> */}
                            <Marker 
                                key={index}
                                position={{lat: parseFloat(searchResult.latitude), lng: parseFloat(searchResult.longitude)}}
                                icon= {{
                                        url: (`https://csc648groupproject.s3-us-west-2.amazonaws.com/marker${index+1}.png`)
                                    }
                                }
                            />
                            </>
                        ))}
{/* 
                        {!recievedSearchResults &&
                            // <Marker position={{lat: state.lat, lng: state.lng}}/>
                        } */}

                    </GoogleMap>}
                    {!state.lat && !state.lng && <div className={styles['map-coming-soon']}>Location Results Feature Coming Soon</div>}
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
                                {recievedSearchResults.length != 0 && searchCategory == 'Pets' && recievedSearchResults.map((searchResult,index) => (
                                    <PetSearchResult searchResult={searchResult} index={index} panTo={panTo}/>
                                ))}
                                {recievedSearchResults.length != 0 && searchCategory == 'Businesses' && recievedSearchResults.map((searchResult, index) => (
                                   <BusinessSearchResult searchResult={searchResult} index={index} panTo={panTo}/>
                                ))}
                                {recievedSearchResults.length != 0 && searchCategory == 'Shelters' && recievedSearchResults.map((searchResult, index) => (
                                    <ShelterSearchResult searchResult={searchResult} index={index} panTo={panTo}/>
                                ))}
                                {recievedSearchResults.length != 0 && searchCategory == 'Pet Owners' && recievedSearchResults.map((searchResult, index) => (
                                    <PetOwnerSearchResult searchResult={searchResult} index={index}/>
                                ))}

                            </ul>
                        </div>
                        <div className={styles['map-search-results-page-navigation']}>
                            {currentPage != 1 && maxResultsPages != 1 && <button className={styles['map-search-results-page-navigation-back']} onClick={previousPage}>Prev Page</button>}
                            {currentPage < maxResultsPages && <button className={styles['map-search-results-page-navigation-next']} onClick={nextPage}>Next Page</button>}
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
                            {petTypeFilters.length > 0 && petTypeFilters.some(petType => petType.label == "Dog") && <div className={styles['filter-pet-breed']}>
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
                            </div>}

                            {petTypeFilters.length > 0 && petTypeFilters.some(petType => petType.label == "Cat") &&<div className={styles['filter-pet-breed']}>
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
                            </div>}
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

function BusinessSearchResult({searchResult,panTo, index}){
    return (
        <li className={styles['search-result']} key={searchResult.reg_business_id}>
            <img className={styles['search-result-pic']} src={searchResult.profile_pic_link}/>
            <Link className={styles['profile-link']} to={"/Profile/" + searchResult.profile_id}>
                <span className={styles['search-result-name']}>{searchResult.name}</span>
            </Link>
            <img className={styles['search-result-marker']} src={`https://csc648groupproject.s3-us-west-2.amazonaws.com/marker${index+1}.png`} onClick={() => {panTo({lat: parseFloat(searchResult.latitude), lng:parseFloat(searchResult.longitude)})}}/>
        </li>
    )
}

function ShelterSearchResult({searchResult,panTo, index}){
    return (
        <li className={styles['search-result']} key={searchResult.reg_shelter_id} >
            <img className={styles['search-result-pic']} src={searchResult.profile_pic_link}/>
            <Link className={styles['profile-link']} to={"/Profile/" + searchResult.profile_id}>
                <span className={styles['search-result-name']}>{searchResult.name}</span>
            </Link>
            <img className={styles['search-result-marker']} src={`https://csc648groupproject.s3-us-west-2.amazonaws.com/marker${index+1}.png`} onClick={() => {panTo({lat: parseFloat(searchResult.latitude), lng:parseFloat(searchResult.longitude)})}}/>
        </li>
    )

}

function PetSearchResult({searchResult, panTo, index}){
    return (
        <li className={styles['search-result']} key={searchResult.pet_id} onClick={() => {panTo({lat: parseFloat(searchResult.latitude), lng:parseFloat(searchResult.longitude)})}}><img className={styles['search-result-pic']} src={searchResult.profile_pic_link}/><Link className={styles['profile-link']} to={"/Profile/" + searchResult.profile_id}><span className={styles['search-result-name']}>{searchResult.name}</span><img className={styles['search-result-marker']} src={`https://csc648groupproject.s3-us-west-2.amazonaws.com/marker${index+1}.png`} onClick={() => {panTo({lat: parseFloat(searchResult.latitude), lng:parseFloat(searchResult.longitude)})}}/></Link></li>
    )
}

function PetOwnerSearchResult({searchResult}){
    return (
        <li className={styles['search-result']} key={searchResult.reg_user_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic_link}/><Link className={styles['profile-link']} to={"/Profile/" + searchResult.profile_id}><span className={styles['search-result-name']}>{searchResult.display_name}</span></Link></li>
    )
}

export default MapSearch;
