import { useState } from "react";
import Axios from "axios";
import styles from './SignUpPage.module.css';

import TermsAndConditions from '../../components/Modals/TermsAndConditions'
import PrivacyPolicy from '../../components/Modals/PrivacyPolicy'

function SignUpPage() {
    const [email, setEmail] = useState('')
    const [uname, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [redonePassword, setRedonePassword] = useState('')

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

    function OnClickHandler(e) {
        console.log(email)
        console.log(uname)
        console.log(firstName)
        console.log(lastName)
        console.log(password)
        console.log(redonePassword)
        Axios.get('/sign-up', {
                params: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    uname: uname,
                    password: password,
                    redonePassword: redonePassword
                }
            }).then(response => {
                console.log(response)
                console.log(response.data)
                console.log(response.data.searchResults)
            }).catch(error => {
                console.log("Error");
            })
    }

    return (
        <>
            <form className={styles['signup-container']}>
                <div className={styles['signup-container-header']}>
                    Sign Up
                </div>
                <div className={styles['signup-fields-container']}>
                    <div className={styles['fname-input-container']}>
                        <label className={styles['fname-input-label']} for='fname'>First Name</label>
                        <input
                            type='text'
                            placeholder='First name'
                            name='fname'
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles['lname-input-container']}>
                        <label className={styles['lname-input-label']} for='lname'>Last Name</label>
                        <input
                            type='text'
                            placeholder='Last name'
                            name='lname'
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles['email-input-container']}>
                        <label className={styles['email-input-label']} for='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles['username-input-container']}>
                        <label className={styles['username-input-label']} for='uname'>Username</label>
                        <input
                            type='username'
                            placeholder='Enter username'
                            name='uname'
                            onChange={e => setUname(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles['password-input-container']}>
                        <label className={styles['password-input-label']} for='psw'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            name='psw'
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles['confirmpassword-input-container']}>
                        <label className={styles['repeat-password-input-label']} for='psw-repeat'>Confirm Password</label>
                        <input
                            type='password'
                            placeholder='Confirm password'
                            name='psw-repeat'
                            onChange={e => setRedonePassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles['checkbox-container']}>
                    <p>By creating an account you agree to our <button className={styles['terms-button']} onClick={openTermsAndConditionsModal}>Terms</button> &<button className={styles['policy-button']} onClick={openPrivacyPolicyModal}>Privacy Policy</button>
                        <input
                            type='checkbox'
                            required name='remember'
                        />
                    </p>
                </div>
                <div className={styles['btn-container']}>
                    <button className={styles['submit-btn']} type='submit' className={styles['submit-btn']} onClick={OnClickHandler}>Sign Up</button>
                </div>
            </form>
            {/* Modals */}
            <TermsAndConditions display={termsAndConditionsDisplay} onClose={closeTermsAndConditionsModal} />
            <PrivacyPolicy display={privacyPolicyDisplay} onClose={closePrivacyPolicyModal} />
        </>
    );
}

export default SignUpPage;