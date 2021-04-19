import React from "react";
import styles from './LoginPage.module.css';
import {Redirect, useHistory} from "react-router-dom";

function LoginPage({appUser, setAppUser}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    let history = useHistory();

    function loginHandler(e){
        // setIsLoggedIn(true);
        // setAppUser(username);
        console.log(appUser);
        console.log(isLoggedIn);
        history.push('/feed');
    }

    if (isLoggedIn){
        console.log(isLoggedIn);
        return <Redirect to="/Feed"/>
    }
    return (
            <>
            <div className={styles['login-container']}>
                <div className={styles['login-header']}>Zooble</div>
                <div className={styles['username-input-container']}>
                    <label className={styles['username-input-label']} for='username'>Username</label>
                    <input
                        type='username'
                        placeholder='Enter Username'
                        name='username'
                        value={username}
                        onChange={e =>setUsername(e.target.value)}
                    />
                </div>
                <div className={styles['password-input-container']}>
                    <label className={styles['password-input-label']} for='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={password}
                        onChange={e =>setPassword(e.target.value)}
                    />
                </div>
                <div className={styles['forgot-password']}>
                    <a href='#'> Forgot password?</a>
                </div>
                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']} onClick={loginHandler}>Login</button>
                </div>
                <div className={styles['create-account-link']}>
                    Not registered? <a href='/SignUp-Page'>Create an account</a>
                </div>
            </div>
            </>
    );
}

export default LoginPage;