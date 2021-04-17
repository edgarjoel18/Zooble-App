import {React, useState} from 'react'

import styles from './PostModal.module.css'

import Modal from './Modal.js'
import prof_pic from '../../images/businessProfile.jpg'


function PostModal({display,onClose}) {

    const [post, setPost] = useState(
        {
            post_id: 1,
            user_display_name: 'Paw Spa',
            prof_pic: '../../images/businessProfile.jpg', //CHANGE LATER //NOT WORKING
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 20,
            timestamp: '12/25/20 at 11:05 AM'
        }
    )

    const [comments, setComments] = useState([
        {
            comment_id: 1,            
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            name: 'Lily',
            likes : 12,
            timestamp: '12/25/20 at 11:05 AM'  //need to get real mysql timestamp and convert for final product
        },
    ]);

    console.log(post.prof_pic);

    if(!display) return null
    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles["post-container"]}>
                <div className={styles["post-image"]}>
                    <img src={post.pic}/>
                </div>
                <div className={styles["post-content"]}>
                    <div className={styles["post-detail"]}>
                        <img src={prof_pic}/>
                        <div className={styles["post-detail-text"]}>
                            <span className={styles["post-detail-name"]}><h3>{post.user_display_name}</h3></span>
                            <span className={styles["post-detail-timestamp"]}>{post.timestamp}</span>
                        </div>
                        <div className={styles["post-detail-like-comment"]}>
                            <button className={styles["post-detail-like"]}/><br/><br/>
                            <span className={styles["post-detail-comments-count"]}>{comments.length} comments</span>
                        </div>
                    </div>
                    <ul className={styles["post-comments"]}>
                        {comments.length == 0 && <li>No Comments</li>}
                        {/* {comments && comments.map((comment)=>(
                            <li key={comment.id}>
                                <div className={styles['post-comment']}>
                                    <img src={comment.prof_pic}/><span>{comment.name}</span>
                                </div>
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </Modal> 
    )
}

export default PostModal
