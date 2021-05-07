import {useEffect, useState} from 'react'
import axios from 'axios'

import styles from './Messages.module.css';
import ViewMessage from '../../components/Modals/ViewMessage'

function Messages() {
    const [messageModalDisplay,setMessageModalDisplay] = useState(false);

    const [selectedMessage, setSelectedMessage] = useState({});

    const [messages, setMessages] = useState([]);

    function viewMessageModal(message){
        setSelectedMessage(message);
        setMessageModalDisplay(true);
    }

    function closeMessageModal(){
        setMessageModalDisplay(false);
    }

    function getMessages() {  //retrieve currently logged in user's messages
        axios.get('/api/messages')
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

    useEffect(()=>{ //retrieve messages on refresh
        getMessages();
    }, [])

    return (
        <>
        <div className={styles['messages-container']}>
        <div className={styles['messages-header']}>
            Messages
        </div>
        {messages.length== 0 && <div className={styles['messages-container-no-messages']}>You have no messages :(</div>}
        {messages && messages.map((message) =>(
                <>
                <div className={styles['messages-container-message']} onClick={()=>viewMessageModal(message)}>
                    <img className={styles['messages-container-message-pic']} src={message.pic}/>
                    <div className={styles['messages-container-message-subject']}>{message.subject}</div>
                    <div className={styles['messages-container-message-timestamp']}>{message.timestamp}</div>
                    <div className={styles['messages-container-message-sender']}>{message.sender}</div>
                </div>
                </>
            ))}
        </div>
        <ViewMessage display={messageModalDisplay} onClose={closeMessageModal} selectedMessage={selectedMessage}></ViewMessage>
        </>
    )
}

export default Messages
