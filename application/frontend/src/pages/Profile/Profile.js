import React, { useEffect, useState } from 'react';

import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';


import styles from './Profile.module.css'

const shelterProfile = {
    accountType: 'business',
    id: 3234234234234234,
    userName: '',
    userPicture: '',
    about: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. ',
    contactInfo: {
        phone: '(415) 465-8544', 
        address: '326 Oak St, Burgsdale CA',
        hours: {
            Sun: 'Closed', 
            Mon: '12:00AM - 12:00AM',
            Tue: '12:00AM - 12:00AM',
            Wed: '12:00AM - 12:00AM',
            Thu: '12:00AM - 12:00AM',
            Fri: '12:00AM - 12:00AM',
            Sat: 'Closed'
        }
    },
    reviews: [
        {
           user_id: 1,
           review: "I saw this on TV and wanted to give it a try. one of my hobbies is web-browsing. and when i'm browsing the web this works great.",
           rating: 3 
        },
        {
            user_id: 2,
            review: 'It\'s a good place',
            rating: 4 
        },
        {
            user_id: 3,
            review: 'My neighbor Georgie has one of these. She works as a busboy and she says it looks brown.',
            rating: 5
        },
        {
            user_id: 4,
            review: 'I saw one of these in Canada and I bought one. My ant loves to play with it.',
            rating: 4.5 
        }
    ]
};


function Profile() {
    const [userProfile, setUserProfile] = useState(shelterProfile);
    const [selfView, setSelfView] = useState(true);

    function setContactInfoHandler(contactType, value) {

        setUserProfile(() => ({
            ...userProfile,
            contactInfo: {
            ...userProfile.contactInfo,
            [contactType] : value
            }
        }))
        console.log('setContactInfoHandler')
    }

    function toggleSelfViewHandler() {
        setSelfView(!selfView);
    }

    // changing rendering style based on whether it is selfview or not
 
    console.log(userProfile);
    return (
        <div className={styles.Profile} >
            <div>
                <ProfileInfo isSelfView={selfView} />
            </div>
            <span 
                className={styles.SwitchView} 
                onClick={toggleSelfViewHandler}  >
                    {selfView ? 'switch to vistors view' : 'switch to self view' }
            </span>
            <div className={styles.Bottom}>
                <AboutMe isSelfView={selfView} profile={userProfile} setContact={setContactInfoHandler} />
                <ProfileContent isSelfView={selfView} />
            </div>
        </div>
    )
}

export default Profile;