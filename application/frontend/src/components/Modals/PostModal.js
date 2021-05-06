import {React, useState, useEffect} from 'react'

import styles from './PostModal.module.css'

import Modal from './Modal.js'
import prof_pic from '../../images/businessProfile.jpg'
import axios from 'axios';


function PostModal({display,onClose,selectedPost}) {

    // console.log(selectedPost);

    const [createdCommentBody, setCreatedCommentBody] = useState();

    const [comments, setComments] = useState([ //Real version will fetch comments associated with post id of post passed in
        // {
        //     comment_id: 1,            
        //     prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
        //     name: 'Lily',
        //     likes : 12,
        //     timestamp: '12/25/20 at 11:05 AM',  //need to get real mysql timestamp and convert for final product
        //     body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        // },
        // {
        //     comment_id: 2,            
        //     prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
        //     name: 'Lily',
        //     likes : 12,
        //     timestamp: '12/25/20 at 11:05 AM',  //need to get real mysql timestamp and convert for final product
        //     body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        // },
        // {
        //     comment_id: 3,            
        //     prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
        //     name: 'Lily',
        //     likes : 12,
        //     timestamp: '12/25/20 at 11:05 AM',  //need to get real mysql timestamp and convert for final product
        //     body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        // },
    ]);

    useEffect(() =>{
        getComments();
    },[display]) //this will refresh if they close the modal and come back!


    function submitComment(event){
        event.preventDefault();

        axios.post('/api/comment',{
            body: createdCommentBody,
            postId: selectedPost.post_id
        })
        .then(response => {
            console.log("Response: ",response);
        })
        .catch(err => {
            console.log(err);
        })

        getComments(); //refresh so the user knows their comment has posted
    }

    function getComments(){
        axios.get('/api/comments',{params: { post_id: selectedPost.post_id}})
        .then(response =>{
            console.log("Response: ",response);
            console.log("Response.data: ", response.data);
            setComments(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    
    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles["post-container"]}>
                {selectedPost.link && <div className={styles["post-image"]}>
                    <img src={selectedPost.link}/>
                </div>}
                <div className={styles["post-content"]}>
                    <div className={styles["post-detail"]}>
                        <img className={styles["post-detail-pic"]} src={selectedPost.profile_pic_link}/>
                        <div className={styles["post-detail-name"]}><h3>{selectedPost.display_name}</h3></div>
                        <div className={styles["post-detail-timestamp"]}>{selectedPost.timestamp}</div>
                        <div className={styles["post-detail-likes"]}>
                            {selectedPost.likes}
                            
                        </div>
                        <button className={styles["post-detail-like"]}/>
                        {/* <div className={styles["post-detail-comments-count"]}>{comments.length} comments</div>  */} 
                        <div className={styles["post-detail-body"]}>{selectedPost.body}</div>
                    </div>
                    <ul className={styles["post-comments"]}>
                        {comments.length == 0 && <li>No Comments</li>}
                        {comments && comments.map((comment)=>(
                            <li key={comment.comment_id}>
                                <div className={styles['post-comment']}>
                                    <img className={styles['post-comment-pic']} src={comment.profile_pic_link}/>
                                    <div className={styles['post-comment-name']}><h4>{comment.display_name}</h4></div>
                                    <div className={styles['post-comment-timestamp']}>{comment.timestamp}</div>
                                    <div className={styles['post-comment-body']}>{comment.body}</div>
                                    <div className={styles['post-comment-likes']}>
                                        {comment.like_count}  
                                    </div>
                                    <button className={styles['post-comment-like']}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <form className={styles["post-leave-comment"]} onSubmit={submitComment}>
                        <input value={createdCommentBody} maxLength="255" required placeholder="Write a Comment..." onChange={e => setCreatedCommentBody(e.target.value)}/>
                        <button onClick><span>Comment</span></button>
                    </form>
                </div>
            </div>
        </Modal> 
    )
}

export default PostModal
