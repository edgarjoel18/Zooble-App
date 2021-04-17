import React from 'react'
import Modal from './Modal.js'

import styles from './SendAMessage.module.css';

function SendAMessage({display,onClose}) {
    if(!display) return null
    return (
        <Modal display={display} onClose={onClose}>
            <h1 className={styles["sendAMessage-header"]}>Send a Message</h1>
        </Modal>
    )
}

export default SendAMessage
