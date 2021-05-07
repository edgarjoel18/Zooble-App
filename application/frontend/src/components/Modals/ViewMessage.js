import { React, useState, useEffect } from 'react'

import styles from './ViewMessage.module.css'

import Modal from './Modal'
import axios from 'axios';

function ViewMessage({ display, onClose, selectedMessage }) {

    const [replyDisplay, setReplyDisplay] = useState(false);

    const [selectedMessageBody, setSelectedMessageBody] = useState();

    const [selectedMessageSubject, setSelectedMessageSubject] = useState();

    const [messages, setMessages] = useState([

    ]);

    useEffect(() => {
        getMessages();
    }, [display])  //this will refresh if they close the modal and come back!

    function submitReply(event) {
        event.preventDefault();

        axios.post('/api/message', {
            subject: selectedMessageSubject,
            body: selectedMessageBody,
            messageId: selectedMessage.message_id
        })
            .then(response => {
                console.log("Response: ", response);
            })
            .catch(err => {
                console.log(err);
            })
        //refresh so the user knows their comment has posted
        getMessages(); 
    }

    function getMessages() {
        axios.get('/api/message', { params: { message_id: selectedMessage.message_id } })
            .then(response => {
                console.log("Response: ", response);
                console.log("Response.data: ", response.data);
                setMessages(response.data);
            })
            .catch(err => {
                console.log("Error: ");
                console.log(err);
            })
    }



    // const [textAreaText, setTextAreaText] = useState('');

    // function displayReplyUI(){
    //     setReplyDisplay(true);
    // }


    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles['view-message-header']}>{selectedMessage.subject}</div>
            <div className={styles['view-message-container']}>
                <div className={styles['view-message-sender']}>From: {selectedMessage.sender}</div>
                <div className={styles['view-message-timestamp']}>{selectedMessage.timestamp}</div>
                <div className={styles['view-message-body']}>{selectedMessage.body}</div>
                <form onSubmit={onClose}>
                    <textarea required className={styles['view-message-reply-body']} placeholder={"Reply to " + selectedMessage.sender} />
                    <button type="submit" className={styles['view-message-reply-button']}>Reply</button>
                </form>
            </div>
        </Modal>
    )
}

export default ViewMessage
