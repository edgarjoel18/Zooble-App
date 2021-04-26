import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import ImageContainer from './ImageContainer/ImageContainer';
import Reviews from './Reviews/Reviews';
import WriteAReview from '../Modals/WriteAReview';

import styles from './ProfileContent.module.css';

function ProfileContent(props) {
    const [writeAReviewDisplay, setWriteAReviewDisplay] = useState(false);
    const [text, setText] = useState('See All');

    function onReviewSendHandler(newRating, newReview) {
        console.log(props.profile.reviews);
        let updatedReviews = [...props.profile.reviews];
        updatedReviews.push({user_Id: 2, review: newReview, rating: newRating})
        console.log(updatedReviews)
        console.log('rating is ' + newRating + ' | review is ' + newReview);
        props.updateProfile('reviews', updatedReviews);
    }

    let imageContainer = null;
    switch(props.profile.accountType) {
        case 'shelter':
            imageContainer = (
                <div className={styles.ImageContainerShelter} >
                    <ImageContainer title='Photos' image={props.profile.photos} accountType={props.profile.accountType} profile={props.profile} />
                    <ImageContainer title='Pets' image={props.profile.petProfiles} accountType={props.profile.accountType} profile={props.profile} />
                </div>
            )
            break;
        case 'business':
            imageContainer = (
                <div className={styles.ImageContainerBusiness} >
                    <ImageContainer title='Photos' image={props.profile.photos} accountType={props.profile.accountType} profile={props.profile} />
                </div>
            )
            break;
        case 'pet owner':
            imageContainer = (
                <div className={styles.ImageContainerTwoRows} >
                    <ImageContainer title='My Photos' image={props.profile.photos} accountType={props.profile.accountType} profile={props.profile} />
                    <ImageContainer title='My Pets' image={props.profile.petProfiles} accountType={props.profile.accountType} profile={props.profile} />
                </div>
            )
            break;
        case 'pet':
            imageContainer = (
                <div className={styles.ImageContainerTwoRows} >
                    <ImageContainer title='My Photos' image={props.profile.photos} accountType={props.profile.accountType} profile={props.profile} />
                    <ImageContainer title='My Siblings' image={props.profile.petProfiles} accountType={props.profile.accountType} profile={props.profile} />
                </div>
            )
            break;
        default:
            imageContainer = null;
    }

    let displayReview = null;
    if (props.profile.accountType !== 'pet owner' && props.profile.accountType !== 'pet'){
        displayReview = (
            <div className={styles.Reviews} >
                <h2>Reviews</h2>
                <Reviews reviews={props.profile.reviews} />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {
                        !props.isSelfView && 
                        <span 
                            style={{cursor: 'pointer'}} 
                            onClick={() => setWriteAReviewDisplay(true)} 
                        >
                            Write a Review
                        </span>
                    }
                    <div></div>
                    {props.profile.reviews.length > 0 && <Link onMouseEnter={() => setText('Coming Soon')} 
                    onMouseLeave={() => setText('See All')} >{text}</Link>}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.ProfileContent} >
            {imageContainer}
            {/* {displayReview}
            <WriteAReview 
                display={writeAReviewDisplay} 
                onClose={()=> setWriteAReviewDisplay(false)}
                clicked={onReviewSendHandler}
            >
                Write a Review
            </WriteAReview> */}
        </div>
    );
}

export default ProfileContent;