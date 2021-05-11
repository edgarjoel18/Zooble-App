import { useState, useEffect } from 'react'

import styles from './ViewMessage.module.css'

import Modal from './Modal'
import axios from 'axios';

function RecievedMessageModal({display, onClose, selectedMessage}) {
    const [replyDisplay, setReplyDisplay] = useState(false);

    const [replyBody, setReplyBody] = useState();

    const [messages, setMessages] = useState([

    ]);

    // useEffect(() => {
    // }, [display])  //this will refresh if they close the modal and come back!

    function submitReply(event) {
        event.preventDefault();

        axios.post('/api/reply', {
            replyBody: replyBody,
            selectedMessage: selectedMessage
        })
        .then(response => {
            console.log("Response: ", response);
        })
        .catch(err => {
            console.log(err);
        })
        // //refresh so the user knows their message reply has gone through?
        // getMessage(); 
    }


    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles['view-message-header']}>{selectedMessage.subject}</div>
            <div className={styles['view-message-container']}>
                <div className={styles['view-message-sender']}>From: {selectedMessage.display_name}</div>
                <div className={styles['view-message-timestamp']}>{new Date(selectedMessage.timestamp).toLocaleString()}</div>
                <div className={styles['view-message-body']} >{selectedMessage.body}</div>
                <form onSubmit={onClose}>
                    <textarea required  className={styles['view-message-reply-body']} onChange={(event) => setReplyBody(event.target.value)} placeholder={"Reply to " + selectedMessage.display_name}/>
                    <button type="submit" className={styles['view-message-reply-button']}>Reply</button>
                </form>
            </div>
        </Modal>
    )
}

export default RecievedMessageModal
