import { useState } from 'react';
import {useHistory} from 'react-router'
import React from 'react';
import styles from './SignUpPage2.module.css';

import Select from 'react-select'

import makeAnimated from 'react-select/animated';



import TermsAndConditions from '../../components/Modals/TermsAndConditions'
import PrivacyPolicy from '../../components/Modals/PrivacyPolicy'

function BusinessSignUpPage2() {
    const typeOptions = [  // final product will fetch from database
        {value: 'Grooming', label: 'Grooming'},
        {value: 'Supplies', label: 'Supplies'},
        {value: 'Training', label: 'Training'},
        {value: 'Kennels', label: 'Kennels'},
        {value: 'Pet Stores', label: 'Pet Stores'}
    ];

    const [termsAndConditionsDisplay, setTermsAndConditionsDisplay] = useState(false);
    const [privacyPolicyDisplay, setPrivacyPolicyDisplay] = useState(false);

    function openTermsAndConditionsModal() {
        setTermsAndConditionsDisplay(true);
    }

    function closeTermsAndConditionsModal() {
        setTermsAndConditionsDisplay(false);
    }

    function openPrivacyPolicyModal() {
        setPrivacyPolicyDisplay(true);
    }

    function closePrivacyPolicyModal() {
        setPrivacyPolicyDisplay(false);
    }

    const [selectedBusinessCategories, setSelectedBusinessCategories] = useState([]);

    function customTheme(theme) { //move this a separate file and import maybe?
        return {
            control: base => ({
                ...base,
                height: 54.5,
                minHeight: 54.5
            }),
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#B3B3B3',
                primary: '#1CB48F',
            }
        }
    }

    const animatedComponents = makeAnimated();

    const history= useHistory();

    function OnClickHandler(){
        history.push("/SignUpSuccess");
    }

    return (
        <>
        <form className={styles['signup-container']}>
            <div className={styles['signup-container-header']}>
                Business Details
            </div>
            <div className={styles['signup-fields-container']}>
                    <div className={styles['name-input-container']}>
                        <label className={styles['name-input-label']} for='business-name'>Business Name</label>
                        <input
                            type='text'
                            placeholder='Enter Business Name'
                            name='business-name'
                            required
                        />
                    </div>

                    <div className={styles['phone-number-input-container']}>
                        <label className={styles['phone-number-input-label']} for='business-phone-number'>Phone Number</label>
                        <input
                            type='text'
                            placeholder='(000) 000-0000'
                            name='business-phone-number'
                            required
                        />
                    </div>

                    <div className={styles['address-input-container']}>
                        <label className={styles['address-input-label']} for='business-address'>Business Address</label>
                        <input
                            type='text'
                            placeholder='1600 Holloway Ave, San Francisco, CA, 94132'
                            name='business-address'
                            required
                        />
                    </div>
                <div className={styles['types-input-container']}>
                    <label className={styles['types-input-label']} for='business-categories'>Business Categories</label>
                        <Select id="shelter-animal-types" name="shelter_animal_types"
                            onChange={setSelectedBusinessCategories}
                            options={typeOptions}
                            placeholder="Categories of your Business"
                            theme={customTheme}
                            isSearchable
                            isMulti
                            components={animatedComponents}
                        />
                </div>
            </div>

                <div className={styles['checkbox-container']}>
                    <p>By creating an account you agree to our <button className={styles['terms-button']} onClick={openTermsAndConditionsModal}>Terms</button> &<button className={styles['policy-button']} onClick={openPrivacyPolicyModal}>Privacy Policy</button>
                        <label>
                            <input
                                type='checkbox'
                                required name='remember'
                            />
                        </label>
                    </p>
                </div>

                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']} onClick={OnClickHandler}>Sign Up</button>
                </div>

        </form>
        {/* Modals */}
        <TermsAndConditions display={termsAndConditionsDisplay} onClose={closeTermsAndConditionsModal} />
        <PrivacyPolicy display={privacyPolicyDisplay} onClose={closePrivacyPolicyModal} />
        </>
    );
}

export default BusinessSignUpPage2;