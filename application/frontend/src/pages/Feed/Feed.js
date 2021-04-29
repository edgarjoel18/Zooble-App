import { useState, useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import styles from './Feed.module.css'
import bus_prof_pic from '../../images/businessProfile.jpg'
import shel_prof_pic from '../../images/shelterProfile.jpg'
import own_prof_pic from '../../images/petOwnerProfile.jpg'
import PostModal from '../../components/Modals/PostModal'

import ArrowIcon from '../../images/Created Icons/Arrow.svg'

// import ClipLoader from "react-spinners/ClipLoader";

function Feed() {
    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [feedPosts, setFeedPosts] = useState([
        {
            post_id: 1,
            user_display_name: 'Paw Spa',
            link: "/Profile/BusinessId=2",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 2,
            user_display_name: 'Burgsdale Pet Shelter',
            link: "/Profile/ShelterId=2",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
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
    const [createPostOverlayDisplayBool, setCreatePostOverlayDisplayBool] = useState(true);
    const [createPostOverlayDisplay, setCreatePostOverlayDisplay] = useState({
        display: 'grid',
        height: 360
    });

    //for changing submit image button state
    const [attachImageFontColor, setAttachImageFontColor] = useState('#131b49');
    const [attachImageBackgroundColor, setAttachImageBackgroundColor] = useState('#ffffff');
    const [attachImageText, setAttachImageText] = useState('Add Image');
    const [attachImageBorderColor, setAttachImageBorderColor] = useState('#131b49')
    const [attachedImage, setAttachedImage] = useState(false);  //real thing will be null or attached image?


    function openPostModal(feedPost) {
        console.log(feedPost);
        setSelectedPost(feedPost);
        setPostModalDisplay(true);
        return
    }

    function closePostModal() {
        setPostModalDisplay(false);
    }

    function createPostOverlayToggle() {
        if (createPostOverlayDisplayBool) {
            setCreatePostOverlayDisplayBool(false);
            setCreatePostOverlayDisplay({
                display: 'none',
                height: 36
            });
        }
        else {
            setCreatePostOverlayDisplayBool(true);
            setCreatePostOverlayDisplay({
                display: 'grid',
                height: 330
            });
        }
    }

    function attachImage() {
        if (attachedImage === false) {
            setAttachImageFontColor('#ffffff')
            setAttachImageBackgroundColor('#131b49')
            setAttachImageBorderColor('#131b49')
            setAttachImageText('Image Added')
            setAttachedImage(true);
        }
        else if (attachedImage === true) {
            setAttachImageFontColor('#131b49')
            setAttachImageBackgroundColor('#ffffff')
            setAttachImageBorderColor('#131b49')
            setAttachImageText('Add Image')
            setAttachedImage(false);
        }

    }

    function attachImageHover() {
        if (attachedImage === true) {
            setAttachImageBackgroundColor('#EB1B1B')
            setAttachImageBorderColor('#EB1B1B')
            setAttachImageText('Remove Image')
        }
    }

    function attachImageLeave() {
        if (attachedImage === true) {
            setAttachImageBackgroundColor('#131b49')
            setAttachImageBorderColor('#131b49')
            setAttachImageText('Image Added')
        }
    }

    //Loading

    // const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout (() =>{
    //         setLoading(false);
    //     }, 1000)
    // }, [])

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
                <div className={styles["follower-feed-new-post"]} style={{ height: createPostOverlayDisplay.height }}>
                    <img className={styles["follower-feed-new-post-pic"]} src={'https://csc648groupproject.s3-us-west-2.amazonaws.com/AlexPic.jpg'} />
                    <div className={styles["follower-feed-new-post-name"]}>Alex</div>
                    <textarea className={styles["follower-feed-new-post-body"]} style={{ display: createPostOverlayDisplay.display }} placeholder="Update your followers on what's going on with you and your pets" />
                    <button className={styles["follower-feed-new-post-attach-image"]} style={{ display: createPostOverlayDisplay.display, color: attachImageFontColor, backgroundColor: attachImageBackgroundColor, borderColor: attachImageBorderColor }} onClick={attachImage} onMouseOver={attachImageHover} onMouseLeave={attachImageLeave}>{attachImageText}</button>
                    <button className={styles["follower-feed-new-post-submit"]} style={{ display: createPostOverlayDisplay.display }}>Submit</button>
                    {/* <button className={styles["follower-feed-new-post-expand-collapse"]} /> onClick={createPostOverlayToggle} */}
                </div>
                {feedPosts.length == 0 && <li>No Feed Posts</li>}
                {feedPosts && feedPosts.map((feedPost) => (
                    <div className={styles["follower-feed-post"]} onClick={() => openPostModal(feedPost)} >
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
