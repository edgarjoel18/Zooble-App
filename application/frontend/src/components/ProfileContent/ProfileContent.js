import React from 'react';
import {Link} from 'react-router-dom'

import ImageContainer from './ImageContainer/ImageContainer';
import Reviews from './Reviews/Reviews';

import styles from './ProfileContent.module.css';

function ProfileContent(props) {
    let imageContainer = null;
    console.log('[account type] is ' + props.profile.accountType)
    switch(props.profile.accountType) {
        case 'shelter':
            imageContainer = (
                <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '500px'}} >
                    <ImageContainer title='Photos' image={props.profile.photos} />
                    <ImageContainer title='Pets' image={props.profile.petProfiles} />
                </div>
            )
            break;
        case 'business':
            imageContainer = (
                <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '500px'}} >
                    <ImageContainer title='Photos' image={props.profile.photos} />
                </div>
            )
            break;
        case 'pet owner':
            imageContainer = (
                <div style={{display: 'flex', flexDirection: 'column', minWidth: '300px', alignContent: 'center', flexWrap: 'wrap'}} >
                    <ImageContainer title='My Photos' image={props.profile.photos} />
                    <ImageContainer title='My Pets' image={props.profile.petProfiles} />
                </div>
            )
            break;
        default:
            imageContainer = null;
    }

    let displayReview = null;
    if (props.profile.accountType !== 'pet owner'){
        displayReview = (
            <React.Fragment>
                <h2>Reviews</h2>
                <Reviews reviews={props.profile.reviews} />
                {!props.isSelfView && <Link>Write a Review</Link>}
                <Link style={{float: 'right'}} >See All</Link>
            </React.Fragment>
        )
    }

    return (
        <div className={styles.ProfileContent} >
            {/* <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '500px'}} >
                <ImageContainer title='Photo' />
                <ImageContainer title='Pets' />
            </div> */}
            {imageContainer}
            {displayReview}
        </div>
    );
}

export default ProfileContent;