import React, { useEffect, useState } from 'react';

import shelterImg from '../../images/shelter-profile.jpg'
import styles from './ProfileInfo.module.css'

function ProfileInfo() {
    const [profilePic, setProfilePic] = useState(shelterImg);
    const [profileTitle, setProfileTitle] = useState('');
    const [follow, setFollow] = useState('')

    useEffect(() => {
        setProfileTitle('Burgsdale Pet Shelter');
    },[]);

    return (
        <div className={styles.ProfileInfo} >
            <div>
                <img className={styles.Image} src={profilePic} alt="No image found" />
            </div>
            <div className={styles.SideContainer} >
                <h1 className={styles.UserName} >{profileTitle}</h1>
                <div className={styles.ButtonContainer} >
                    <select 
                        name="search-category" 
                        value={follow}
                        className={styles.Dropdown} 
                        onChange= {e => setFollow(e.target.value)}
                    >
                        <option value="follow" >Follow</option>
                        <option value="unfollow" >Unfollow</option>
                    </select>
                    <button className={styles.Button} >Message</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;