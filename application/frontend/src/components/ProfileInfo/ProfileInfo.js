import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import shelterImg from '../../images/shelterProfile.jpg';
import businessImg from '../../images/businessProfile.jpg';
import petOwnerImg from '../../images/petOwnerProfile.jpg';
import defaultImg from '../../images/noImage.jpg';
import arrow from '../../images/Arrow.png';
import styles from './ProfileInfo.module.css';

import SendAMessage from '../../components/Modals/SendAMessage';
import Backdrop from '../UI/Backdrop/Backdrop';
import EditPetDetails from '../Modals/EditPetDetails';
import EditButton from '../Buttons/EditButton';

function ProfileInfo(props) {
    //const [profilePic, setProfilePic] = useState('');
    //const [profileTitle, setProfileTitle] = useState('');
    const [editing, setEditing] = useState(false);
    const [follow, setFollow] = useState(false); // update this from backend
    const [showBackdrop, setShowBackdrop] = useState(false);

    const [petType, setPetType] = useState({});
    const [petBreeds, setPetBreed] = useState([{}]);
    // const [petColors, setPetColors] = useState([]);
    // const [petSize, setPetSize] = useState();

    const [sendAMessageDisplay,setSendAMessageDisplay] = useState(false);

    const[editPetDetailsDisplay, setEditPetDetailsDisplay] = useState(false);

    let history = useHistory();

    useEffect(() => {
        setPetType(props.profile.petType);
        setPetBreed(props.profile.petBreeds);
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
                <div className={styles.ButtonContainer} >
                    {!props.isSelfView ? (
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div  onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} to="/Followers" >Followers</Link>
                            </div>
                        </React.Fragment>
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
                <div className={styles.ButtonContainer} >
                    {!props.isSelfView ? (
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div  onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} to="/Followers" >Followers</Link>
                            </div>
                        </React.Fragment>
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
                <div className={styles.ButtonContainer} >
                    {!props.isSelfView ? (
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} to="/Followers" >Followers</Link>
                            </div>
                        </React.Fragment>
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
                // <h1 className={styles.UserName} >
                //     <input 
                //         value={props.profile.userName} 
                //         readOnly={!editing}
                //         onChange={event => props.updateProfile('userName', event.target.value)} 
                //     />
                // </h1> 
                <React.Fragment>
                    <div style={{display: 'flex'}} >
                        <h1 className={styles.UserName}>{props.profile.userName}</h1>
                        <h3 style={{marginLeft: '10px'}} >{petType.value}/{petBreeds[0].value}</h3>
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
                <div className={styles.ButtonContainer} >
                    {!props.isSelfView ? (
                        <React.Fragment>
                            <Backdrop show={showBackdrop} clicked={closeDropdown} />
                            <button className={styles.DropdownButton} >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.DropdownText} onClick={() => setFollow(!follow)} >
                                        {follow ? 'Following' : 'Follow'}
                                    </span>
                                    <div onClick={showDropdown} >
                                        <img src={arrow} />
                                    </div>
                                </div>
                            </button>
                            <div className={styles.DropdownHidden} id='dropDownContent' > 
                                <Link className={styles.DropdownItem} to="/Followers" >Followers</Link>
                            </div>
                        </React.Fragment>
                        ):
                        (
                            <button className={styles.FristButton} onClick={() => history.push('/Followers')} >Followers</button>
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
        </div>
    );
}

export default ProfileInfo;