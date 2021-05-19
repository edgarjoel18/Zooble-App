import { useState, useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';

import styles from './Feed.module.css'
import PostModal from '../../components/Modals/PostModal'

import ArrowIcon from '../../images/Created Icons/Arrow.svg'

function AdminFeed() {
    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [adminFeedPosts, setAdminFeedPosts] = useState([]);

    useEffect(() => {
        console.log('/api/get-admin-feed-posts');
        axios.get('/api/get-admin-feed-posts')
            .then(response => {
                console.log(response.data);
                setAdminFeedPosts(response.data);
            })
            .catch(err => {
                console.log("Error: ");
                console.log(err);
            })
    }, [])

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

    return (
        <>
            <div className={styles["follower-feed-container"]}>
                <div className={styles["follower-feed-header"]}></div>

                {adminFeedPosts.length == 0 && <li>No Feed Posts</li>}
                {adminFeedPosts && adminFeedPosts.map((adminFeedPost) => (
                    <div className={styles["follower-feed-post"]} onClick={() => openPostModal(adminFeedPost)} >
                        {/* <NavLink to={adminFeedPost.link}> */}
                            <img className={styles["follower-feed-post-prof_pic"]} src={adminFeedPost.profile_pic_link} />
                        {/* </NavLink> */}
                        {/* <NavLink style={{ textDecoration: 'none' }} to={adminFeedPost.link}> */}
                            <div className={styles["follower-feed-post-name"]}>{adminFeedPost.display_name}</div>
                        {/* </NavLink> */}

                        <div className={styles["follower-feed-post-timestamp"]}>{adminFeedPost.timestamp}</div>
                        <div className={styles["follower-feed-post-admin-flags"]}>{adminFeedPost.flag_count}</div>
                        <button className={styles['follower-feed-post-admin-flag']} />
                        {/* <div className={styles["follower-feed-post-comments"]}>10 comments</div> */}
                        <div className={styles["follower-feed-post-body"]}>{adminFeedPost.body}</div>
                        <img className={styles["follower-feed-post-pic"]} src={adminFeedPost.link} />
                    </div>
                ))}
            </div>
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost} />
        </>
    )
}

export default AdminFeed