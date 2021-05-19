import { useEffect, useState } from 'react';

import EditAddress from '../../components/Modals/EditAddress'

import Tab from './Tab/Tab';
import EditButton from '../Buttons/EditButton'

import styles from './AboutMe.module.css';


import EditBusinessHours from '../../components/Modals/EditBusinessHours'
import axios from 'axios';

const shelterProfileTabs = ["About", "Contact Info"]//, "Recent Posts"]
const businessProfileTabs = ["About", "Business Info"]//, "Recent Posts"]
const petOwnerProfileTabs = ["About"]//, "Recent Posts"]

function AboutMe({aboutMeBody, profile, updateProfile, isSelfView, address, phoneNumber, hours, profileID}) {
    console.log("profile: ", profile)

    //not sure if these need to have state yet
    let latitude; 
    let longitude;
    //not sure if these need to have state yet
    
    const [selected, setSelected] = useState('About');
    const [changing, setChanging] = useState(false);
    const [labelSelected, setLabelSelected] = useState();

    const [editHoursDisplay, setEditHoursDisplay] = useState(false);
    const [editAddressDisplay, setEditAddressDisplay] = useState(false);

    const [aboutMeContent, setAboutMeContent] = useState(aboutMeBody);
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [hoursState, setHoursState] = useState({});

    console.log('location is ' + address);
    console.log('phone is ' + phone);

    let hoursLabels = [];

    useEffect(() =>{
        axios.get('/api/hours',{params: {profileID: profileID}})
        .then(response =>{
            console.log('/api/hours: ',response.data);
            setHoursState(response.data);
            console.log('hoursState: ', hoursState)
        })
        .catch(err =>{
            console.log(err);
        })

        axios.get('/api/business-address',{params: {profileID: profileID}})
        .then(response =>{
            console.log('/api/business-address: ',response.data.address);
            setLocation(response.data.address);
        })
        .catch(err =>{
            console.log(err);
        })

        axios.get('/api/business-phone-number',{params: {profileID: profileID}})
        .then(response =>{
            console.log('/api/business-phone-number: ', response.data);
            setPhone(response.data.phone_num);
        })
        .catch(err =>{
            console.log(err);
        })
    },[profileID])

    // limited time editing
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('Finished typing')
    //         setChanging(false);
    //     }, 3000)

    //     return (() => {
    //         clearTimeout(timer);
    //     });

    // useEffect(()=>{
    //     let hoursLabels = ['Sunday: ','Sunday: ', 'Monday: ','Monday: ', 'Tuesday: ', 'Tuesday: ', 'Wednesday: ','Wednesday: ', 'Thursday: ', 'Thursday: ','Friday: ','Friday: ', 'Saturday: ', 'Saturday: '];
    //     for(let i = 0; i < hours.length; i+=2){
    //         hoursDisplay.push(<li>{hoursLabels[i]}: {hours[i]}-{hours[i+1]}</li>)
    //     }
    //     console.log('hoursDisplay: ', hoursDisplay);
    // }, [])


    // }, [address, phone, changing])

    function submitAboutMeEdit(){
        console.log('about me content is ' + aboutMeContent)
        axios.post("/api/about-me",{
            newAboutMe: aboutMeContent,
            profileID: profile.profile_id
        })
        .then(response =>{
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    //I'll handle the location edit later - Daniel


    function submitPhoneEdit(){
        console.log('updatedPhone is ' + phone)
        axios.post("/api/phone-number",{
            newPhoneNumber: phone
        })
        .then(response =>{
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    function onTabClickHandler(id) {
        setSelected(id);
    }

    function changingInfoHandler(label) {
        setChanging(true);
        setLabelSelected(label);
        console.log(label)
    }

    function cancelEditingHandler() {
        console.log("cancel editing handler");
        setChanging(false);
        setLabelSelected('');
        console.log('cancel')
    }

    function autoGrowHandler(event) {
        let address = document.getElementById('tab-address');
        address.style.height = '45px';
        console.log(address.scrollHeight);
        if (address.scrollHeight < 105) {
            setLocation(event.target.value);
            address.style.height = address.scrollHeight + 'px' 
        }
        else 
            address.style.height = '105px';
    }


    let profileTabs = null;
    // let displayPetOwnerLink = null;
    switch (profile.type) {
        case 'Shelter':
            profileTabs = shelterProfileTabs;
            break;
        case 'Business':
            profileTabs = businessProfileTabs;
            break;
        case 'PetOwner':
            profileTabs = petOwnerProfileTabs;
            break;
        case 'Pet':
            profileTabs = petOwnerProfileTabs;
            // displayPetOwnerLink = (
            //     <div>
            //         <span className={styles.PetOwnerLinkLabel} >My Owner: </span>
            //         <Link to="/Profile/Alex" >{props.profile.petOwner}</Link>
            //     </div>
            // )
            break;
        default:
            profileTabs = ["No Tabs"];
    }

    let tabs = profileTabs.map(tab => (
        <Tab key={tab} id={tab} section={tab} selected={selected} clicked={onTabClickHandler} accountType={profile.type} />
    ))

    console.log('hours is ' + JSON.stringify(hours));
    let content = null; 
    switch (selected) {
        case 'About':
            content = (
                <div>
                    {/* {displayPetOwnerLink} */}
                    <textarea 
                        className={styles.TextArea} 
                        placeholder='Write down something to share with others😃'
                        value={aboutMeContent} 
                        onChange={event => setAboutMeContent(event.target.value)}
                        readOnly={!changing || !(labelSelected === 'about')}
                        rows='14' 
                        cols='50' 
                    />
                    { isSelfView && ((labelSelected !== 'about') ? 
                        // <button onClick={() => changingInfoHandler('about')} >edit</button>
                        <EditButton edit clicked={() => changingInfoHandler('about')}>Edit</EditButton> 
                        :
                        <EditButton style={{float: 'right'}} save clicked={() => {
                            cancelEditingHandler();
                            submitAboutMeEdit();
                        }}>Save</EditButton>)
                    }
                </div>
            );
            break;
        case 'Contact Info':
        case 'Business Info':
            content = (
                <div>
                    {
                        isSelfView && (labelSelected !== 'address') && 
                        // <button onClick={() => changingInfoHandler('address')} >edit</button>
                        <EditButton edit clicked={() => setEditAddressDisplay(true)}>Edit</EditButton>
                    }
                    <label for="tab-address" >Address: </label>
                    <textarea 
                        id="tab-address"
                        value={location} 
                        readOnly={!changing || !(labelSelected === 'address')}
                        onChange={event => autoGrowHandler(event)} 
                        className={styles.AddressTextArea}
                        rows='1' 
                        cols='51' 
                    />
                    <br />
                    {
                        (labelSelected === 'address') && 
                        //<button style={{marginLeft: '5px', float: 'right'}} onClick={cancelEditingHandler} >Save</button>
                        <>
                            {/* <EditButton style={{float: 'right'}} save clicked={cancelEditingHandler}>Save</EditButton> */}
                            {/* <EditButton style={{float: 'right'}} save clicked={() => {
                                cancelEditingHandler();
                                submitLocationEdit();
                            }}>Save</EditButton> */}
                            <br />
                        </>
                    }
                    {
                        isSelfView && (labelSelected !== 'phone number') && 
                        //<button onClick={() => changingInfoHandler('phone number')} >edit</button>
                        <EditButton edit clicked={() => changingInfoHandler('phone number')}>Edit</EditButton>
                    }
                    <label for="phone" >Phone Number: </label>
                    <input 
                        id="phone"
                        type="tel" 
                        // value={`(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6,10)}`} 
                        value={phone}
                        readOnly={!changing || !(labelSelected === 'phone number')}
                        maxLength = "10"
                        onKeyPress={event => {
                            if(event.key === 'Enter'){
                                cancelEditingHandler();
                            }
                          }}
                        onChange={event => setPhone(event.target.value)} 
                    />
                    {
                        (labelSelected === 'phone number') && 
                        // <button style={{marginLeft: '5px'}} onClick={cancelEditingHandler} >Save</button>
                        // <EditButton save clicked={cancelEditingHandler}>Save</EditButton>
                        <EditButton save clicked={() => {
                            cancelEditingHandler();
                            submitPhoneEdit();
                        }}>Save</EditButton> 
                    }
                    <br />
                    {/* // need to make a modal here to set hours  */}
                    <div className={styles.HoursDiv} >
                        <div>
                            {
                                isSelfView && (labelSelected !== 'hours') && 
                                //<button onClick={() => changingInfoHandler('hours')} >edit</button>
                                <EditButton edit clicked={() => {
                                    setEditHoursDisplay(true);
                                    changingInfoHandler('hours')
                                    }}
                                >
                                    Edit
                                </EditButton>
                            }
                            <label>Hours: </label>
                        </div>
                        <table className={styles['hours-table']} >
                            {Object.keys(hoursState).map((key, index) => {
                                console.log('mapping hoursState')
                                console.log('hoursState[key]: ',hoursState[key])

                                if (index % 2 === 1)
                                    return null;
                                
                                let day = key.substr(0, 3);
                                console.log(day)
                        
                                return <tr className={styles['hours-table-row']} key={key}>
                                    <th className={styles['hours-table-header']} >{day[0].toUpperCase() + day.substring(1)}: </th>                              
                                    <td className={styles['hours-table-cell']}>{hoursState[key].value !== "00:00:00" ? <span >{hoursState[key].label + " - " + hoursState[day +'_close'].label}</span> : <span>Closed</span>}</td>
                                </tr>
                            })}
                        </table>
                    </div>
                    {/* {
                        props.isSelfView && (labelSelected === 'hours') && 
                        //<button style={{marginLeft: '5px', float: 'right'}} onClick={cancelEditingHandler} >Save</button>
                        <EditButton style={{float: 'right'}} save clicked={cancelEditingHandler}>Save</EditButton>
                    } */}
                </div>
            );
            break;
        case 'Recent Posts':
            content = <span>Coming soon</span>
            break;
        default:
            content = <span>Error</span>;
    }

    return (
        <>
        <div className={styles.AboutMe} >
            <div style={{display: "flex", flexDirection: "column"}} >
                {tabs}
            </div>
            <div className={styles.Container} >
                <div className={styles.Content} >
                    {content}
                </div>
            </div>
        </div>
        <EditBusinessHours display={editHoursDisplay} hours={hoursState} setHours={setHoursState} onClose={()=> {
            cancelEditingHandler(); 
            setEditHoursDisplay(false);
            }}/>
        <EditAddress display={editAddressDisplay} setAddressState={setLocation} onClose={() => setEditAddressDisplay(false)}/>
        </>
    );
}

export default AboutMe;