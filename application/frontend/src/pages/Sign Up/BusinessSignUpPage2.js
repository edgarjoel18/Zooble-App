import { useState } from 'react';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './BusinessSignUpPage2.module.css';

import TermsAndConditions from '../../components/Modals/TermsAndConditions'
import PrivacyPolicy from '../../components/Modals/PrivacyPolicy'

function BusinessSignUpPage2() {
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

    return (
        <form className={styles['business-form']}>
            <div className={styles['business-container']}>
                <h1>Business Details</h1>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={styles['input-container']}>
                            <label className={styles['business-name-input-label']} for='business-name'><h3>Business Name</h3></label>
                            <input
                                type='text'
                                placeholder='Enter business name'
                                name='business-name'
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['business-address-input-label']} for='business-address'><h3>Business Address</h3></label>
                            <input
                                type='text'
                                placeholder='1600 Holloway Ave, San Francisco, CA, 94132'
                                name='business-address'
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['business-categories-input-label']} for='business-categories'><h3>Business Categories</h3></label>
                            <input
                                type='text'
                                placeholder='business category'
                                name='business-categories'
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['business-phone-number-input-label']} for='business-phone-number'><h3>Phone Number</h3></label>
                            <input
                                type='text'
                                placeholder='555 555 5555'
                                name='business-phone-number'
                            />
                        </div>
                    </Grid>
                </Grid>

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
                    <button type='submit' className={styles['submit-btn']}>Sign Up</button>
                </div>
            </div>
            {/* Modals */}
            <TermsAndConditions display={termsAndConditionsDisplay} onClose={closeTermsAndConditionsModal} />
            <PrivacyPolicy display={privacyPolicyDisplay} onClose={closePrivacyPolicyModal} />
        </form >
    );
}

export default BusinessSignUpPage2;