import { useState, useEffect, useCallback } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import Select from 'react-select';  

import styles from './Feed.module.css'

import PostModal from '../../components/Modals/PostModal'





// import ClipLoader from "react-spinners/ClipLoader";

//make this into environment variable before deploying!
const apiGatewayURL = 'https://5gdyytvwb5.execute-api.us-west-2.amazonaws.com/default/getPresignedURL' 

function Feed() {

    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [feedPosts, setFeedPosts] = useState([]);

    //creating a post display
    const [createPostDisplayName, setCreatePostDisplayName] = useState('');
    const [createPostProfilePic, setCreatePostProfilePic] = useState('');
    const [createdPostBody, setCreatedPostBody] = useState();

    //selectedPost to pass to post modal
    const [selectedPost, setSelectedPost] = useState({});

    //storing the pets available to tag in the dropdown menu
    const [taggablePets, setTaggablePets] = useState([]);

    //storing the pets that are tagged in each post to send to db
    const [taggedPets, setTaggedPets] = useState([]);

    //image upload array
    const [myFiles, setMyFiles] = useState([])

    function customTheme(theme) { //move this a separate file and import maybe?
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#B3B3B3',
                primary: '#1CB48F',
            }
        }
    }

    const customStyles = {
        control: (base, state) => ({
          ...base,
          height: '54.5px',
          'min-height': '54.5px',
          'border-radius': '7.5px',
        }),
    };


    //runs on refresh
    useEffect(() => { //get profile pic and name of user  //
        console.log('/api/get-feed-user');
        axios.get('/api/get-feed-user')
        .then(response =>{
            // console.log(response.data);
            // console.log(response.data.displayName);
            setCreatePostDisplayName(response.data.displayName);
            setCreatePostProfilePic(response.data.profile_pic_link);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })

        console.log('/api/get-feed-posts');
        axios.get('/api/get-feed-posts')
        .then(response =>{
            console.log(response.data);
            setFeedPosts(response.data);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })

        axios.get('/api/get-current-user-pets')
        .then(response =>{
            console.log(response.data);
            setTaggablePets(response.data);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })
    }, [])

    // //runs whenever the user creates a post
    // useEffect(()=>{
    //     console.log('/api/get-feed-posts');
    //     axios.get('/api/get-feed-posts')
    //     .then(response =>{
    //         console.log(response.data);
    //         setFeedPosts(response.data);
    //     })
    // },[])





    

    useEffect(() => () => {
        console.log('revoking object urls');
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

    function likePost(feedPostID){
        axios.post("/api/like-unlike",{
            postToLike: feedPostID
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function getPosts(){
        axios.get('/api/get-feed-posts')
        .then(response =>{
            console.log(response.data);
            setFeedPosts(response.data);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })
    }

    function submitPost(event){
        event.preventDefault();
        let config = {
            headers: {
                'Content-type': 'image/jpeg'  //configure headers for put request to s3 bucket
            }
        }

        if(myFiles.length !== 0){
            //try to upload photo first
            axios.get(apiGatewayURL)  //first get the presigned s3 url
            .then((response) =>{
                console.log(response)
                console.log(response.data)
                let presignedFileURL =  'https://csc648groupproject.s3-us-west-2.amazonaws.com/' + response.data.photoFilename;  //save this url to add to database later
                console.log(myFiles[0]);
                axios.put(response.data.uploadURL, myFiles[0],config).then((response) =>{  //upload the file to s3
                    console.log(response);
                    console.log(response.data);
                    console.log("Created Post Body: ", createdPostBody);
                    console.log("Presigned File URL: ", presignedFileURL);
                    axios.post('/api/upload-post',{
                        postBody: createdPostBody,
                        photoLink: presignedFileURL,
                    }).then((response) =>{
                        console.log(response.data);
                        removeAll();
                        setCreatedPostBody('');
                    })
                    .catch((err) =>{
                        console.log(err);
                    })
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

            //refresh feed after posting
            getPosts();

        }
        else{
            axios.post('/api/upload-post',{
                postBody: createdPostBody,
            }).then((response) =>{
                console.log(response.data);
                setCreatedPostBody('');
            })
            .catch((err) =>{
                console.log(err);
            })

            //refresh feed after posting
            getPosts();
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
                <form className={styles["follower-feed-new-post"]} onSubmit={submitPost}>
                    <img className={styles["follower-feed-new-post-pic"]} src={createPostProfilePic} />
                    <div className={styles["follower-feed-new-post-name"]}>{createPostDisplayName}</div>
                    <textarea value={createdPostBody} maxLength="255" required className={styles["follower-feed-new-post-body"]} placeholder="Update your followers on what's going on with you and your pets"  onChange={e => setCreatedPostBody(e.target.value)}/>
                    <div className={styles['follower-feed-new-post-tag-dropdown']}>
                        <Select
                            onChange={setTaggedPets}
                            options={taggablePets}
                            placeholder="Tag a Pet in your Post"
                            theme={customTheme}
                            styles={customStyles}
                            isSearchable
                        />
                    </div>
                    <section className={styles["follower-feed-new-post-attach-image"]}>
                        <div className={styles["follower-feed-new-post-attach-image-container"]}  {...getRootProps()}>
                            <input  {...getInputProps()} />
                            {myFiles.length === 0 && <div className={styles["follower-feed-new-post-attach-image-info"]}>Drag and Drop or Click to Select Image</div>}
                            {myFiles.length > 0 && <img className={styles["follower-feed-new-post-attach-image-preview"]} src={myFiles[0].preview} onClick={removeAll}/>}
                        </div>
                    </section>
                    <button className={styles["follower-feed-new-post-submit"]} type='submit'>Submit</button>
                    {/* <button className={styles["follower-feed-new-post-expand-collapse"]} /> onClick={createPostOverlayToggle} */}
                </form>
                {feedPosts.length == 0 &&
                    <>
                    <div className={styles['follower-feed-no-posts-placeholder-header']}>
                        No Feed Posts to show :(
                    </div>
                    <div className={styles['follower-feed-no-posts-placeholder-detail']}>
                        Search for a User and Follow them to see their posts here
                    </div>
                    </>}
                {feedPosts && feedPosts.map((feedPost) => (
                    <div key={feedPost.post_id} className={styles["follower-feed-post"]} onClick={() => openPostModal(feedPost)} >
                        <NavLink to={"/Profile/ShelterId=2"}>
                            <img className={styles["follower-feed-post-prof_pic"]} src={feedPost.profile_pic_link} />
                        </NavLink>
                        <NavLink style={{textDecoration: 'none'}} to={"/Profile/ShelterId=2"}>
                        <div className={styles["follower-feed-post-name"]}>{feedPost.display_name}</div>
                        </NavLink>
 
                        <div className={styles["follower-feed-post-timestamp"]}>{new Date(feedPost.timestamp).toLocaleString()}</div>
                        <div className={styles["follower-feed-post-likes"]}>{feedPost.like_count}</div>
                        <button className={styles['follower-feed-post-like']} onClick={() => likePost(feedPost.post_id)}/>
                        {/* <div className={styles["follower-feed-post-comments"]}>10 comments</div> */}
                        <div className={styles["follower-feed-post-body"]}>{feedPost.body}</div>
                        {feedPost.link && <img className={styles["follower-feed-post-pic"]} src={feedPost.link} />}
                    </div>
                ))}
            </div>
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost} />
        </>
    )
}

export default Feed
