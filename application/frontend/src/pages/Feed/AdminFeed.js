import { useState, useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import styles from './Feed.module.css'
import bus_prof_pic from '../../images/businessProfile.jpg'
import shel_prof_pic from '../../images/shelterProfile.jpg'
import own_prof_pic from '../../images/petOwnerProfile.jpg'
import PostModal from '../../components/Modals/PostModal'

import ArrowIcon from '../../images/Created Icons/Arrow.svg'

function AdminFeed() {
    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [feedPosts, setFeedPosts] = useState([
        {
            post_id: 1,
            user_display_name: 'Burgsdale Pet Shelter',
            link: "/Profile/ShelterId=2",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/BurgsdalePetShelterPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            flags: 30,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 2,
            user_display_name: 'Paw Spa',
            link: "/Profile/BusinessId=2",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/PawSpaPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            flags: 20,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 3,
            user_display_name: 'Alex',
            link: "/Profile/PetOwnerId=1",
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/AlexPic.jpg',
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            flags: 9,
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

    return (
        <>
          <div className={styles["follower-feed-container"]}>
                <div className={styles["follower-feed-header"]}></div>
                
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
                        <div className={styles["follower-feed-post-flags"]}>{feedPost.flags}</div>
                        <button className={styles['follower-feed-post-flag']} />
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

export default AdminFeed