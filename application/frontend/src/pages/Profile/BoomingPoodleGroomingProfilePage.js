import React, { useEffect, useState } from 'react';

// Import components
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';
import SendAMessage from '../../components/Modals/SendAMessage';


import styles from './Profile.module.css'

const businessProfile = {
    accountType: 'business',
    id: '1',
    userName: 'Booming Poodle Grooming',
    userPicture: 'business1Image',
    about: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. ',
    contactInfo: {
        phone: '(333) 333-3333', 
        address: '333 BPG St, Burgsdale CA',
        hours: {
            Sun: '12:00AM - 12:00AM', 
            Mon: '12:00AM - 12:00AM',
            Tue: '12:00AM - 12:00AM',
            Wed: '12:00AM - 12:00AM',
            Thu: '12:00AM - 12:00AM',
            Fri: '12:00AM - 12:00AM',
            Sat: '12:00AM - 12:00AM'
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
    ],
    photos: [
        { 
            post_id: 1,
            user_display_name: 'Booming Poodle Grooming',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 2,
            user_display_name: 'Booming Poodle Grooming',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 3,
            user_display_name: 'Booming Poodle Grooming',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 4,
            user_display_name: 'Booming Poodle Grooming',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Booming Poodle Grooming',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Booming Poodle Grooming',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
    ]
};


function Profile() {
    // switch profile type by changing the userProfile Ex: shelterProfile, businessProfile, newBusinessProfile and petOwnerProfile
    const [userProfile, setUserProfile] = useState(businessProfile);
    const [selfView, setSelfView] = useState(true);
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