import React from 'react';

import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';


import styles from './Profile.module.css'

function Profile() {
    return (
        <div className={styles.Profile} >
            <div>
                <ProfileInfo />
            </div>
            <div className={styles.Bottom}>
                <AboutMe />
                <ProfileContent />
            </div>
        </div>
    )
}

export default Profile;