import { useState, useEffect, useCallback } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import styles from './Feed.module.css'
import bus_prof_pic from '../../images/businessProfile.jpg'
import shel_prof_pic from '../../images/shelterProfile.jpg'
import own_prof_pic from '../../images/petOwnerProfile.jpg'
import PostModal from '../../components/Modals/PostModal'

import {useDropzone} from 'react-dropzone'

import ArrowIcon from '../../images/Created Icons/Arrow.svg'
import axios from 'axios';

// import ClipLoader from "react-spinners/ClipLoader";

//make this into environment variable before deploying!
const apiGatewayURL = 'https://5gdyytvwb5.execute-api.us-west-2.amazonaws.com/default/getPresignedURL' 

function Feed() {

    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [feedPosts, setFeedPosts] = useState([
        {
            post_id: 1,
            user_display_name: 'Paw Spa',
            link: "/Profile/BusinessId=2",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/PawSpaPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 2,
            user_display_name: 'Burgsdale Pet Shelter',
            link: "/Profile/ShelterId=2",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/BurgsdalePetShelterPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            likes: 10,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 3,
            user_display_name: 'Alex',
            link: "/Profile/PetOwnerId=1",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/AlexPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            likes: 20,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        }
    ]);

    const [selectedPost, setSelectedPost] = useState({});

    //for changing submit image button state
    const [attachedImage, setAttachedImage] = useState();  

    //creating a post display
    const [createPostDisplayName, setCreatePostDisplayName] = useState('');
    const [createPostProfilePic, setCreatePostProfilePic] = useState('');

    useEffect(() => { //get profile pic and name of user
        console.log('/api/get-feed-user');
        axios.get('/api/get-feed-user')
        .then(response =>{
            console.log(response.data);
            console.log(response.data.displayName);
            setCreatePostDisplayName(response.data.displayName);
            setCreatePostProfilePic(response.data.profile_pic_link);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })
    }, [])



    const [myFiles, setMyFiles] = useState([])

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        myFiles.forEach(file => URL.revokeObjectURL(file.preview));
      }, [myFiles]);

    const onDrop = useCallback(acceptedFiles => {
        setMyFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
        console.log(myFiles)
    }, [myFiles])
    
    const removeAll = () => {
        setMyFiles([])
    }
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 5242880, 
        accept: "image/jpeg", 
        multiple: false
    })

    function submitPost(){
        let config = {
            headers: {
                'Content-type': 'image/jpeg'  //configure headers for put request to s3 bucket
            }
        }

        if(attachedImage){
            //try to upload photo first
            axios.get(apiGatewayURL)  //first get the presigned s3 url
            .then((response) =>{
                console.log(response)
                console.log(response.data)
                let presignedFileURL = response.data.photoFilename;  //save this url to add to database later
                console.log(attachedImage);
                axios.put(response.data.uploadURL, attachedImage,config).then((response) =>{  //upload the file to s3
                    console.log(response);
                    console.log(response.data);
                })
                .catch((err) =>{
                    console.log(err);
                    if(err.response.status == 403){
                        //display error message to user
                    }
                    //break out of this function //presigned s3 url will automatically expire so no harm done
                })
            })
            .catch((err) =>{
                console.log(err);
            })
        }

    }

    function openPostModal(feedPost) {
        console.log(feedPost);
        setSelectedPost(feedPost);
        setPostModalDisplay(true);
        return
    }

    function closePostModal() {
        setPostModalDisplay(false);
    }

    return (
        <>
            {/* <NavLink to="/Profile/Alex" style={{ textDecoration: 'none' }}>
                <div className={styles["follower-feed-header-profile"]}>
                    <img className={styles["follower-feed-header-profile-pic"]} src={own_prof_pic} />
                    <div className={styles["follower-feed-header-profile-name"]}>Alex</div>
                </div>
            </NavLink> */}
            <div className={styles["follower-feed-container"]}>
                <div className={styles["follower-feed-header"]}></div>
                <div className={styles["follower-feed-new-post"]}>
                    <img className={styles["follower-feed-new-post-pic"]} src={createPostProfilePic} />
                    <div className={styles["follower-feed-new-post-name"]}>{createPostDisplayName}</div>
                    <textarea className={styles["follower-feed-new-post-body"]} placeholder="Update your followers on what's going on with you and your pets" />
                        <section className={styles["follower-feed-new-post-attach-image"]}>
                            <div  {...getRootProps()}>
                                <input  {...getInputProps()} />
                                {myFiles.length === 0 && <div className={styles["follower-feed-new-post-attach-image-info"]}>Drag and Drop or Click to Select Image</div>}
                                {myFiles.length > 0 && <img className={styles["follower-feed-new-post-attach-image-preview"]} src={myFiles[0].preview} onClick={removeAll}/>}
                            </div>
                        </section>
                    <button className={styles["follower-feed-new-post-submit"]} >Submit</button>
                    {/* <button className={styles["follower-feed-new-post-expand-collapse"]} /> onClick={createPostOverlayToggle} */}
                </div>
                {feedPosts.length == 0 && <li>No Feed Posts</li>}
                {feedPosts && feedPosts.map((feedPost) => (
                    <div key={feedPost.post_id} className={styles["follower-feed-post"]} onClick={() => openPostModal(feedPost)} >
                        <NavLink to={feedPost.link}>
                            <img className={styles["follower-feed-post-prof_pic"]} src={feedPost.profile_pic} />
                        </NavLink>
                        <NavLink style={{textDecoration: 'none'}} to={feedPost.link}>
                        <div className={styles["follower-feed-post-name"]}>{feedPost.user_display_name}</div>
                        </NavLink>
 
                        <div className={styles["follower-feed-post-timestamp"]}>{feedPost.timestamp}</div>
                        <div className={styles["follower-feed-post-likes"]}>{feedPost.likes}</div>
                        <button className={styles['follower-feed-post-like']} />
                        {/* <div className={styles["follower-feed-post-comments"]}>10 comments</div> */}
                        <div className={styles["follower-feed-post-body"]}>{feedPost.body}</div>
                        <img className={styles["follower-feed-post-pic"]} src={feedPost.pic} />
                    </div>
                ))}
            </div>
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost} />
        </>
    )
}

export default Feed
