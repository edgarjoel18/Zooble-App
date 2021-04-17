import React from 'react'
import Modal from './Modal.js'

import styles from './SendAMessage.module.css';

function SendAMessage({display,onClose}) {
    if(!display) return null
    return (
        <Modal display={display} onClose={onClose}>
            <h1 className={styles["sendAMessage-header"]}>Send a Message</h1>
            <input className={styles["sendAMessage-subject"]} placeholder="Subject"/>
            <textarea className={styles["sendAMessage-body"]}></textarea>
            <button class={styles["sendAMessage-sendButton"]}><span><h4>Send</h4></span></button>
        </Modal>
    )
}

export default SendAMessage
