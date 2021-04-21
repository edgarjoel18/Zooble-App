import {useState} from 'react';
import styles from './ShelterSignUpPage2.module.css';

import Select from 'react-select'

import makeAnimated from 'react-select/animated';

function ShelterSignUpPage2() {
    const typeOptions = [   //Real version will fetch from database
        {value: 'Dog', label: 'Dog'},
        {value: 'Cat', label: 'Cat'},
        {value: 'Lizard', label:'Lizard'},
        {value: 'Monkey', label: 'Monkey'},
    ];

    const [selectedPetTypes,setSelectedPetTypes] = useState([]);

    function customTheme(theme){ //move this a separate file and import maybe?
        return {
            control: base => ({
                ...base,
                height: 54.5,
                minHeight: 54.5
            }),
            ... theme,
            colors:{
                ... theme.colors,
                primary25: '#B3B3B3',
                primary:'#1CB48F',
            }
        }
    }

    const animatedComponents = makeAnimated();

    return (
        <div className={styles['signup-container']}>
            <div className={styles['signup-container-header']}>
                Shelter Details
            </div>
            <div className={styles['signup-fields-container']}>
                <div className={styles['shelter-name-input-container']}>
                    <label className={styles['shelter-name-input-label']} for='shelter-name'>Shelter Name</label>
                        <input
                            type='text'
                            placeholder='Enter shelter name'
                                name='shelter-name'
                        />
                </div>

                <div className={styles['shelter-address-input-container']}>
                    <label className={styles['shelter-address-input-label']} for='shelter-address'>Shelter Address</label>
                    <input
                        type='text'
                        placeholder='1600 Holloway Ave, San Francisco, CA, 94132'
                        name='shelter-address'
                    />
                </div>

                <div className={styles['shelter-animal-types-input-container']}>
                    <label className={styles['shelter-animal-types-input-label']} for='shelter-animal-types'>Types of Animals</label>
                    <Select id="shelter-animal-types" name="shelter_animal_types"
                                    onChange={setSelectedPetTypes}
                                    options={typeOptions}
                                    placeholder="Types of Animals at your Shelter"
                                    theme={customTheme}
                                    isSearchable
                                    isMulti
                                    components={animatedComponents}
                    />
                </div>

                <div className={styles['shelter-phone-number-input-container']}>
                    <label className={styles['shelter-phone-number-input-label']} for='shelter-phone-number'>Phone Number</label>
                    <input
                        type='text'
                        placeholder='(000) 000-0000'
                        name='shelter-phone-number'
                    />
                </div>
                </div>

                {/* <div className={styles['checkbox-container']}>
                    <p>By creating an account you agree to our <a href='#'>Terms & Privacy</a>
                        <label>
                            <input
                                type='checkbox'
                                required name='remember'
                            />
                        </label>
                    </p>
                </div> */}

                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']}>Sign Up</button>
                </div>
        </div>
    );
}

export default ShelterSignUpPage2;