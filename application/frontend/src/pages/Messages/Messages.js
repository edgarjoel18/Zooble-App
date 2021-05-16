import {useEffect, useState} from 'react'
import axios from 'axios'

import Tab from './Tab'

import styles from './Messages.module.css';
import RecievedMessage from '../../components/Modals/RecievedMessage'
import SentMessage from '../../components/Modals/SentMessage'
import AddIcon from '../../images/Created Icons/AddWhite.svg'
import SendMessage from '../../components/Modals/SendMessage';

function Messages() {
    const [recievedMessageModalDisplay,setRecievedMessageModalDisplay] = useState(false);
    const [sentMessageModalDisplay,setSentMessageModalDisplay] = useState(false);
    const [sendMessageModalDisplay,setSendMessageModalDisplay] = useState(false);

    const [selectedMessage, setSelectedMessage] = useState({});

    const [recievedMessages, setRecievedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);

    const [possibleMessageRecipients, setPossibleMessageRecipients] = useState([]);

    function viewSentMessageModal(message){
        setSelectedMessage(message);
        setSentMessageModalDisplay(true);
    }

    function viewRecievedMessageModal(message){
        setSelectedMessage(message);
        setRecievedMessageModalDisplay(true);
    }


    function getMessages() {  //retrieve currently logged in user's messages
        const getSentMessages = axios.get('/api/sent-messages')
        const getRecievedMessages = axios.get('/api/recieved-messages')

        Promise.all([getRecievedMessages,getSentMessages])
        .then(responses =>{
            console.log("responses: ", responses);
            setRecievedMessages(responses[0].data);
            setSentMessages(responses[1].data)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    function getMessageRecipients(){
       const getFollowers = axios.get('/api/followers')
        const getFollows = axios.get('/api/following')

       Promise.all([getFollowers, getFollows])
       .then(responses =>{
           console.log("responses: ", responses);

           const followers = responses[0].data;
           const follows = responses[1].data;

           let followersAndFollows = followers.concat(follows)
           console.log("Followers And Follows: ", followersAndFollows); 

           let recipients = [];
           let recipientSet = new Set()

           //followers and follows 
           for (const person of followersAndFollows){ 
               const personJSON = JSON.stringify(person)  //stringify to check uniqueness
               if(!recipientSet.has(personJSON)){
                   recipients.push(person)
               }
               recipientSet.add(personJSON)
           }
           console.log("recipients: ", recipients);
           //create array compatible with react-select
           let recipientOptions = []
           for(const recipient of recipients){
               console.log('recipient: ',recipient)
               recipientOptions.push({value: recipient.profile_id, label: recipient.display_name, pic: recipient.profile_pic_link})
           }

           console.log("recipientOptions: ", recipientOptions);


           setPossibleMessageRecipients(recipientOptions)
       })
    }

    function updateSentMessages(newSentMessage){
        // setSentMessages([...sentMessages, newSentMessage]);
    }

    useEffect(()=>{ //retrieve messages on refresh
        getMessages();
        getMessageRecipients();
        console.log('sentMessages: ', sentMessages)
        console.log('recievedMessages: ', recievedMessages)
        // getFollowers(); //get followers/followed to populate dropdown in send message modal
    }, [])


    const [selectedTab, setSelectedTab] = useState(0);

    const onTabClicked = (value) => {
        console.log('Tab ' + value + ' was clicked')
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
            <div className={styles['recieved-messages-container']}>
                {selectedTab === 0 && recievedMessages.length== 0 && 
                    <div className={styles['messages-container-no-messages']}>You have no new messages :(</div>
                }
                {selectedTab === 0 && recievedMessages.map((recievedMessage) =>(
                        <>
                            <div key={recievedMessage.message_id} className={styles['messages-container-message']} onClick={()=>viewRecievedMessageModal(recievedMessage)}>
                                <img className={styles['messages-container-message-pic']} src={recievedMessage.profile_pic_link}/>
                                <div className={styles['messages-container-message-subject']}>{recievedMessage.subject}</div>
                                <div className={styles['messages-container-message-timestamp']}>{new Date(recievedMessage.timestamp).toLocaleString()}</div>
                                <div className={styles['messages-container-message-sender']}>{recievedMessage.display_name}</div>
                            </div>
                        </>
                    ))}
                {selectedTab === 1 && sentMessages.length== 0 &&
                    <div className={styles['messages-container-no-messages']}>You have no messages :(</div>
                }
                {selectedTab === 1 && sentMessages.map((sentMessage) =>(
                        <>
                            <div  key={sentMessage.message_id}  className={styles['messages-container-message']} onClick={()=>viewSentMessageModal(sentMessage)}>
                                <img className={styles['messages-container-message-pic']} src={sentMessage.profile_pic_link}/>
                                <div className={styles['messages-container-message-subject']}>{sentMessage.subject}</div>
                                <div className={styles['messages-container-message-timestamp']}>{new Date(sentMessage.timestamp).toLocaleString()}</div>
                                <div className={styles['messages-container-message-sender']}>{sentMessage.display_name}</div>
                            </div>
                        </>
                    ))}
                    <button className={styles['new-message-button']} onClick={() =>setSendMessageModalDisplay(true)}>
                        <img src={AddIcon} className={styles['new-message-icon']}/>
                        {/* <span className={styles['new-message-text']}>New Message</span> */}
                    </button>
                </div>
            </div>
        <RecievedMessage display={recievedMessageModalDisplay} updateSentMessages={updateSentMessages} onClose={ () => setRecievedMessageModalDisplay(false)} selectedMessage={selectedMessage}></RecievedMessage>
        <SentMessage display={sentMessageModalDisplay} onClose={() => setSentMessageModalDisplay(false)} selectedMessage={selectedMessage}></SentMessage>
        <SendMessage display={sendMessageModalDisplay} onClose={() => setSendMessageModalDisplay(false)} recipientOptions={possibleMessageRecipients}/>
        </>
    )
}

export default Messages
