import {useState,useEffect} from 'react'
import Modal from './Modal.js'

import styles from './SendAMessage.module.css';

function SendAMessage({display,onClose}) {

    const [sendSuccess,setSendSuccess] = useState(false);

    if(!display) return null
    return (
        <Modal display={display} onClose={onClose}>
            <>
            <h1 className={styles["sendAMessage-header"]}>Send a Message</h1>
                <div className={styles['send-a-message-container']}>
                    <input className={styles["sendAMessage-subject"]} placeholder="Subject" required/>
                    <textarea className={styles["sendAMessage-body"]} required placeholder="Write your message here"/>
                    <button type="submit" class={styles["sendAMessage-sendButton"]} onClick={onClose}><h4>Send</h4></button>
                </div>
            </>
        </Modal>
    )
}

export default SendAMessage
