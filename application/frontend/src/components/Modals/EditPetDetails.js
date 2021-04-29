import {useState} from 'react'

import Modal from './Modal'

import Select from 'react-select';

import makeAnimated from 'react-select/animated';

import styles from './EditPetDetails.module.css'

function EditPetDetails(props) {

    //full version should recieve pet types and breeds from db and display in dropdown
    // const [petType,setPetType] = useState();  //set this to already existing pet type stored in db for real version
    const [petBreeds, setPetBreed] = useState([]);
    const [petColors, setPetColors] = useState([]);
    const [petSize, setPetSize] = useState();

    const typeOptions = [
        {value: 'Dog', label: 'Dog'},
        {value: 'Cat', label: 'Cat'},
        {value: 'Lizard', label:'Lizard'},
        {value: 'Monkey', label: 'Monkey'},
    ];

    const dogBreedOptions = [
        {value: 'German Shepherd', label: 'German Shepherd'},
        {value: 'Samoyed', label: 'Samoyed'},
        {value: 'Labrador Retriever', label: 'Labrador Retriever'}
    ];

    const catBreedOptions = [
        {value: 'Manx', label: 'Manx'},
        {value: 'Siamese', label: 'Siamese'}
    ];

    const colorOptions = [
        {value: 'Black', label: 'Black'},
        {value: 'White', label: 'White'},
        {value: 'Brown', label: 'Brown'}
    ];

    const sizeOptions = [
        {value: 'Small', label: 'Small'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Large', label: 'Large'}
    ];

    function customTheme(theme){
        return {
            ... theme,
            colors:{
                ... theme.colors,
                primary25: '#B3B3B3',
                primary:'#1CB48F',
            }
        }
    }
    
    const animatedComponents = makeAnimated();

    console.log(petColors)


    return (
        <Modal display={props.display} onClose={props.onClose}>
            <div className={styles['edit-pet-details-header']}>Edit Pet Information</div>
            <div className={styles['edit-pet-details-container']}>
                <div className={styles['edit-pet-details-name']}>
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="pet_name" 
                        value={props.profile.userName}
                        onChange={event => props.updateProfile('userName', event.target.value)} />
                </div>
                <div className={styles['edit-pet-details-type']}>
                    <label for="type">Type</label>
                    <Select id="type" name="pet_type"
                        onChange={props.updatePetType}
                        options={typeOptions}
                        theme={customTheme}
                        placeholder="Select Pet Type"
                        isSearchable
                    />
                </div>
                <div className={styles['edit-pet-details-breed']}>
                    <label for="breed">Breed</label>
                    <Select id="breed" name="pet_breed"
                        onChange={props.updatePetBreed}
                        options={ dogBreedOptions}
                        theme={customTheme}
                        placeholder="Select Dog Breed"
                        isSearchable
                        isMulti
                        components={animatedComponents}
                    />
                </div>
                <div className={styles['edit-pet-details-colors']}>
                    <label for="color">Color(s)</label>
                    <Select id="color" name="pet_color"
                        onChange={setPetColors}
                        options={ colorOptions}
                        theme={customTheme}
                        placeholder="Select Pet Color(s)"
                        isSearchable
                        isMulti
                    />
                </div>
                <div className={styles['edit-pet-details-size']}>
                    <label for="size">Size</label>
                    <Select id="size" name="pet_size"
                        onChange={setPetSize}
                        options={ sizeOptions}
                        theme={customTheme}
                        placeholder="Select Pet Size"
                        isSearchable
                    />
                </div>
                <button className={styles['edit-pet-details-submit']} onClick={props.onClose}>Submit</button>
            </div>
            
        </Modal>
    )
}

export default EditPetDetails
