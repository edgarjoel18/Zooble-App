import React, { useEffect, useState } from 'react';

import Tab from './Tab/Tab';
import EditButton from '../Buttons/EditButton'

import styles from './AboutMe.module.css';


import EditBusinessHours from '../../components/Modals/EditBusinessHours'

const shelterProfileTabs = ["About", "Contact Info"]//, "Recent Posts"]
const businessProfileTabs = ["About", "Business Info"]//, "Recent Posts"]
const petOwnerProfileTabs = ["About"]//, "Recent Posts"]

function AboutMe(props) {
    const [selected, setSelected] = useState('About');
    //const [address, setAddress] = useState('');
    //const [phone, setPhone] = useState('');
    //const [hours, setHours] = useState({});
    //const [about, setAbout] = useState('');
    const [changing, setChanging] = useState(false);
    const [labelSelected, setLabelSelected] = useState();

    const [editHoursDisplay, setEditHoursDisplay] = useState(false);

    // useEffect(() => {
    //     setPhone(shelterInfo.phone);
    //     setHours(shelterInfo.hours);
    //     setAbout(shelterAbout);
    // }, [])
    

    // limited time editing
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('Finished typing')
    //         setChanging(false);
    //     }, 3000)

    //     return (() => {
    //         clearTimeout(timer);
    //     });


    // }, [address, phone, changing])

    function onTabClickHandler(id) {
        setSelected(id);
    }

    function changingInfoHandler(label) {
        setChanging(true);
        setLabelSelected(label);
        console.log(label)
    }

    function cancelEditingHandler() {
        setChanging(false);
        setLabelSelected('');
        console.log('cancel')
    }

    function autoGrowHandler(event) {
        let address = document.getElementById('tab-address');
        address.style.height = '45px';
        console.log(address.scrollHeight);
        if (address.scrollHeight < 105) {
            props.updateProfile('address', event.target.value);
            address.style.height = address.scrollHeight + 'px' 
        }
        else 
            address.style.height = '105px';
    }


    let profileTabs = null;
    // let displayPetOwnerLink = null;
    switch (props.profile.accountType) {
        case 'shelter':
            profileTabs = shelterProfileTabs;
            break;
        case 'business':
            profileTabs = businessProfileTabs;
            break;
        case 'pet owner':
            profileTabs = petOwnerProfileTabs;
            break;
        case 'pet':
            profileTabs = petOwnerProfileTabs;
            // displayPetOwnerLink = (
            //     <div>
            //         <span className={styles.PetOwnerLinkLabel} >My Owner: </span>
            //         <Link to="/Profile/Alex" >{props.profile.petOwner}</Link>
            //     </div>
            // )
            break;
        default:
            profileTabs = null;
    }

    let tabs = profileTabs.map(tab => (
        <Tab key={tab} id={tab} section={tab} selected={selected} clicked={onTabClickHandler} accountType={props.profile.accountType} />
    ))

    let content = null; 
    switch (selected) {
        case 'About':
            content = (
                <div>
                    {/* {displayPetOwnerLink} */}
                    <textarea 
                        className={styles.TextArea} 
                        value={props.profile.about} 
                        onChange={event => props.updateProfile('about', event.target.value)}
                        readOnly={!changing || !(labelSelected === 'about')}
                        rows='14' 
                        cols='50' 
                    />
                    { props.isSelfView && ((labelSelected !== 'about') ? 
                        // <button onClick={() => changingInfoHandler('about')} >edit</button>
                        <EditButton edit clicked={() => changingInfoHandler('about')}>Edit</EditButton> 
                        :
                        <EditButton style={{float: 'right'}} save clicked={cancelEditingHandler}>Save</EditButton>
                        )
                    }
                </div>
            );
            break;
        case 'Contact Info':
        case 'Business Info':
            content = (
                <div>
                    {
                        props.isSelfView && (labelSelected !== 'address') && 
                        // <button onClick={() => changingInfoHandler('address')} >edit</button>
                        <EditButton edit clicked={() => changingInfoHandler('address')}>Edit</EditButton>
                    }
                    <label for="address" >Address: </label>
                    <textarea 
                        id="tab-address"
                        value={props.profile.contactInfo.address} 
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
                        <React.Fragment>
                            <EditButton style={{float: 'right'}} save clicked={cancelEditingHandler}>Save</EditButton>
                            <br />
                        </React.Fragment>
                    }
                    {
                        props.isSelfView && (labelSelected !== 'phone number') && 
                        //<button onClick={() => changingInfoHandler('phone number')} >edit</button>
                        <EditButton edit clicked={() => changingInfoHandler('phone number')}>Edit</EditButton>
                    }
                    <label for="phone" >Phone Number: </label>
                    <input 
                        id="phone"
                        type="tel" 
                        value={props.profile.contactInfo.phone} 
                        readOnly={!changing || !(labelSelected === 'phone number')}
                        maxLength = "20"
                        onKeyPress={event => {
                            if(event.key === 'Enter'){
                                cancelEditingHandler();
                            }
                          }}
                        onChange={event => props.updateProfile('phone', event.target.value)} 
                    />
                    {
                        (labelSelected === 'phone number') && 
                        // <button style={{marginLeft: '5px'}} onClick={cancelEditingHandler} >Save</button>
                        <EditButton save clicked={cancelEditingHandler}>Save</EditButton>
                    }
                    <br />
                    {/* // need to make a modal here to set hours  */}
                    <div className={styles.HoursDiv} >
                        <div>
                            {
                                props.isSelfView && (labelSelected !== 'hours') && 
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
                        {/* {Object.keys(props.profile.contactInfo.hours).map(key => (
                            <div className={styles.Days} key={key} >
                                <label>{key}: </label>
                                <span >{props.profile.contactInfo.hours[key]}</span>
                            </div>
                        ))} */}
                        <table className={styles['hours-table']}  >
                            {Object.keys(props.profile.contactInfo.hours).map(key => (
                                <tr className={styles['hours-table-row']} key={key} >
                                    <th className={styles['hours-table-header']} >{key}: </th>
                                    <td className={styles['hours-table-cell']} >{props.profile.contactInfo.hours[key]}</td>
                                </tr>
                            ))}
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
        <EditBusinessHours display={editHoursDisplay} onClose={()=> {
            cancelEditingHandler(); 
            setEditHoursDisplay(false);
            }}/>
        </>
    );
}

export default AboutMe;