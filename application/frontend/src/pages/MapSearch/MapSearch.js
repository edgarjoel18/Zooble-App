import {React, useState} from 'react'

import styles from './MapSearch.module.css'

function MapSearch() {
    const[searchCategory, setSearchCategory] = useState('Pet');
    const[recievedSearchResults, setRecievedSearchResults] = useState([ 
        {   pet_id: 1,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        {   pet_id: 2,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        { pet_id: 3,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 1,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        { pet_id: 3,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        ]);

    return (
        <>
        <div className={styles['map-search-results-container']}>
            <div className={styles['map-search-results-map']}>Map</div>
            <div className={styles['map-search-results-text']}>
                <div className={styles['map-search-results-header']}><h1 className={styles['map-search-results-header-text']}>Results</h1>

                {/* <select name="search-category" id="search-category" onChange= {e => setSearchCategory(e.target.value)}>
                        <option value="Pet">Pets</option>
                        <option value="Business">Businesses</option>
                        <option value="Shelter">Shelters</option>
                </select> */}
                </div>

                <ul>
                {recievedSearchResults.length == 0 && <li>No Results</li>}
                {recievedSearchResults && searchCategory == 'Pet' && recievedSearchResults.map((searchResult) => (
                    <li key={searchResult.pet_id}><img src={searchResult.profile_pic}/><span><h3>{searchResult.name}</h3></span></li>
                ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default MapSearch
