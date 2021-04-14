import React from 'react';
import {Link} from 'react-router-dom'

import Reviews from './Reviews/Reviews';

import shelterImg from '../../images/shelter-profile.jpg'
import styles from './ProfileContent.module.css';

function ProfileContent() {
    return (
        <div className={styles.ProfileContent} >
            <div className={styles.ImageContainer} >
                <div style={{marginRight: "20px", display: "block"}} >
                    <h1>Photos</h1>
                    <img className={styles.Image} src={shelterImg} alt="No image found" />
                    <p><Link>See All</Link></p>
                </div>
                <div>
                    <h1>Pets</h1>
                    <img className={styles.Image} src={shelterImg} alt="No image found" />
                    <p><Link>See All</Link></p>
                </div>
            </div>
            <h1>Reviews</h1>
            <div>
                <Reviews />
            </div>
            <span ><Link>Write a Review</Link><Link>See All</Link></span>
        </div>
    )
}

export default ProfileContent;