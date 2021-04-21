import React from 'react'
import Modal from './Modal.js'

import styles from './SendAMessage.module.css';

function SendAMessage({display,onClose}) {
    if(!display) return null
    return (
        <Modal display={display} onClose={onClose}>
            <h1 className={styles["sendAMessage-header"]}>Send a Message</h1>
            <div className={styles['send-a-message-container']}>
                <input className={styles["sendAMessage-subject"]} placeholder="Subject"/>
                <textarea className={styles["sendAMessage-body"]}/>
                <button class={styles["sendAMessage-sendButton"]} onClick={onClose}><h4>Send</h4></button>
            </div>
        </Modal>
    )
}

export default SendAMessage
