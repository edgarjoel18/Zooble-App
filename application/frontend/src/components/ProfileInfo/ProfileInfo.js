import React, { useEffect, useState } from 'react';

import shelterImg from '../../images/shelter-profile.jpg'
import styles from './ProfileInfo.module.css'

function ProfileInfo(props) {
    const [profilePic, setProfilePic] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [editing, setEditing] = useState(false);
    const [follow, setFollow] = useState('')

    useEffect(() => {
        setProfileTitle('Burgsdale Pet Shelter');
        setProfilePic(shelterImg);
    },[]);

    function cancelEditHandler() {
        setEditing(false);
    }

    // function uploadPhotoHandler(rowFiles) {
    //     const files = Array.from(rowFiles)
    //     const formData = new FormData()

    //     files.forEach((file, i) => {
    //     formData.append(i, file)
    //     })
    //     setProfilePic(formData);

    //     console.log(files);
    // }

    return (
        <div className={styles.ProfileInfo} >
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '223px'}} >
                <img className={styles.Image} src={profilePic} alt="No Image Found" />
                {/* <input type='file' onChange={event => uploadPhotoHandler(event.target.files)} /> */}
            </div>
            <div className={styles.SideContainer} >
                <div style={{display: 'flex', justifyItems: 'center'}}>
                    {
                        props.isSelfView && !editing && 
                        <button 
                        className={styles.EditButton} 
                        onClick={() => setEditing(true)}  
                        >
                            edit
                        </button>
                    }
                    <h1 className={styles.UserName} >
                        <input 
                            value={profileTitle} 
                            readOnly={!editing}
                            onChange={event => setProfileTitle(event.target.value)} 
                        />
                    </h1> 
                    {
                        props.isSelfView && editing && 
                        <button 
                        className={styles.EditButton} 
                        onClick={cancelEditHandler}  
                        >
                            confirm
                        </button>
                    }
                </div>
                <div className={styles.ButtonContainer} >
                    <select 
                        name="search-category" 
                        value={follow}
                        className={styles.Dropdown} 
                        onChange= {event => setFollow(event.target.value)}
                    >
                        <option value="follow" >Follow</option>
                        <option value="unfollow" >Followers</option>
                    </select>
                    {!props.isSelfView && <button className={styles.Button} >Message</button>}
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;