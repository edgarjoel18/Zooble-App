import React, { useContext, useState } from "react";
import Axios from "axios";
import styles from './LoginPage.module.css';
import { Redirect, useHistory } from "react-router-dom";
import ForgotPassword from "../../components/Modals/ForgotPassword";

import { RedirectPathContext } from '../../context/redirectPath';

function LoginPage({appUser, updateLoginState}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //toggle forgot password modal
    const [forgotPasswordModalDisplay, setForgotPasswordModalDisplay] = useState(false);

    const [error, setError] = useState(null);

    const redirectContext = useContext(RedirectPathContext);

    let history = useHistory();

    const errorDisplay = error ? 
    <div className={styles['login-error-container']}>
        {error}
    </div> : "";

    function loginHandler(event) {
        event.preventDefault();
        console.log(username);
        console.log(password);
            
            console.log("AppUser in Login Handler: " + appUser);
            Axios.post('http://localhost:5000/login', {
                    username: username,
                    password: password,
                },{withCredentials:true})
                .then(response => {
                    console.log(response.data)

                    if(response.data === true){
                        console.log(username);
                        updateLoginState(response.data,username);
                        history.push(redirectContext.redirectPath)
                    }
                })
                .catch(error => {
                    if(error.response.data ==="no match"){
                        setError("Username or Password is Incorrect");
                    }
                })
    }

    if(appUser){
         console.log('User is Logged In');
        return <Redirect to={redirectContext.redirectPath} />
    }

    return (
        <>
            <form className={styles['login-container']} onSubmit={loginHandler}>
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
                    <span className={styles['forgot-password']}>
                        <button onClick={() => setForgotPasswordModalDisplay(true)}> Forgot password?</button>
                    </span>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']}>Login</button>


                </div>
                <div className={styles['checkbox']}>
                        <input type='checkbox' name='remember'/> Remember Me
                    </div>

                <div className={styles['create-account-link']}>
                    Not registered? <a href='/account-type'>Create an account</a>
                </div>
                {errorDisplay}
            </form>
            <ForgotPassword display={forgotPasswordModalDisplay} onClose={()=>setForgotPasswordModalDisplay(false)}/>
        </>
    );
}

export default LoginPage;