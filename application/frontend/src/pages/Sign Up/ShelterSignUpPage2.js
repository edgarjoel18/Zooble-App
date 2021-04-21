import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './ShelterSignUpPage2.module.css';

function ShelterSignUpPage2() {

    return (
        <form className={styles['shelter-form']}>
            <div className={styles['shelter-container']}>
                <h1>Shelter Details</h1>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={styles['input-container']}>
                            <label className={styles['shelter-name-input-label']} for='shelter-name'><h3>Shelter Name</h3></label>
                            <input
                                type='text'
                                placeholder='Enter shelter name'
                                name='shelter-name'
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['shelter-address-input-label']} for='shelter-address'><h3>Shelter Address</h3></label>
                            <input
                                type='text'
                                placeholder='1600 Holloway Ave, San Francisco, CA, 94132'
                                name='shelter-address'
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['shelter-categories-input-label']} for='shelter-categories'><h3>Types of Animals</h3></label>
                            <input
                                type='text'
                                placeholder='shelter category'
                                name='shelter-categories'
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['shelter-phone-number-input-label']} for='shelter-phone-number'><h3>Phone Number</h3></label>
                            <input
                                type='text'
                                placeholder='555 555 5555'
                                name='shelter-phone-number'
                            />
                        </div>
                    </Grid>
                </Grid>

                <div className={styles['checkbox-container']}>
                    <p>By creating an account you agree to our <a href='#'>Terms & Privacy</a>
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
        </form >
    );
}

export default ShelterSignUpPage2;