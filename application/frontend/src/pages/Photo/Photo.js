import React, { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import styles from './Photo.module.css';

import PostModal from '../../components/Modals/PostModal'


function Photo() {
    const [name, setName] = useState(''); 
    let location = useLocation();
    let history = useHistory();

    const photos = [
        {   
            post_id: 1,
            user_display_name: name,
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {   
            post_id: 2,
            user_display_name: name,
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            likes: 10,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 3,
            user_display_name: name,
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            likes: 20,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 4,
            user_display_name: name,
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 5,
            user_display_name: name,
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 4,
            user_display_name: name,
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        }
    ];


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setName(query.get('name'));
    } , [])


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

    return (
        <>
        <div className={styles.Photo} >
            <div className={styles.NameDiv} >
                <h1>{name + '\'s Photos'}</h1>
                <p onClick={() => history.push('/Profile')} >Back to Profile</p>
            </div>
            <div className={styles.PhotosContainer} >
                {photos.map((photo) => (
                    <div onClick={() =>presentPostModal(photo)}>
                        <img key={photo.post_id} className={styles.Image} src={photo.prof_pic} alt='No Image Found' />
                    </div>
                ))}
            </div>
        </div>
        <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost}/>
        </>
    )
}

export default Photo;