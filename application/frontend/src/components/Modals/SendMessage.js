import {useState} from 'react'
import Modal from './Modal'
import axios from 'axios'

import styles from './SendMessage.module.css';

function SendMessage({display,onClose, profile}) {
    console.log("SendAMessage: ",profile)

    const [sendSuccess,setSendSuccess] = useState(false);

    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    function sendMessage(event){
        event.preventDefault();
        console.log('sendMessage')

        axios.post("/api/message",{
            messageSubject: subject,
            messageBody: body,
            recipientAccountID: profile.account_id
        })
        .then(response => {
            console.log(response);
            onClose();
        })
        .catch(err =>{
            console.log(err);
            //display Error message e.g: try again
        })
    }



    if(!display) return null
    return (
        <Modal display={display} onClose={onClose}>
            <>
                <h1 className={styles["sendAMessage-header"]}>Send a Message</h1>
                <form className={styles['send-a-message-container']} onSubmit={sendMessage}>
                    <input className={styles["sendAMessage-subject"]} maxLength={78} required placeholder="Subject" value={subject} onChange={(event) =>setSubject(event.target.value)}/>
                    <textarea className={styles["sendAMessage-body"]} maxLength={65535} value={body} required placeholder="Write your message here" onChange={(event) =>setBody(event.target.value)}/>
                    <button type="submit" class={styles["sendAMessage-sendButton"]} >Send</button>
                </form>
            </>
        </Modal>
    )
}
export default SendMessage
