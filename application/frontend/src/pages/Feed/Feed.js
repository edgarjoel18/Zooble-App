import { useState, useEffect, useCallback, useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import Select from 'react-select';  

import styles from './Feed.module.css'

import PostModal from '../../components/Modals/PostModal'
import Spinner from '../../components/UI/Spinner/Spinner';
import ButtonLoader from '../../components/UI/Spinner/ButtonLoader';

import { RedirectPathContext } from '../../context/redirect-path';





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

    //loading UI
    const [loading, setLoading] = useState(false);

    //update UI after submitting post
    const [update, setUpdate] = useState(false);

    const redirectContext = useContext(RedirectPathContext);

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
        redirectContext.updateLoading(true);
        console.log('/api/feed-user');
        axios.get('/api/feed-user')
        .then(response =>{
            console.log('/api/get-feed-user response.data: ', response.data);
            setCreatePostDisplayName(response.data.display_name);
            setCreatePostProfilePic(response.data.profile_pic_link);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })

        console.log('/api/get-feed-posts');
        axios.get('/api/get-feed-posts')
        .then(response =>{
            console.log("Feed Posts: ", response.data);
            setFeedPosts(response.data);
        })
        .catch(err =>{
            redirectContext.updateLoading(false);
            console.log("Error: ");
            console.log(err);
        })

        axios.get('/api/current-user-pets')
        .then(response =>{
            console.log("Taggable Pets: ",response.data);
            let taggablePetOptions = [];

            //construct compatible list of options for react-select from backend response
            for(let i = 0; i < response.data.length; i++){
                taggablePetOptions.push({value: response.data[i].pet_id, label: response.data[i].display_name});
            }
            console.log("Taggable Pet Options: ",taggablePetOptions)
            setTaggablePets(taggablePetOptions);
            redirectContext.updateLoading(false);
        })
        .catch(err =>{
            redirectContext.updateLoading(false);
            console.log("Error: ");
            console.log(err);
        })
    }, [update])

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
        //revoke the data urls to avoid memory leaks
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

    function likePost(event,feedPostID,index){
        console.log('The liked post id is ' + index)
        if (!event) var event = window.event;
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        axios.post("/api/like-unlike",{
            postToLike: feedPostID
        })
        .then((response) => {
            console.log(response.data)
            let updatedPosts = [...feedPosts];
            console.log("Like count is " + updatedPosts[index].like_count)
            updatedPosts[index].like_count++;
            setFeedPosts(updatedPosts);
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function getPosts(){
        axios.get('/api/get-feed-posts')
        .then(response =>{
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

        setLoading(true)
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
                        taggedPets: taggedPets
                    }).then((response) =>{
                        console.log(response.data);
                        removeAll();
                        setCreatedPostBody('');
                        setTaggedPets([]);
                        setLoading(false);
                        setUpdate(!update);
                    })
                    .catch((err) =>{
                        setLoading(false);
                        console.log(err);
                    })
                })
                .catch((err) =>{
                    setLoading(false);
                    console.log(err);
                    if(err.response.status == 403){
                        //display error message to user
                    }
                    //break out of this function //presigned s3 url will automatically expire so no harm done
                })
            })
            .catch((err) =>{
                setLoading(false);
                console.log(err);
            })

            //refresh feed after posting
            // getPosts();
            // setFeedPosts([...feedPosts, ])

        }
        else{
            axios.post('/api/upload-post',{
                postBody: createdPostBody,
                taggedPets: taggedPets
            }).then((response) =>{
                console.log(response.data);
                setCreatedPostBody('');
                setTaggedPets([]);
                setLoading(false);
            })
            .catch((err) =>{
                setLoading(false);
                console.log(err);
            })

            //refresh feed after posting
            //getPosts();
            setUpdate(!update);
        }

    }

    function openPostModal(event,feedPost) {
        if (!event) var event = window.event;
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        console.log(feedPost);
        setSelectedPost(feedPost);
        setPostModalDisplay(true);
        return
    }

    function closePostModal() {
        setPostModalDisplay(false);
    }

    let displayFeed = (
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
                            isMulti
                            value={taggedPets}
                            noOptionsMessage={() => 'Add a Pet to Your Account on the My Pets Page'}
                        />
                    </div>
                    <section className={styles["follower-feed-new-post-attach-image"]}>
                        <div className={styles["follower-feed-new-post-attach-image-container"]}  {...getRootProps()}>
                            <input  {...getInputProps()} />
                            {myFiles.length === 0 && <div className={styles["follower-feed-new-post-attach-image-info"]}>Drag and Drop or Click to Select Image</div>}
                            {myFiles.length > 0 && <img className={styles["follower-feed-new-post-attach-image-preview"]} src={myFiles[0].preview} onClick={removeAll}/>}
                        </div>
                    </section>
                    <button className={styles["follower-feed-new-post-submit"]} type='submit'>{loading ? <ButtonLoader /> : 'Submit'}</button>
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
                {feedPosts && feedPosts.map((feedPost, index) => (
                    <div key={feedPost.post_id} className={styles["follower-feed-post"]} onClick={(event) => openPostModal(event,feedPost)} >
                        <NavLink to={"/Profile/ShelterId=2"}>  {/* Need to replace these with real links */}
                            <img className={styles["follower-feed-post-prof_pic"]} src={feedPost.profile_pic_link} />
                        </NavLink>
                        <NavLink style={{textDecoration: 'none'}} to={"/Profile/ShelterId=2"}>   {/* Need to replace these with real links */}
                        <div className={styles["follower-feed-post-name"]}>{feedPost.display_name}</div>
                        </NavLink>
 
                        <div className={styles["follower-feed-post-timestamp"]}>{new Date(feedPost.timestamp).toLocaleString()}</div>
                        <div className={styles["follower-feed-post-likes"]}>{feedPost.like_count}</div>
                        <button className={styles['follower-feed-post-like']} onClick={(event) => likePost(event,feedPost.post_id,index)}/>
                        {/* <div className={styles["follower-feed-post-comments"]}>10 comments</div> */}
                        <div className={styles["follower-feed-post-body"]}>{feedPost.body}</div>
                        {feedPost.link && <img className={styles["follower-feed-post-pic"]} src={feedPost.link} />}
                    </div>
                ))}
            </div>
    )

    console.log(redirectContext.loading)

    if (redirectContext.loading) {
        displayFeed = <Spinner />
    }

    return (
        <>
            {displayFeed}
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost} />
        </>
    )
}

export default Feed
