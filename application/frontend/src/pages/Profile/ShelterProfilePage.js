import React, { useEffect, useState } from 'react';

// Import components
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';
import SendAMessage from '../../components/Modals/SendAMessage';

import styles from './Profile.module.css'

const shelterProfile = {
    accountType: 'shelter',
    id: '1',
    userName: 'Burgsdale Pet Shelter',
    userPicture: 'shelterImage',
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
           review: "Pets are adorable and the staff are nice",
           rating: 3 
        },
        {
            user_id: 2,
            review: 'It\'s a good place',
            rating: 4 
        },
        {
            user_id: 3,
            review: 'Staff are frendly',
            rating: 5
        },
        {
            user_id: 4,
            review: 'This is a Review test. This is a Review test. This is a Review test. This is a Review test. This is a Review test.',
            rating: 4.5 
        }
    ],
    photos: [
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        { pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        }
    ],
    petProfiles: [
        { pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        }
    ]
};

function Profile() {
    // switch profile type by changing the userProfile Ex: shelterProfile, businessProfile, newBusinessProfile and petOwnerProfile
    const [userProfile, setUserProfile] = useState(shelterProfile);
    const [selfView, setSelfView] = useState();
    const [vistor, setVistor] = useState(true);

    useEffect(() => {
        vistor ? setSelfView(false): setSelfView(true);
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
            <ProfileInfo isSelfView={selfView} profile={userProfile} updateProfile={updateProfileHandler} />
            {
                !vistor &&
                (<div className={styles.SwitchDiv} onClick={toggleSelfViewHandler} >
                    <span 
                        className={styles.SwitchView} 
                        onClick={toggleSelfViewHandler}  >
                            {selfView ? 'switch to vistors view' : 'switch to self view' }
                    </span>
                    <div className={styles.Switch}>
                        <div className={styles.SwitchVistor} id='button' ></div>
                    </div>
                </div>)
            }
            <div className={styles.Bottom}>
                <AboutMe isSelfView={selfView} profile={userProfile} updateProfile={updateProfileHandler} />
                <ProfileContent isSelfView={selfView} profile={userProfile} updateProfile={updateProfileHandler} />
            </div>
        </div>
    )
}

export default Profile;