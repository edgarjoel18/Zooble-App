import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

import styles from './MyPets.module.css'
import axios from 'axios'

import AddIcon from '../../images/Created Icons/Add.svg'

import DeleteIcon from  '../../images/Created Icons/Exit-Cancel.svg'
import ConfirmPetDeletion from '../../components/Modals/ConfirmPetDeletion';

import AddAPet from '../../components/Modals/AddAPet';
function MyPets() {

    const [deletionModalDisplay,setDeletionModalDisplay] = useState(false);
    const [additionModalDisplay, setAdditionModalDisplay] = useState(false);

    const [selectedPet, setSelectedPet] = useState({});


    const [myPets,setMyPets] = useState([]);

    let history = useHistory();

    function viewDeletionModal(pet){
        setSelectedPet(pet);
        setDeletionModalDisplay(true);
    }



    function profileClicked(profile){
        console.log(profile);
        console.log("Profile Clicked");
        history.push(profile);
    }

    useEffect(() => {axios.get('/api/current-user-pets') 
        .then(response =>{
            console.log('/api/get-current-user-pets response.data',response.data);
            setMyPets(response.data);
            console.log("myPets: ", myPets);
        })
        .catch(err =>{
            console.log("Error: ");
            console.log(err);
        })
    }, [])

    return (
        <>

        <div className={styles['my-pets-container']}>
            <div className={styles['my-pets-header']}>
                My Pets
                <span onClick={() => history.goBack()} >Back to Profile</span>
            </div>
            <div className={styles['my-pets-container-pets']}>
            <div className={styles['my-pets-container-add-pet']} onClick={() => setAdditionModalDisplay(true)}>
                <img className={styles['my-pets-container-add-pet-icon']} src={AddIcon}/>
                <div className={styles['my-pets-container-add-pet-text']}>Add a Pet</div>
             </div>
            {myPets && myPets.map((pet,index) =>(
                    <div key={index} className={styles['my-pets-container-pet']} >  {/*onClick={() => profileClicked('/Profile/' + pet.pet_name)}*/}
                        <div className={styles.LinkDiv} onClick={() => history.push('/Profile/' + pet.profile_id)}  >
                            <img className={styles['my-pets-container-pet-pic']} src={pet.profile_pic_link}/>
                            <div className={styles['my-pets-container-pet-name']}>{pet.display_name}</div>
                        </div>
                        <img className={styles['my-pets-container-pet-delete']} onClick={()=>viewDeletionModal(pet)}src={DeleteIcon}/>
                    </div>
            ))}
            </div>
        </div>
        <ConfirmPetDeletion display={deletionModalDisplay} onClose={() => setDeletionModalDisplay(false)} selectedPet={selectedPet}/>
        <AddAPet display={additionModalDisplay} onClose={() => setAdditionModalDisplay()}/>
        </>
    )
}

export default MyPets
