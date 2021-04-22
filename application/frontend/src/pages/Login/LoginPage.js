import React, { useState } from "react";
import Axios from "axios";
import styles from './LoginPage.module.css';
import { Redirect, useHistory } from "react-router-dom";

function LoginPage({ appUser, setAppUser }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    function loginHandler(e) {
        console.log(username);
        console.log(password);
        setAppUser(username);
        console.log("AppUser in Login Handler: " + appUser);
        if(username && password){
            Axios.get('/login', {
                params: {
                    username: username,
                    password: password,
                }
            })
                .then(response => {
                    console.log(response)
                    console.log(response.data)
                    history.push('/feed')
                })
                .catch(error => {
                    console.log("Error");
                })
        }
    }

    if(appUser){
         console.log('User is Logged In');
        return <Redirect to="/Feed"/>
    }
    return (
        <>
            <form className={styles['login-container']}>
                <div className={styles['login-header']}>Login</div>
                <div className={styles['username-input-container']}>
                    <label className={styles['username-input-label']} for='username'>Username</label>
                    <input
                        type='username'
                        placeholder='Enter Username'
                        name='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles['password-input-container']}>
                    <label className={styles['password-input-label']} for='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles['forgot-password']}>
                    <a href='#'> Forgot password?</a>
                </div>
                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']} onClick={loginHandler}>Login</button>

                    <div className={styles['checkbox']}>
                        <input type='checkbox' name='remember'/> Stay logged in
                    </div>
                </div>

                <p className={styles['create-account']}>
                    Not registered? <a href='/account-type'>Create an account</a>
                </p>
            </form>
        </>
    );
}

export default LoginPage;