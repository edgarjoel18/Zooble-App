import React, { useState } from 'react'
import Modal from './Modal.js'

import styles from './SendAMessage.module.css';

function WriteAReview({display, onClose, clicked}) {
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    if(!display) return null;

    function submitReviewHandler(event) {
        event.preventDefault()
        clicked(rating, review)
    }

    return (
        <Modal display={display} onClose={onClose}>
            <form onSubmit={submitReviewHandler} >
                <h1 className={styles["sendAMessage-header"]}>Write a Review</h1>
                <div className={styles['send-a-message-container']}>
                    <input className={styles["sendAMessage-subject"]} placeholder="Subject" onChange={event => setRating(event.target.value)} />
                    <textarea className={styles["sendAMessage-body"]} onChange={event => setReview(event.target.value)}/>
                    <button class={styles["sendAMessage-sendButton"]}><h4>Send</h4></button>
                </div>
            </form>
        </Modal>
    )
}

export default WriteAReview