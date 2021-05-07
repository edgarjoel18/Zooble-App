import {useEffect, useState} from 'react'

import Modal from './Modal'

import styles from './EditPetDetails.module.css'

import Select from 'react-select';

import makeAnimated from 'react-select/animated';
import axios from 'axios';

function AddAPet({display,onClose}) {

    const [petColors, setPetColors] = useState([]);
    const [petSize, setPetSize] = useState();
    const [petAge, setPetAge] = useState();



    const [typeOptions, setTypeOptions] = useState([]);

    const [dogBreedOptions, setDogBreedOptions] = useState([]);

    const [catBreedOptions, setCatBreedOptions] = useState([]);

    const [colorOptions, setColorOptions] = useState([]);

    const [sizeOptions, setSizeOptions] = useState([]);

    const [ageOptions, setAgeOptions] = useState([]);

    const [petName,setPetName] = useState('')

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

    useEffect(() => {
        axios.get('/api/pet-types')
        .then(response =>{
            setTypeOptions(response.data);
        })
        .catch(err =>{

        })

        axios.get('/api/dog-breeds')
        .then(response =>{
            setDogBreedOptions(response.data);
        })
        .catch(err =>{

        })

        axios.get('/api/cat-breeds')
        .then(response =>{
            setCatBreedOptions(response.data);
        })
        .catch(err =>{
            
        })

        axios.get('/api/ages')
        .then(response =>{
            setAgeOptions(response.data);
        })
        .catch(err =>{

        })

        axios.get('/api/sizes')
        .then(response =>{
            setSizeOptions(response.data);
        })
        .catch(err =>{
            
        })

        axios.get('/api/colors')
        .then(response =>{
            setColorOptions(response.data);
        })
        .catch(err =>{
            
        })
    }, [])

    function createPetProfile(){
        axios.post('/api/create-pet-profile')
        .then(response =>{
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const animatedComponents = makeAnimated();

    return (
        <Modal display={display} onClose={onClose}>
            <>
            <div className={styles['edit-pet-details-header']}>Add a Pet</div>
            <div className={styles['edit-pet-details-container']}>
                <div className={styles['edit-pet-details-name']}>
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="pet_name" 
                        maxLength="25"
                        // value={props.profile.userName}
                        // onChange={event => props.updateProfile('userName', event.target.value)} 
                    />
                </div>
                <div className={styles['edit-pet-details-type']}>
                    <label for="type">Type</label>
                    <Select id="type" name="pet_type"
                        // onChange={props.updatePetType}
                        options={typeOptions}
                        theme={customTheme}
                        placeholder="Select Pet Type"
                        isSearchable
                    />
                </div>
                

                <div className={styles['edit-pet-details-color']}>
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

                <div className={styles['edit-pet-details-age']}>
                    <label for="age">Age</label>
                    <Select id="age" name="pet_age"
                        onChange={setPetAge}
                        options={ageOptions}
                        theme={customTheme}
                        placeholder="Select Pet Age"
                        isSearchable
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
                <div className={styles['edit-pet-details-breed']}>
                    <label for="breed">Breed</label>
                    <Select id="breed" name="pet_breed"
                        // onChange={props.updatePetBreed}
                        options={ dogBreedOptions}
                        theme={customTheme}
                        placeholder="Select Dog Breed"
                        isSearchable
                        isMulti
                        components={animatedComponents}
                    />
                </div>
                <button className={styles['edit-pet-details-submit']} onClick={onClose}>Submit</button>
            </div>
            </>
        </Modal>
    )
}

export default AddAPet
