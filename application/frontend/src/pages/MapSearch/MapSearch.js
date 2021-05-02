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

const typeOptions = [];
const businessCategoryOptions = [];
const ageOptions = [];
const dogBreedOptions = [];
const catBreedOptions = [];
const colorOptions = [];
const sizeOptions = [];

function MapSearch(props) {
    

    const location = useLocation();
    let history = useHistory();

    const panTo = useCallback(({lat,lng}) =>{
        console.log({lat,lng});
        mapRef.current.panTo({lat,lng});
        mapRef.current.setZoom(14);
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

    const[searchCategory, setSearchCategory] = useState();
    const[searchTerm, setSearchTerm] = useState();
    const[resultsSortOption, setResultsSortOption] = useState('');
    const[recievedSearchResults, setRecievedSearchResults] = useState([]);  
    // const recievedSearchResults = [];//store search results
    console.log('Initial Recieved Search Results: ', recievedSearchResults); //1


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

    useEffect(() => {  //run once when page loads/refresh
        Axios.get('/api/pet-types')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                typeOptions.push({value: response.data[i].pet_type_id, label: response.data[i].pet_type_name});
            }
            console.log('typeOptions: ',typeOptions);
        })

        Axios.get('/api/business-types')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                businessCategoryOptions.push({value: response.data[i].business_type_id, label: response.data[i].business_type_name});
            }
            console.log('businessCategoryOptions: ',businessCategoryOptions);
        })

        Axios.get('/api/dog-breeds')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                dogBreedOptions.push({value: response.data[i].dog_breed_id, label: response.data[i].dog_breed_name});
            }
            console.log('dogBreedOptions: ',dogBreedOptions);
        })

        Axios.get('/api/cat-breeds')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                catBreedOptions.push({value: response.data[i].cat_breed_id, label: response.data[i].cat_breed_name});
            }
            console.log('catBreedOptions: ',catBreedOptions);
        })

        Axios.get('/api/ages')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                ageOptions.push({value: response.data[i].age_id, label: response.data[i].age_name});
            }
            console.log('ageOptions: ',ageOptions);
        })

        Axios.get('/api/sizes')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                sizeOptions.push({value: response.data[i].size_id, label: response.data[i].size_name});
            }
            console.log('sizeOptions: ',sizeOptions);
        })

        Axios.get('/api/colors')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                colorOptions.push({value: response.data[i].color_id, label: response.data[i].color_name});
            }
            console.log('colorOptions: ',colorOptions);
        })
    }, [])

    useEffect(()=>{
        if(state.searchTermParam || state.searchCategoryParam){
            console.log('Fetching Search Results');
            console.log('Search Category: '+ state.searchCategoryParam);
            console.log('Search Term: ' + state.searchTermParam);
            setSearchCategory(state.searchCategoryParam);
            setSearchTerm(state.searchTermParam);
            Axios.get('/api/search', {  //take in filters here? for final version
                params: {
                  searchTerm: state.searchTermParam,
                  searchCategory:state.searchCategoryParam
                }})
                .then(response =>{
                    console.log("response: ",response)
                    console.log("response.data: ",response.data)
                    console.log("response.data.searchResults: ",response.data.searchResults)
                    displaySearchResults();
                    setRecievedSearchResults(response.data.searchResults);
                    console.log("Recieved Search Results: ", recievedSearchResults)
                    // setOverlayDisplay(true);
                })
                .catch(error =>{
                    console.log("Error");
                })
        }
        else if(state.lat && state.lng){
        }
    },[state,]);  //only fetch and reload when search params change


    //toggle display of filter overlay
    function displayFilterOverlay(){
        // console.log("Filter overlay display turning on")
        setFilterOverlayDisplay('block');
        setSearchResultsDisplay('none');
    }

    function displaySearchResults(){
        // console.log("Filter overlay display turning off")
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
                                {recievedSearchResults.length == 0 && <li className={styles['no-results']}>No {searchCategory} that Match your Search. But here are some {searchCategory} you might like: </li>}
                                {/* {recievedSearchResults.length == 0 && searchCategory == 'Pets' &&
                                    recommendedPets.map((searchResult) => (
                                        <Link className={styles['profile-link']} to={"/Profile/" + searchResult.name} ><li className={styles['search-result']} key={recommendedPets.pet_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                    ))
                                }
                                {recievedSearchResults.length == 0 && searchCategory == 'Businesses' &&
                                    recommendedBusinesses.map((searchResult) => (
                                        <Link className={styles['profile-link']} to={"/Profile/" + "BusinessId=" + searchResult.reg_business_id} ><li className={styles['search-result']} key={recommendedBusinesses.reg_business_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                    ))
                                }
                                {recievedSearchResults.length == 0 && searchCategory == 'Shelters' &&
                                    recommendedShelters.map((searchResult) => (
                                        <Link className={styles['profile-link']} to={"/Profile/" + "ShelterId=" + searchResult.reg_shelter_id} ><li className={styles['search-result']} key={recommendedShelters.reg_shelter_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                    ))
                                }
                                {recievedSearchResults.length == 0 && searchCategory == 'Pet Owners' &&
                                    recommendedPetOwners.map((searchResult) => (
                                        <Link className={styles['profile-link']} to={"/Profile/" + "PetOwnerId=" +searchResult.reg_pet_owner_id} ><li className={styles['search-result']} key={recommendedPetOwners.reg_pet_owner_id}><img className={styles['search-result-pic']} src={searchResult.profile_pic}/><span className={styles['search-result-name']}>{searchResult.name}</span></li></Link>
                                    ))
                                } */}

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
                                        options={typeOptions}
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
