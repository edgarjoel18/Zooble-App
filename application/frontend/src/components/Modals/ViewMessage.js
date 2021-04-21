import {useState} from 'react'

import styles from './ViewMessage.module.css'

import Modal from './Modal'

function ViewMessage({display,onClose,selectedMessage}) {

    const [replyDisplay, setReplyDisplay] = useState(false);

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
                    <textarea className={styles['view-message-reply-body']} placeholder="Reply"/>
                    <button className={styles['view-message-reply-button']} >Reply</button>
                </div>
        </Modal>
    )
}

export default ViewMessage
