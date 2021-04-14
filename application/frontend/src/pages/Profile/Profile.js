import React from 'react';

import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'

import styles from './Profile.module.css'

function Profile() {
    return (
        <div className={styles.Profile} >
            <div>
                <ProfileInfo />
            </div>
            <div>
                <article >
                    <h1>Article Title</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    <p>Quae similitudo in genere etiam humano apparet. Est, ut dicis, inquam...</p>
                </article>
                <div>
                    <div>
                        photos
                        pets
                    </div>
                    reviews
                </div>
            </div>
        </div>
    )
}

export default Profile;