import React, { useEffect, useState } from 'react';

import shelterImg from '../../images/shelter-profile.jpg'

import styles from './ProfileInfo.module.css'

function ProfileInfo() {
    const [profilePic, setProfilePic] = useState(shelterImg);
    const [profileTitle, setProfileTitle] = useState('');

    useEffect(() => {
        setProfileTitle('Burgsdale Pet Shelter');
    },[]);

    return (
        <div className={styles.ProfileInfo} >
            <div>
                <img className={styles.Image} src={profilePic} alt="no image found" />
            </div>
            <h1 className={styles.UserName} >{profileTitle}</h1>
        </div>
    )
}

export default ProfileInfo;