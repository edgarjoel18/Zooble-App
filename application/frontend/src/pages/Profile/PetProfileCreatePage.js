import React, { useEffect, useState } from 'react';

// Import components
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';
import SendAMessage from '../../components/Modals/SendAMessage';


import styles from './Profile.module.css'

const newPetProfile = {
    accountType: 'pet',
    id: '108',
    userName: '',
    userPicture: '',
    petOwner: '', 
    about: '',
    petType: {},
    petBreeds: [{}],
    petColors: '',
    petSize: '',
    photos: [],
    petProfiles: []
};


function Profile({appUser}) {
    // switch profile type by changing the userProfile Ex: shelterProfile, businessProfile, newBusinessProfile and petOwnerProfile
    const [userProfile, setUserProfile] = useState(newPetProfile);
    const [selfView, setSelfView] = useState(true);

    useEffect(() => {

    }, [])

    function updateProfileHandler(type, value) {
        if (type === 'address' || type === 'phone' || type === 'hours') {
            console.log('value is ' + value + 'type is ' + type);
            setUserProfile(() => ({
                ...userProfile,
                contactInfo: {
                ...userProfile.contactInfo,
                [type]: value
                }
            }));
        }
        else {
            console.log('[value] is ' + value + ' and [type] is ' + type);
            setUserProfile(() => ({
                ...userProfile,
                [type]: value
            }));
        }
        console.log('updateProfileHandler');
    }

    function toggleSelfViewHandler() {
        setSelfView(!selfView);
        let button = document.getElementById('button');
        selfView ? button.className = styles.SwitchSelf : button.className = styles.SwitchVistor;
    }

    console.log(userProfile);
    return (
        <div className={styles.Profile} >
            <ProfileInfo appUser={appUser} isSelfView={selfView} profile={userProfile} updateProfile={updateProfileHandler} />
            <div className={styles.SwitchDiv} onClick={toggleSelfViewHandler} >
                <span 
                    className={styles.SwitchView} 
                    onClick={toggleSelfViewHandler}  >
                        {selfView ? 'switch to vistors view' : 'switch to self view' }
                </span>
                <div className={styles.Switch}>
                    <div className={styles.SwitchVistor} id='button' ></div>
                </div>
            </div>
            <div className={styles.Bottom}>
                <AboutMe isSelfView={selfView} profile={userProfile} updateProfile={updateProfileHandler} />
                <ProfileContent isSelfView={selfView} profile={userProfile} updateProfile={updateProfileHandler} />
            </div>
        </div>
    )
}

export default Profile;