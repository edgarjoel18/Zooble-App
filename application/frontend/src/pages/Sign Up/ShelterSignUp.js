import {useState} from 'react';
import { NavLink } from "react-router-dom";

import {Axios} from 'axios'
import styles from './SignUpPage.module.css';

import Input from '../../components/UI/Input/Input';

function ShelterSignUpPage() {
    const [email, setEmail] = useState('')
    const [uname, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [redonePassword, setRedonePassword] = useState({
        inputConfig: {
            type: 'password',
            placeholder: 'Confirm password',
            name: 'psw-repeat'
        },
        value: '', 
        valid: false,
        touched: false
    })

    const [termsAndConditionsDisplay,setTermsAndConditionsDisplay]= useState(false);
    const [privacyPolicyDisplay,setPrivacyPolicyDisplay]= useState(false);
  
    function openTermsAndConditionsModal(){
      setTermsAndConditionsDisplay(true);
    }
  
    function closeTermsAndConditionsModal(){
      setTermsAndConditionsDisplay(false);
    }
  
    function openPrivacyPolicyModal(){
      setPrivacyPolicyDisplay(true);
    }
  
    function closePrivacyPolicyModal(){
      setPrivacyPolicyDisplay(false);
    }

    function OnClickHandler() {
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
        })
        .then(response => {
            console.log(response)
            console.log(response.data)
            console.log(response.data.searchResults)
        })
        .catch(error =>{
            console.log("Error");
        })
    }

    function onPasswordChangedHandler(event) {
        const updatedPassword = {
            ...redonePassword,
            value: event.target.value,
            valid: event.target.value === password,
            touched: true
        };
        setRedonePassword(updatedPassword);
    }

    return (
            <>

            <form className={styles['signup-container']}>
                <div className={styles['signup-container-header']}>
                    Create an Account for your Shelter
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
                            {/* <input
                                type='password'
                                placeholder='Confirm password'
                                name='psw-repeat'
                                onChange={e => setRedonePassword(e.target.value)}
                                required
                            /> */}
                            <Input
                                config={redonePassword.inputConfig}
                                value={redonePassword.value}
                                valid={redonePassword.valid}
                                touched={redonePassword.touched}
                                changed={event => onPasswordChangedHandler(event)}
                            />
                        </div>
                    </div>
                
                    {/* <div className={styles['checkbox-container']}>
                            <p>By creating an account you agree to our <button className={styles['terms-button']} onClick={openTermsAndConditionsModal}>Terms</button> &<button className={styles['policy-button']} onClick={openPrivacyPolicyModal}>Privacy Policy</button>
                                <input
                                    type='checkbox'
                                    required name='remember'
                                />
                            </p>
                    </div> */}
                    <NavLink to="/shelter-signup2">
                    <div className={styles['btn-container']}>
                        {/* <button type='submit' className={styles['submit-btn']}>Next: Shelter Details</button> */}
                        <button disabled={!redonePassword.valid} type='submit' className={styles['submit-btn']}>Next: Business Details</button>
                    </div>
                </NavLink>
                </form>
        </>
    );
}

export default ShelterSignUpPage;