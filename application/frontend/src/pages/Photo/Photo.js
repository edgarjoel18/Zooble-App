import React, { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import styles from './Photo.module.css';

import PostModal from '../../components/Modals/PostModal'

const dummyPhotos = [
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
    const [editing, setEditing] = useState(false);
    const [photos, setPhotos] = useState(dummyPhotos)
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setName(query.get('name'));
    } , [])


    const [postModalDisplay, setPostModalDisplay] = useState(false);

    function closePostModal(){
        console.log('exit button clicked')
        setPostModalDisplay(false);
    }
    function presentPostModal(postImage){
        console.log('clicked on image');
        setPostModalDisplay(true);
    }

    function deletePhoto(id) {
        console.log('[deletePhoto] ' + id);
        // display modal here
        let tempPhotos = photos.filter(photo => photo.pet_id != id);
        setPhotos(tempPhotos);
    }

    let displayEditing = (
        <div className={styles.PhotosContainer} >
            {photos.map((photo) => (
                <div onClick={() =>presentPostModal()}>
                 {/* <div onClick={() => deletePhoto(photo.pet_id)}> */}
                    <img key={photo.pet_id} className={styles.Image} src={photo.profile_pic} alt='No Image Found' />
                </div>
            ))}
        </div>
    )

    if (editing) {
        displayEditing  = (
            <div className={styles.PhotosContainer} >
                {photos.map(photo => (
                    <div onClick={() => deletePhoto(photo.pet_id)}>
                        <img key={photo.pet_id} className={styles.Image} src={photo.profile_pic} alt='No Image Found' />
                    </div>
                ))}
            </div>
        )     
    }         

    return (
        <>
            <div className={styles.Photo} >
                <div className={styles.NameDiv} >
                    <div className={styles.NameDivLeft} >
                        <h1>{name + '\'s Photos'}</h1>
                        <button onClick={() => setEditing(!editing)} >{editing ? 'Finish Editing' : 'Edit'}</button>
                    </div>
                    <div className={styles.NameDivRight} >
                        {/* <button>filter</button> */}
                        <p onClick={() => history.goBack()} >Back to Profile</p>
                    </div>
                </div>
                {/* <div className={styles.PhotosContainer} >
                    {photos.map((photo) => (
                        <div onClick={() =>presentPostModal()}>
                            <img key={photo.pet_id} className={styles.Image} src={photo.profile_pic} alt='No Image Found' />
                        </div>
                    ))}
                </div> */}
                {displayEditing}
            </div>
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={{}}/>
        </>
    )
}

export default Photo;