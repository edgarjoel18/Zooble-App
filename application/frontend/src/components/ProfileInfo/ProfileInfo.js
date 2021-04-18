import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import shelterImg from '../../images/shelterProfile.jpg';
import businessImg from '../../images/businessProfile.jpg';
import petOwnerImg from '../../images/petOwnerProfile.jpg';
import defaultImg from '../../images/noImage.jpg';
import arrow from '../../images/Arrow.png';
import styles from './ProfileInfo.module.css';

import SendAMessage from '../../components/Modals/SendAMessage';
import Backdrop from '../UI/Backdrop/Backdrop';

function ProfileInfo(props) {
    //const [profilePic, setProfilePic] = useState('');
    //const [profileTitle, setProfileTitle] = useState('');
    const [editing, setEditing] = useState(false);
    const [follow, setFollow] = useState(false); // update this from backend
    const [showBackdrop, setShowBackdrop] = useState(false);

    const [sendAMessageDisplay,setSendAMessageDisplay] = useState(false);

    useEffect(() => {
        //setProfileTitle('Burgsdale Pet Shelter');
        //setProfilePic(shelterImg);
    },[]);

    function cancelEditHandler() {
        setEditing(false);
    }

    function sendAMessage(){
        setSendAMessageDisplay(true);
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

    function showDropdown() {
        setShowBackdrop(true);
        let dropDownContent = document.getElementById('dropDownContent');
        dropDownContent.className = styles.DropdownContent;
    }

    function closeDropdown() {
        setShowBackdrop(false);
        let dropDownContent = document.getElementById('dropDownContent');
        dropDownContent.className = styles.DropdownHidden;
    }

    console.log('[Image] is ' + props.profile.userPicture);
    let img = null;
    switch(props.profile.userPicture) {
        case 'shelterImage' :
            img = shelterImg;
            break;
        case 'businessImage' :
            img = businessImg;
            break;
        case 'petOwnerImage' :
            img = petOwnerImg;
            break;
        case 'petImage' :
            img = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg';
            break
        default:
            img = defaultImg;
    }

    let displayAccountInfo = null;
    switch(props.profile.accountType) {
        case 'shelter' :
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {!props.isSelfView ? (
                        // <select 
                        //     name="search-category" 
                        //     value='Follow'
                        //     className={styles.Dropdown} 
                        // >
                        //     <option >Followers</option>
                        // </select>
                        // ) :
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div className={styles.threeDots} onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} >Followers</Link>
                            </div>
                        </React.Fragment>
                        ):
                        (
                            <button className={styles.FristButton} >Followers</button>
                        )
                    }
                    {!props.isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
            )
            break;
        case 'business' :
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {!props.isSelfView ? (
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div className={styles.threeDots} onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} >Followers</Link>
                            </div>
                        </React.Fragment>
                        ):
                        (
                            <button className={styles.FristButton} >Followers</button>
                        )
                    }
                    {!props.isSelfView && <button className={styles.Button} onClick={sendAMessage} >Message</button>}
                </div>
                
            )
            break;
        case 'pet owner' :
        case 'pet':
            displayAccountInfo = (
                <div className={styles.ButtonContainer} >
                    {/* {
                        props.isSelfView ? 
                        <button className={styles.FristButton} >Followers</button> :
                        <button className={styles.FristButton} >Follow</button>
                    } */}
                    {!props.isSelfView ? (
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div className={styles.threeDots} onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} >Followers</Link>
                            </div>
                        </React.Fragment>
                        ):
                        (
                            <button className={styles.FristButton} >Followers</button>
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
                        <button 
                        className={styles.EditButton} 
                        onClick={() => setEditing(true)}  
                        >
                            edit
                        </button>
                    }
                    <h1 className={styles.UserName} >
                        <input 
                            value={props.profile.userName} 
                            readOnly={!editing}
                            onChange={event => props.updateProfile('userName', event.target.value)} 
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
                {/* <div className={styles.ButtonContainer} >
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
                </div> */}
                {displayAccountInfo}
            </div>
            <SendAMessage display={sendAMessageDisplay} onClose={()=> setSendAMessageDisplay(false)}/>
        </div>
    );
}

export default ProfileInfo;