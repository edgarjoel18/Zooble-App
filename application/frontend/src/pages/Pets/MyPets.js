import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

import styles from './MyPets.module.css'
import axios from 'axios'

import AddIcon from '../../images/Created Icons/Add.svg'

import DeleteIcon from  '../../images/Created Icons/Exit-Cancel.svg'
import ConfirmPetDeletion from '../../components/Modals/ConfirmPetDeletion';
function MyPets() {

    const [deletionModalDisplay,setDeletionModalDisplay] = useState(false);

    const [selectedPet, setSelectedPet] = useState({});


    const [myPets,setMyPets] = useState([
    // {
    //     pet_id: 1,
    //     pet_name: 'Max',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
    // },
    // {
    //     pet_id: 2,
    //     pet_name: 'Juju',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg'
    // },
    // {
    //     pet_id: 3,
    //     pet_name: 'Mimi',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg'
    // },
    // {
    //     pet_id: 4,
    //     pet_name: 'Max',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
    // },
    // {
    //     pet_id: 5,
    //     pet_name: 'Juju',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg'
    // },
    // {
    //     pet_id: 6,
    //     pet_name: 'Mimi',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg'
    // },
    // {
    //     pet_id: 7,
    //     pet_name: 'Max',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
    // },
    // {
    //     pet_id: 8,
    //     pet_name: 'Juju',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg'
    // },
    // {
    //     pet_id: 9,
    //     pet_name: 'Mimi',
    //     pet_prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg'
    // },
    ])

    let history = useHistory();

    function viewDeletionModal(pet){
        setSelectedPet(pet);
        setDeletionModalDisplay(true);
    }

    function closeDeletionModal(){
        setDeletionModalDisplay(false);
    }

    function profileClicked(profile){
        console.log(profile);
        console.log("Profile Clicked");
        history.push(profile);
    }

    useEffect(() => {axios.get('/api/get-current-user-pets') 
        .then(response =>{
            console.log(response.data);
            setMyPets(response.data);
            console.log(myPets);
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
            <div className={styles['my-pets-container-add-pet']} onClick={() => history.push('/Profile/PetCreate')}>
                <img className={styles['my-pets-container-add-pet-icon']} src={AddIcon}/>
                <div className={styles['my-pets-container-add-pet-text']}>Add a Pet</div>
             </div>
            {myPets && myPets.map((pet,index) =>(
                    <div key={index} className={styles['my-pets-container-pet']} >  {/*onClick={() => profileClicked('/Profile/' + pet.pet_name)}*/}
                        <div className={styles.LinkDiv} onClick={() => history.push('/Profile/' + pet.pet_name)}  >
                            <img className={styles['my-pets-container-pet-pic']} src={pet.pet_prof_pic}/>
                            <div className={styles['my-pets-container-pet-name']}>{pet.pet_name}</div>
                        </div>
                        <img className={styles['my-pets-container-pet-delete']} onClick={()=>viewDeletionModal(pet)}src={DeleteIcon}/>
                    </div>
            ))}
            </div>
        </div>
        <ConfirmPetDeletion display={deletionModalDisplay} onClose={closeDeletionModal} selectedPet={selectedPet}/>
        </>
    )
}

export default MyPets
