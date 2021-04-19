import React from 'react'
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import styles from './AccountType.module.css';

//Import Images
import OwnerImage from '../../images/Third Party Images/undraw_good_doggy_4wfq.svg'
import ShelterImage from '../../images/Third Party Images/undraw_pet_adoption_2qkw.svg'
import BusinessImage from '../../images/Third Party Images/undraw_business_shop_qw5t.svg'

function AccountTypePage() {
    return (
        <div className={styles['account-type-container']}>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <div className={styles['owner-container']}>
                        <img className={styles['owner-img']} src={OwnerImage} />
                        <NavLink to="/signup-page">
                            <button className={styles['signup-button']}><span><h3>Sign Up as Pet Owner</h3></span></button>
                        </NavLink>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <div className={styles['shelter-container']}>
                        <img className={styles['shelter-img']} src={ShelterImage} />
                        <NavLink to="/shelter-signup">
                            <button className={styles['shelter-button']}><span><h3>Sign Up as Pet Shelter</h3></span></button>
                        </NavLink>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <div className={styles['business-container']}>
                        <img className={styles['business-img']} src={BusinessImage} />
                        <NavLink to="/business-signup">
                            <button className={styles['business-button']}><span><h3>Sign Up as Pet Business</h3></span></button>
                        </NavLink>
                    </div>
                </Grid>
            </Grid>
        </div>







    );
}

export default AccountTypePage;