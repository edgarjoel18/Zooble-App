import {useEffect} from 'react'

import styles from './ViewMessage.module.css'

import Modal from './Modal'

function ViewMessage({display,onClose,selectedMessage}) {
    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles['view-message-header']}>{selectedMessage.subject}</div>
            <div className={styles['view-message-container']}>
                <div className={styles['view-message-sender']}>From: {selectedMessage.sender}</div>
                <div className={styles['view-message-timestamp']}>{selectedMessage.timestamp}</div>
                <div className={styles['view-message-body']}>{selectedMessage.body}</div>
            </div>
        </Modal>
    )
}

export default ViewMessage
