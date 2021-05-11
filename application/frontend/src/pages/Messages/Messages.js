import {useEffect, useState} from 'react'
import axios from 'axios'

import Tab from './Tab'

import styles from './Messages.module.css';
import ViewMessage from '../../components/Modals/ViewMessage'

function Messages() {
    const [messageModalDisplay,setMessageModalDisplay] = useState(false);

    const [selectedMessage, setSelectedMessage] = useState({});

    const [recievedMessages, setRecievedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);

    function viewMessageModal(message){
        setSelectedMessage(message);
        setMessageModalDisplay(true);
    }

    function closeMessageModal(){
        setMessageModalDisplay(false);
    }

    function getMessages() {  //retrieve currently logged in user's messages
        axios.get('/api/sent-messages')
        .then(response => {
            console.log("Response: ", response);
            console.log("Response.data: ", response.data);
            setSentMessages(response.data);
        })
        .catch(err => {
            console.log("Error: ");
            console.log(err);
        })

        axios.get('/api/recieved-messages')
        .then(response => {
            console.log("Response: ", response);
            console.log("Response.data: ", response.data);
            setRecievedMessages(response.data);
        })
        .catch(err => {
            console.log("Error: ");
            console.log(err);
        })
    }

    useEffect(()=>{ //retrieve messages on refresh
        getMessages();
    }, [])


    const [selectedTab, setSelectedTab] = useState(0);

    const onTabClicked = (value) => {
        console.log('[Tag] ' + value + ' is clicked')
        setSelectedTab(value);
    };

    let tabs = ['Recieved', 'Sent'].map((tab, index) => (
        <Tab key={tab} id={index} section={tab} selected={selectedTab} length={index === 0 ? recievedMessages.length : sentMessages.length} clicked={onTabClicked}/>
    ));




    return (
        <>
        <div className={styles['messages-container']}>
        <div className={styles['tabs-container']}>
            <div className={styles['tabs']}>
                <div className={styles['messages-header']}>Messages</div>
                <div style={{display: 'flex'}}>
                    {tabs}
                </div>
            </div>
        </div>
        <div className={styles['messages-header']}>
            
        </div>
        {selectedTab === 0 && recievedMessages.length== 0 && 
            <div className={styles['recieved-messages-container']}>
                <div className={styles['messages-container-no-messages']}>You have no new messages :(</div>
            </div>
        }
        {selectedTab === 0 && recievedMessages.map((recievedMessage) =>(
                <>
                    <div className={styles['recieved-messages-container']}>
                        <div className={styles['messages-container-message']} onClick={()=>viewMessageModal(recievedMessage)}>
                            <img className={styles['messages-container-message-pic']} src={recievedMessage.profile_pic_link}/>
                            <div className={styles['messages-container-message-subject']}>{recievedMessage.subject}</div>
                            <div className={styles['messages-container-message-timestamp']}>{new Date(recievedMessage.timestamp).toLocaleString()}</div>
                            <div className={styles['messages-container-message-sender']}>{recievedMessage.display_name}</div>
                        </div>
                    </div>
                </>
            ))}
        {selectedTab === 1 && sentMessages.length== 0 &&
            <div className={styles['sent-messages-container']}>
                <div className={styles['messages-container-no-messages']}>You have no messages :(</div>
            </div> }
        {selectedTab === 1 && sentMessages.map((sentMessage) =>(
                <>
                    <div className={styles['sent-messages-container']}>
                        <div className={styles['messages-container-message']} onClick={()=>viewMessageModal(sentMessage)}>
                            <img className={styles['messages-container-message-pic']} src={sentMessage.profile_pic_link}/>
                            <div className={styles['messages-container-message-subject']}>{sentMessage.subject}</div>
                            <div className={styles['messages-container-message-timestamp']}>{new Date(sentMessage.timestamp).toLocaleString()}</div>
                            <div className={styles['messages-container-message-sender']}>{sentMessage.display_name}</div>
                        </div>
                    </div>
                </>
            ))}
            
        </div>
        <ViewMessage display={messageModalDisplay} onClose={closeMessageModal} selectedMessage={selectedMessage}></ViewMessage>
        </>
    )
}

export default Messages
