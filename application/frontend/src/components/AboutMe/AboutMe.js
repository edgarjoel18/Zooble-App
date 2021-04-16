import React, { useEffect, useState } from 'react';

import Tag from './Tag/Tag';

import styles from './AboutMe.module.css';

const shelterProfile = ["About Us", "Contact Info", "Recent Posts"]
const bussinessProfile = ["About Us", "Business Info", "Recent Posts"]
const petOwnerProfile = ["About Us", "Recent Posts"]
const shelterAbout = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. ';

const shelterInfo = {
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
};

function AboutMe() {
    const [selected, setSelected] = useState('About Us');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [hours, setHours] = useState({});
    const [about, setAbout] = useState('');
    const [changing, setChanging] = useState(false);
    const [labelSelected, setLabelSelected] = useState();

    useEffect(() => {
        setPhone(shelterInfo.phone);
        setAddress(shelterInfo.address);
        setHours(shelterInfo.hours);
        setAbout(shelterAbout);
    }, [])

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

    let tags = bussinessProfile.map(tag => (
        <Tag key={tag} id={tag} section={tag} selected={selected} clicked={onTagClickHandler} />
    ))

    let content = null; 
    switch (selected) {
        case 'About Us':
            content = (
                <div>
                    <textarea 
                        className={styles.TextArea} 
                        value={about} 
                        onChange={event => setAbout(event.target.value)}
                        readOnly={!changing || !(labelSelected === 'about')}
                        rows='15' 
                        cols='50' 
                    />
                    {(labelSelected !== 'about') ? 
                        <button onClick={() => changingInfoHandler('about')} >edit</button>:
                        <button style={{marginLeft: '5px', float: 'right'}} onClick={cancelEditingHandler} >Confirm</button>
                    }
                </div>
            );
            break;
        case 'Contact Info':
        case 'Business Info':
            content = (
                <div>
                    {(labelSelected !== 'address') && <button onClick={() => changingInfoHandler('address')} >edit</button>}
                    <label>Address: </label>
                    <input 
                        type="text" 
                        value={address} 
                        readOnly={!changing || !(labelSelected === 'address')}
                        onChange={(event) => setAddress(event.target.value)} 
                    />
                    {
                        (labelSelected === 'address') && 
                        <button style={{marginLeft: '5px'}} onClick={cancelEditingHandler} >Confirm</button>
                    }
                    <br 
                    />
                    {(labelSelected !== 'phone number') && <button onClick={() => changingInfoHandler('phone number')} >edit</button>}
                    <label>Phone Number: </label>
                    <input 
                        type="text" 
                        value={phone} 
                        readOnly={!changing || !(labelSelected === 'phone number')}
                        onChange={(event) => setPhone(event.target.value)} 
                    />
                    {
                        (labelSelected === 'phone number') && 
                        <button style={{marginLeft: '5px'}} onClick={cancelEditingHandler} >Confirm</button>
                    }
                    <br 
                    />
                    {(labelSelected !== 'hours') && <button onClick={() => changingInfoHandler('hours')} >edit</button>}
                    <label>Hours: </label>
                    {Object.keys(hours).map(key => (
                        <div key={key} >
                            <label>{key}: </label>
                            <span>{hours[key]}</span>
                        </div>
                    ))}
                    {
                        (labelSelected === 'hours') && 
                        <button style={{marginLeft: '5px', float: 'right'}} onClick={cancelEditingHandler} >Confirm</button>
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