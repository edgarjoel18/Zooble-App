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
import { RedirectPathContext } from '../../context/redirectPath';



function ProfileInfo(props) {
    console.log(props.appUser);
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
        setPetType(props.profile.petType);
        setPetBreed(props.profile.petBreeds);
        if (redirectContext.redirectPath === location.pathname)
            redirectContext.redirectTo('/Feed');
    },[]);

    function openEditModal(){
        props.profile.accountType === 'pet' ?
        setEditPetDetailsDisplay(true) :
        setEditing(true);
    }

    function cancelEditHandler() {
        setEditing(false);
    }

    function sendAMessage(){
        if(props.appUser){
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
        if(props.appUser){
            setFollow(!follow);
        }
        else{
            setLoginRequiredDisplay(true);
        }
    }

    console.log('[Image] is ' + props.profile.userPicture);
    let img = null;
    switch(props.profile.userPicture) {
        case 'shelter1Image' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/BadBoysDogPoundPic.jpg';
            break;
        case 'shelter2Image' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/BurgsdalePetShelterPic.jpg';
            break;
        case 'business1Image' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/BoomingPoodleGroomingPic.jpg';
            break;
        case 'business2Image' :
            img = businessImg;
            break;
        case 'petOwner1Image' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/AlexPic.jpg';
            break;
        case 'petOwner2Image' :
        img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaryPic.jpg';
        break;
        case 'petImage-Sasha' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg';
            break;
        case 'petImage-Max' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
            break;
        case 'petImage-Mimi' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg';
            break;
        case 'petImage-Juju' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg';
            break;
        default:
            img = defaultImg;
    }

    let displayName = null;
    let displayAccountInfo = null;
    let dropdownButtonStyle = null;
    follow ? dropdownButtonStyle = styles.UnfollowButton : dropdownButtonStyle = styles.DropdownButton;
    switch(props.profile.accountType) {
        case 'shelter' :
            displayName = (
                <h1 className={styles.UserName} >
                    <input 
                        value={props.profile.userName} 
                        readOnly={!editing}
                        maxLength = "25"
                        onChange={event => props.updateProfile('userName', event.target.value)} 
                    />
                </h1> 
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} onClick={() => onFollowHandler()} >
                    {!props.isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} >
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
                    {!props.isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        case 'business' :
            displayName = (
                <h1 className={styles.UserName} >
                    <input 
                        value={props.profile.userName} 
                        readOnly={!editing}
                        maxLength = "25"
                        onChange={event => props.updateProfile('userName', event.target.value)} 
                    />
                </h1> 
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} onClick={() => onFollowHandler()} >
                    {!props.isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} >
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
                    {!props.isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
                
            )
            break;
        case 'pet owner' :
            displayName = (
                <h1 className={styles.UserName} >
                    <input 
                        value={props.profile.userName} 
                        readOnly={!editing}
                        maxLength = "25"
                        onChange={event => props.updateProfile('userName', event.target.value)} 
                    />
                </h1> 
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} onClick={() => onFollowHandler()} >
                    {!props.isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} >
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
                    {!props.isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        case 'pet':
            displayName = (
                <React.Fragment>
                    <div style={{display: 'flex'}} >
                        <h1 className={styles.UserName}>{props.profile.userName ? props.profile.userName : 'Name of Your Pet'}</h1>
                        <h3 style={{marginLeft: '10px'}} >
                            {petType.value ? petType.value : 'Type'}
                            /
                            {petBreeds[0].value ? petBreeds[0].value : 'Breed'}
                        </h3>
                    </div>
                    <EditPetDetails 
                    display={editPetDetailsDisplay} 
                    updateProfile={props.updateProfile} 
                    profile={props.profile} 
                    onClose={()=> setEditPetDetailsDisplay(false)}
                    updatePetType={setPetType}
                    updatePetBreed={setPetBreed}
                    />
                </React.Fragment>
            )
            displayAccountInfo = (
                <div className={styles.ButtonContainer} onClick={() => onFollowHandler()} >
                    {!props.isSelfView ? (
                        <div style={{position: 'relative'}}>
                            <button className={dropdownButtonStyle} id="dropdownButton" >
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
                    {!props.isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        default:
            displayAccountInfo = null;
    }

    return (
        <div className={styles.ProfileInfo} >
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '223px'}} >
                <img className={styles.Image} src={img} alt="No Image Found" />
                {/* <input type='file' onChange={event => uploadPhotoHandler(event.target.files)} /> */}
            </div>
            <div className={styles.SideContainer} >
                <div style={{display: 'flex', justifyItems: 'center'}}>
                    {
                        props.isSelfView && !editing && 
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
                    {displayName}
                    {
                        props.isSelfView && editing && 
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