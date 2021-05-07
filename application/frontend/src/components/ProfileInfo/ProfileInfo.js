import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import shelterImg from '../../images/shelterProfile.jpg';
import businessImg from '../../images/businessProfile.jpg';
import petOwnerImg from '../../images/petOwnerProfile.jpg';
import defaultImg from '../../images/noImage.jpg';
import arrow from '../../images/Arrow.png';
import styles from './ProfileInfo.module.css';

import SendAMessage from '../../components/Modals/SendAMessage';
import EditPetDetails from '../Modals/EditPetDetails';
import EditButton from '../Buttons/EditButton';
import LoginRequired from '../Modals/LoginRequired';
import { RedirectPathContext } from '../../context/redirect-path';



function ProfileInfo({displayName, profilePic, appUser, profile, isSelfView, updateProfile}) {
    console.log(displayName);
    console.log(profilePic);
    console.log(appUser);
    //const [profilePic, setProfilePic] = useState('');
    //const [profileTitle, setProfileTitle] = useState('');
    const [editing, setEditing] = useState(false);
    const [follow, setFollow] = useState(false); // update this from backend
    // const [showBackdrop, setShowBackdrop] = useState(false);

    const [petType, setPetType] = useState({});
    const [petBreeds, setPetBreed] = useState([{}]);
    // const [petColors, setPetColors] = useState([]);
    // const [petSize, setPetSize] = useState();

    const [sendAMessageDisplay,setSendAMessageDisplay] = useState(false);
    const[editPetDetailsDisplay, setEditPetDetailsDisplay] = useState(false);
    const [loginRequiredDisplay, setLoginRequiredDisplay] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const redirectContext = useContext(RedirectPathContext);

    useEffect(() => {
        setPetType(profile.petType);
        setPetBreed(profile.petBreeds);
        if (redirectContext.redirectPath === location.pathname)
            redirectContext.redirectTo('/Feed');
    },[]);

    function openEditModal(){
        profile.accountType === 'pet' ?
        setEditPetDetailsDisplay(true) :
        setEditing(true);
    }

    function cancelEditHandler() {
        setEditing(false);
    }

    function sendAMessage(){
        if(appUser){
            setSendAMessageDisplay(true);
        }
        else{
            setLoginRequiredDisplay(true);
        }
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

    // function showDropdown() {
    //     setShowBackdrop(true);
    //     let dropDownContent = document.getElementById('dropDownContent');
    //     dropDownContent.className = styles.DropdownContent;
    // }

    // function closeDropdown() {
    //     setShowBackdrop(false);
    //     let dropDownContent = document.getElementById('dropDownContent');
    //     dropDownContent.className = styles.DropdownHidden;
    // }

    function onFollowHandler() {
        console.log('Follow button clicked')
        if(appUser){
            setFollow(!follow);
        }
        else{
            setLoginRequiredDisplay(true);
        }
    }

    let nameDisplay = null;
    let displayAccountInfo = null;
    let dropdownButtonStyle = null;
    follow ? dropdownButtonStyle = styles.UnfollowButton : dropdownButtonStyle = styles.DropdownButton;
    switch(profile.accountType) {
        case 'shelter' :
            nameDisplay = (
                <h1 className={styles.UserName} >
                    <input 
                        value={displayName} 
                        readOnly={!editing}
                        maxLength = "25"
                        onChange={event => updateProfile('userName', event.target.value)} 
                    />
                </h1> 
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {!isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} onClick={() => onFollowHandler()} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} >
                                        {follow ? 'Unfollow' : 'Follow'}
                                    </span>
                                    <div  >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <ul className={styles.DropdownContent}>
                                <li><NavLink className={styles.DropdownItem} to="/Followers">Followers</NavLink></li>
                            </ul>
                        </div>
                        ):
                        (
                            <button className={styles.FristButton} onClick={() => history.push('/Followers')} >Followers</button>
                        )
                    }
                    {!isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        case 'business' :
            nameDisplay = (
                <h1 className={styles.UserName} >
                    <input 
                        value={displayName} 
                        readOnly={!editing}
                        maxLength = "25"
                        onChange={event => updateProfile('userName', event.target.value)} 
                    />
                </h1> 
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {!isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} onClick={() => onFollowHandler()} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} >
                                        {follow ? 'Unfollow' : 'Follow'}
                                    </span>
                                    <div  >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <ul className={styles.DropdownContent}>
                                <li><NavLink className={styles.DropdownItem} to="/Followers">Followers</NavLink></li>
                            </ul>
                        </div>                       
                        ):
                        (
                            <button className={styles.FristButton} onClick={() => history.push('/Followers')} >Followers</button>
                        )
                    }
                    {!isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
                
            )
            break;
        case 'pet owner' :
            nameDisplay = (
                <h1 className={styles.UserName} >
                    <input 
                        value={displayName} 
                        readOnly={!editing}
                        maxLength = "25"
                        onChange={event => updateProfile('userName', event.target.value)} 
                    />
                </h1> 
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {!isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} onClick={() => onFollowHandler()} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} >
                                        {follow ? 'Unfollow' : 'Follow'}
                                    </span>
                                    <div  >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <ul className={styles.DropdownContent}>
                                <li><NavLink className={styles.DropdownItem} to="/Followers">Followers</NavLink></li>
                            </ul>
                        </div>
                        ):
                        (
                            <button className={styles.FristButton} onClick={() => history.push('/Followers')} >Followers</button>
                        )
                    }
                    {!isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        case 'pet':
            nameDisplay = (
                <React.Fragment>
                    <div style={{display: 'flex'}} >
                        <h1 className={styles.UserName}>{profile.userName ? profile.userName : 'Name of Your Pet'}</h1>
                        <h3 style={{marginLeft: '10px'}} >
                            {petType.value ? petType.value : 'Type'}
                            /
                            {petBreeds[0].value ? petBreeds[0].value : 'Breed'}
                        </h3>
                    </div>
                    <EditPetDetails 
                    display={editPetDetailsDisplay} 
                    updateProfile={updateProfile} 
                    profile={profile} 
                    onClose={()=> setEditPetDetailsDisplay(false)}
                    updatePetType={setPetType}
                    updatePetBreed={setPetBreed}
                    />
                </React.Fragment>
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {!isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} id="dropdownButton" onClick={() => onFollowHandler()} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText}>
                                        {follow ? 'Unfollow' : 'Follow'}
                                    </span>
                                    <div  >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <ul className={styles.DropdownContent}>
                                <li><NavLink className={styles.DropdownItem} to="/Followers">Followers</NavLink></li>
                                <li><NavLink className={styles.DropdownItem} to="/Profile/PetOwnerId=2">My Owner</NavLink></li>
                            </ul>
                        </div>
                        ):
                        (   
                            <React.Fragment>
                                <button className={styles.FristButton} onClick={() => history.push('/Followers')} >Followers</button>
                                <button className={styles.Button} onClick={() => history.push('/Profile/PetOwnerId=2')} >My Owner</button>
                            </React.Fragment>
                        )
                    }
                    {!isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        default:
            displayAccountInfo = null;
    }

    return (
        <div className={styles.ProfileInfo} >
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '223px'}} >
                <img className={styles.Image} src={profilePic} alt="No Image Found" />
                {/* <input type='file' onChange={event => uploadPhotoHandler(event.target.files)} /> */}
            </div>
            <div className={styles.SideContainer} >
                <div style={{display: 'flex', justifyItems: 'center'}}>
                    {
                        isSelfView && !editing && 
                        //<button className={styles.EditButton} onClick={() => openEditModal()}  >edit</button>
                        <EditButton 
                            style={{
                                alignSelf: 'center',
                                fontSize: '1.5em',
                                height: '50%',
                                outline: 'none'
                            }} 
                            edit 
                            clicked={() => openEditModal()}
                        >
                            Edit
                        </EditButton>
                    }
                    {nameDisplay}
                    {
                        isSelfView && editing && 
                        //<button className={styles.EditButton} onClick={cancelEditHandler}  >confirm</button>
                        <EditButton 
                            style={{
                                alignSelf: 'center',
                                fontSize: '1.5em',
                                height: '50%',
                                outline: 'none'
                            }} 
                            save 
                            clicked={cancelEditHandler}
                        >
                            Save
                        </EditButton>
                    }
                </div>
                {displayAccountInfo}
            </div>
            <SendAMessage display={sendAMessageDisplay} onClose={()=> setSendAMessageDisplay(false)}/>
            <LoginRequired display={loginRequiredDisplay} onClose={() =>setLoginRequiredDisplay(false)} redirect={location.pathname} />    
        </div>
    );
}

export default ProfileInfo;