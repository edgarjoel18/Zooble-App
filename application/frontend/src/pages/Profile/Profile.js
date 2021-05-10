import { useContext, useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';

// Import components
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';
import Spinner from '../../components/UI/Spinner/Spinner';
import { RedirectPathContext } from '../../context/redirect-path';

import styles from './Profile.module.css'
import axios from 'axios';

function Profile({appUser}) {
    console.log("appUser: ", appUser);

    const [fetchedProfile,setFetchedProfile] = useState({});
    const [fetchedPhotoPosts, setFetchedPhotoPosts] = useState([]);
    const [fetchedPets, setFetchedPets] = useState([]);
    const [taggedPosts, setTaggedPosts] = useState([]);
    const [fetchedHours, setFetchedHours] = useState([]);
    const [fetchedAddress, setFetchedAddress] = useState([]);
    const [fetchedPhoneNumber, setFetchedPhoneNumber] = useState('');

    const redirectContext = useContext(RedirectPathContext);

    const {profileID} = useParams();
    console.log("profileID: ",profileID);

    useEffect(() =>{
        redirectContext.updateLoading(true);
        axios.get('/api/profile',{params: {profileID: profileID}})
        .then(response =>{
            console.log(response);
            console.log('Fetched Profile: ', response.data);
            setFetchedProfile(response.data);
        })
        .catch(err =>{
            redirectContext.updateLoading(false);
            console.log(err)
        })

        axios.get('/api/get-photo-posts',{params: {profileID: profileID}})
        .then(response =>{
            console.log(response)
            console.log(response.data);
            setFetchedPhotoPosts(response.data);
        })
        .catch(err =>{
            redirectContext.updateLoading(false);
            console.log(err)
        })

        axios.get('/api/get-current-user-pets',{params: {profileID: profileID}})
        .then(response =>{
            console.log(response)
            console.log(response.data);
            setFetchedPets(response.data);
        })
        .catch(err =>{
            redirectContext.updateLoading(false);
            console.log(err)
        })

        axios.get('/api/tagged-posts',{params: {profileID: profileID}})
        .then(response =>{
            console.log(response)
            console.log("taggedPosts: ",response.data);
            setTaggedPosts(response.data);
            redirectContext.updateLoading(false);
        })
        .catch(err =>{
            redirectContext.updateLoading(false);
            console.log(err)
        })

        axios.get('/api/business-hours',{params: {profileID: profileID}})
        .then(response =>{
            console.log('/api/business-hours: ',response);
            let hoursArray = [];
            // Object.keys(response.data).map(key => {
            //     hoursArray.push
            // })
            setFetchedHours(response.data);
        })
        .catch(err =>{
            console.log(err);
        })

        axios.get('/api/business-address',{params: {profileID: profileID}})
        .then(response =>{
            console.log('/api/business-address: ',response.data.address);
            setFetchedAddress(response.data.address);
        })
        .catch(err =>{
            console.log(err);
        })

        axios.get('/api/business-phone-number',{params: {profileID: profileID}})
        .then(response =>{
            console.log('/api/business-phone-number: ', response.data);
            setFetchedPhoneNumber(response.data.phone_num);
        })
        .catch(err =>{
            console.log(err);
        })
    },[profileID])

    useEffect(()=>{
        console.log("Type of profileID: ", typeof profileID)
        console.log("Type of appUser.profileID: ", typeof appUser.profileID)

        if(parseInt(appUser.profileID) == profileID){
            console.log("Owner of the Profile!")
            setSelfView(true);
        }
    },[appUser])



    // ROUTING FOR THE DYNAMIC PROFILE PAGES 
    const [email, setEmail] = useState('')
    const [username, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    
    // console.log(appUser);
    // switch profile type by changing the userProfile Ex: shelterProfile, businessProfile, newBusinessProfile and petOwnerProfile
    const [userProfile, setUserProfile] = useState();
    const [selfView, setSelfView] = useState(false);

    function updateProfileHandler(type, value) {
        if (type === 'address' || type === 'phone' || type === 'hours') {
            // console.log('value is ' + value + 'type is ' + type);
            setUserProfile(() => ({
                ...userProfile,
                contactInfo: {
                ...userProfile.contactInfo,
                [type]: value
                }
            }));
        }
        else {
            // console.log('[value] is ' + value + ' and [type] is ' + type);
            setUserProfile(() => ({
                ...userProfile,
                [type]: value
            }));
        }
        // console.log('updateProfileHandler');
    }

    function toggleSelfViewHandler() {
        setSelfView(!selfView);
        let button = document.getElementById('profile-button'); // Maybe change the ID name to somthing more specific - Wameedh
        selfView ? button.className = styles.SwitchSelf : button.className = styles.SwitchVistor;
    }

    // console.log(userProfile);

    let displayProfile = <Spinner />

    if (!redirectContext.loading){
        displayProfile = (
            <>
                <ProfileInfo 
                    appUser={appUser} 
                    isSelfView={selfView} 
                    profile={fetchedProfile}
                    updateProfile={updateProfileHandler} 
                />
                <div className={styles.Bottom}>
                    <AboutMe
                        aboutMeBody={fetchedProfile.about_me}
                        hours={fetchedHours}
                        phoneNumber={fetchedPhoneNumber}
                        address={fetchedAddress}
                        isSelfView={selfView} 
                        profile={fetchedProfile} 
                        updateProfile={updateProfileHandler}
                    />
                    <ProfileContent
                        photoPosts={fetchedPhotoPosts}
                        taggedPosts={taggedPosts}
                        pets={fetchedPets}
                        isSelfView={selfView} 
                        profile={fetchedProfile} 
                        updateProfile={updateProfileHandler} 
                    />
                </div>
            </>
        );
    }

    return (
        <div className={styles.Profile} >
            {displayProfile}
        </div>
    )
}

export default Profile;