import React, { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import styles from './Photo.module.css';

const photos = [
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        { pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 4,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 5,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        { pet_id: 6,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        }
];

function Photo() {
    const [name, setName] = useState(''); 
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setName(query.get('name'));
    } , [])

    return (
        <div className={styles.Photo} >
            <div className={styles.NameDiv} >
                <h1>{name + '\'s Photos'}</h1>
                <p onClick={() => history.push('/Profile')} >Back to Profile</p>
            </div>
            <div className={styles.PhotosContainer} >
                {photos.map((photo) => (
                    <a href={photo.profile_pic}>
                        <img key={photo.pet_id} className={styles.Image} src={photo.profile_pic} alt='No Image Found' />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Photo;