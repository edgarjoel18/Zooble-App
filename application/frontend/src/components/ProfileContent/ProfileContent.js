import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import ImageContainer from './ImageContainer/ImageContainer';
import Reviews from './Reviews/Reviews';
import WriteAReview from '../Modals/WriteAReview';

import styles from './ProfileContent.module.css';
import axios from 'axios';

function ProfileContent({photoPosts, pets, profile, isSelfView, updateProfile}) {
    console.log("photoPosts: ",photoPosts);
    console.log("pets: ",pets);
    console.log("profile account type: ", profile.accountType)
    const [writeAReviewDisplay, setWriteAReviewDisplay] = useState(false);
    const [text, setText] = useState('See All');

    function onReviewSendHandler(newRating, newReview) {
        console.log(profile.reviews);
        let updatedReviews = [...profile.reviews];
        updatedReviews.push({user_Id: 2, review: newReview, rating: newRating})
        console.log(updatedReviews)
        console.log('rating is ' + newRating + ' | review is ' + newReview);
        updateProfile('reviews', updatedReviews);
    }

    let imageContainer = null;
    switch(profile.accountType) {
        case 'shelter':
            imageContainer = (
                <div className={styles.ImageContainerShelter} >
                    <ImageContainer title='Photos' previews={photoPosts} selfView={isSelfView} accountType={profile.accountType} profile={profile} />
                    <ImageContainer title='Pets' previews={pets} accountType={profile.accountType} profile={profile} />
                </div>
            )
            break;
        case 'business':
            imageContainer = (
                <div className={styles.ImageContainerBusiness} >
                    <ImageContainer title='Photos' selfView={isSelfView} image={profile.photos} accountType={profile.accountType} profile={profile} />
                </div>
            )
            break;
        case 'pet owner':
            imageContainer = (
                <div className={styles.ImageContainerTwoRows} >
                    <ImageContainer title='My Photos' previews={photoPosts} selfView={isSelfView} image={profile.photos} accountType={profile.accountType} profile={profile} />
                    <ImageContainer title='Pets' previews={pets} accountType={profile.accountType} profile={profile} />
                </div>
            )
            break;
        case 'pet':
            imageContainer = (
                <div className={styles.ImageContainerTwoRows} >
                    <ImageContainer title='My Photos' selfView={isSelfView} image={profile.photos} accountType={profile.accountType} profile={profile} />
                    <ImageContainer title='My Siblings' image={profile.petProfiles} accountType={profile.accountType} profile={profile}/>
                </div>
            )
            break;
        default:
            imageContainer = null;
    }

    let displayReview = null;
    if (profile.accountType !== 'pet owner' && profile.accountType !== 'pet'){
        displayReview = (
            <div className={styles.Reviews} >
                <h2>Reviews</h2>
                <Reviews reviews={profile.reviews} />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {
                        !isSelfView && 
                        <span 
                            style={{cursor: 'pointer'}} 
                            onClick={() => setWriteAReviewDisplay(true)} 
                        >
                            Write a Review
                        </span>
                    }
                    <div></div>
                    {profile.reviews.length > 0 && <Link onMouseEnter={() => setText('Coming Soon')} 
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