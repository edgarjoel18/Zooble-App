import React, { useState } from "react";
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
import styles from './SignUpPage.module.css';

function SignUpPage() {
    const [email, setEmail] = useState('')
    const [uname, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [redonePassword, setRedonePassword] = useState('')

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
        })
            .then(response => {
                console.log(response)
                console.log(response.data)
                console.log(response.data.searchResults)
            })
    }

    return (
        <form className={styles['signup-form']}>
            <div className={styles['signup-container']}>
                <h1>Sign Up</h1>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['email-input-label']} for='email'><h3>Email</h3></label>
                            <input
                                type='email'
                                placeholder='Enter email'
                                name='email'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['username-input-label']} for='uname'><h3>Username</h3></label>
                            <input
                                type='username'
                                placeholder='Enter username'
                                name='uname'
                                onChange={e => setUname(e.target.value)}
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['password-input-label']} for='psw'><h3>Password</h3></label>
                            <input
                                type='password'
                                placeholder='Enter password'
                                name='psw'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['repeat-password-input-label']} for='psw-repeat'><h3>Confirm Password</h3></label>
                            <input
                                type='password'
                                placeholder='Repeat password'
                                name='psw-repeat'
                                onChange={e => setRedonePassword(e.target.value)}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['fname-input-label']} for='fname'><h3>First Name</h3></label>
                            <input
                                type='text'
                                placeholder='First name'
                                name='fname'
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['lname-input-lablel']} for='lname'><h3>Last Name</h3></label>
                            <input
                                type='text'
                                placeholder='Last name'
                                name='lname'
                                onChange={e => setLastName(e.target.value)}
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
                    <button type='submit' className={styles['submit-btn']} onClick={OnClickHandler}>Sign Up</button>
                </div>
            </div>
            <div className={styles['signup-btn-container']}>
                <button onClick={OnClickHandler} className={styles['sign-up-btn']}>Sign Up</button>
            </div>
        </form>
    );
}

export default SignUpPage;