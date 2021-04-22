import React, { useState } from "react";
import Axios from "axios";
import styles from './LoginPage.module.css';
import { Redirect, useHistory } from "react-router-dom";
import ForgotPassword from "../../components/Modals/ForgotPassword";

function LoginPage({ appUser, setAppUser }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //toggle forgot password modal
    const [forgotPasswordModalDisplay, setForgotPasswordModalDisplay] = useState(false);

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
                    <button onClick={() => setForgotPasswordModalDisplay(true)}> Forgot password?</button>
                </div>
                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']} onClick={loginHandler}>Login</button>


                </div>
                <div className={styles['checkbox']}>
                        <input type='checkbox' name='remember'/> Remember Me
                    </div>

                <p className={styles['create-account']}>
                    Not registered? <a href='/account-type'>Create an account</a>
                </p>
            </form>
            <ForgotPassword display={forgotPasswordModalDisplay} onClose={()=>setForgotPasswordModalDisplay(false)}/>
        </>
    );
}

export default LoginPage;