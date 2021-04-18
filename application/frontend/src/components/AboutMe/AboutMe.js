import React, { useEffect, useState } from 'react';

import Tag from './Tag/Tag';

import styles from './AboutMe.module.css';

const shelterProfileTags = ["About", "Contact Info", "Recent Posts"]
const businessProfileTags = ["About", "Business Info", "Recent Posts"]
const petOwnerProfileTags = ["About", "Recent Posts"]

function AboutMe(props) {
    const [selected, setSelected] = useState('About');
    //const [address, setAddress] = useState('');
    //const [phone, setPhone] = useState('');
    //const [hours, setHours] = useState({});
    //const [about, setAbout] = useState('');
    const [changing, setChanging] = useState(false);
    const [labelSelected, setLabelSelected] = useState();

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

    function onTagClickHandler(id) {
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

    let profileTags = null;
    switch (props.profile.accountType) {
        case 'shelter':
            profileTags = shelterProfileTags;
            break;
        case 'business':
            profileTags = businessProfileTags;
            break;
        case 'pet owner': 
            profileTags = petOwnerProfileTags;
            break;
        default:
            profileTags = null;
    }

    let tags = profileTags.map(tag => (
        <Tag key={tag} id={tag} section={tag} selected={selected} clicked={onTagClickHandler} accountType={props.profile.accountType} />
    ))

    let content = null; 
    switch (selected) {
        case 'About':
            content = (
                <div>
                    <textarea 
                        className={styles.TextArea} 
                        value={props.profile.about} 
                        onChange={event => props.updateProfile('about', event.target.value)}
                        readOnly={!changing || !(labelSelected === 'about')}
                        rows='14' 
                        cols='50' 
                    />
                    { props.isSelfView && ((labelSelected !== 'about') ? 
                        <button onClick={() => changingInfoHandler('about')} >edit</button>:
                        <button style={{marginLeft: '5px', float: 'right'}} onClick={cancelEditingHandler} >Save</button>
                        )
                    }
                </div>
            );
            break;
        case 'Contact Info':
        case 'Business Info':
            content = (
                <div>
                    {props.isSelfView && (labelSelected !== 'address') && <button onClick={() => changingInfoHandler('address')} >edit</button>}
                    <label>Address: </label>
                    <input 
                        type="text" 
                        value={props.profile.contactInfo.address} 
                        readOnly={!changing || !(labelSelected === 'address')}
                        onChange={event => props.updateProfile('address', event.target.value)} 
                    />
                    {
                        (labelSelected === 'address') && 
                        <button style={{marginLeft: '5px'}} onClick={cancelEditingHandler} >Save</button>
                    }
                    <br />
                    {props.isSelfView && (labelSelected !== 'phone number') && <button onClick={() => changingInfoHandler('phone number')} >edit</button>}
                    <label>Phone Number: </label>
                    <input 
                        type="text" 
                        value={props.profile.contactInfo.phone} 
                        readOnly={!changing || !(labelSelected === 'phone number')}
                        onChange={event => props.updateProfile('phone', event.target.value)} 
                    />
                    {
                        (labelSelected === 'phone number') && 
                        <button style={{marginLeft: '5px'}} onClick={cancelEditingHandler} >Save</button>
                    }
                    <br />
                    {/* // need to make a modal here to set hours  */}
                    <div style={{textAlign: 'center'}}>
                    {
                        props.isSelfView && (labelSelected !== 'hours') && 
                        <button onClick={() => changingInfoHandler('hours')} >edit</button>
                    }
                    <label>Hours: </label>
                    {Object.keys(props.profile.contactInfo.hours).map(key => (
                        <div key={key} >
                            <label>{key}: </label>
                            <span >{props.profile.contactInfo.hours[key]}</span>
                        </div>
                    ))}
                    </div>
                    {
                        props.isSelfView && (labelSelected === 'hours') && 
                        <button style={{marginLeft: '5px', float: 'right'}} onClick={cancelEditingHandler} >Save</button>
                    }
                </div>
            );
            break;
        case 'Recent Posts':
            content = <p>Coming soon</p>
            break;
        default:
            content = <p>Error</p>;
    }

    return (
        <div className={styles.AboutMe} >
            <div style={{display: "flex", flexDirection: "column"}} >
                {tags}
            </div>
            <div className={styles.Container} >
                <div className={styles.Content} >
                    {content}
                </div>
            </div>
        </div>
    );
}

export default AboutMe;