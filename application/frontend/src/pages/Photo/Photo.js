import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import styles from './Photo.module.css';

import PostModal from '../../components/Modals/PostModal';
import EditButton from '../../components/Buttons/EditButton';


function Photo() {

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setName(query.get('name'));
    } , [])
    
    const [name, setName] = useState(''); 
    const dummyPhotos = [
        {   
            post_id: 1,
            user_display_name: name,
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {   
            post_id: 2,
            user_display_name: name,
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            likes: 10,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 3,
            user_display_name: name,
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            likes: 20,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 20,
            user_display_name: name,
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 5,
            user_display_name: name,
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 4,
            user_display_name: name,
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        }
    ];

    
    const [editing, setEditing] = useState(false);
    const [photos, setPhotos] = useState(dummyPhotos)
    let location = useLocation();
    let history = useHistory();



   


    const [postModalDisplay, setPostModalDisplay] = useState(false);

    const [selectedPost, setSelectedPost] = useState({});

    function closePostModal(){
        console.log('exit button clicked')
        setPostModalDisplay(false);
    }
    function presentPostModal(post){
        setSelectedPost(post);
        console.log('clicked on image');
        setPostModalDisplay(true);
    }

    function deletePhoto(id) {
        console.log('[deletePhoto] ' + id);
        // display modal here
        let tempPhotos = photos.filter(photo => photo.post_id != id);
        setPhotos(tempPhotos);
    }

    let displayEditing = (
        <div className={styles.PhotosContainer} >
            {photos.map((photo) => (
                <div className={styles.PhotoDiv} onClick={() =>presentPostModal(photo)}>
                 {/* <div onClick={() => deletePhoto(photo.pet_id)}> */}
                    <img key={photo.post_id} className={styles.Image} src={photo.pic} alt='No Image Found' />
                </div>
            ))}
        </div>
    )

    if (editing) {
        displayEditing  = (
            <div className={styles.PhotosContainer} >
                {photos.map(photo => (
                    <div className={styles.EditingPhotoDiv} onClick={() => deletePhoto(photo.post_id)} >
                        <div>
                            <img key={photo.post_id} className={styles.Image} src={photo.pic} alt='No Image Found' />
                        </div>
                        <div className={styles.DeleteIcon} ></div>
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
                        {/* <button onClick={() => setEditing(!editing)} >{editing ? 'Finish Editing' : 'Edit'}</button> */}
                        <EditButton edit={!editing} clicked={() => setEditing(!editing)}>{editing ? 'Finish Editing' : 'Edit Photo'}</EditButton>
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
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost}/>
        </>
    )
}

export default Photo;