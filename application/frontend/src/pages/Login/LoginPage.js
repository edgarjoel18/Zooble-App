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
        setAppUser(username);
        console.log(appUser);
        console.log(isLoggedIn);
    }

    if (isLoggedIn){
        console.log(isLoggedIn);
        return <Redirect to="/Feed"/>
    }
    return (
        <form className={styles['login-form']}>
            <div className={styles['login-container']}>
                <h1>Zooble</h1>
                <div className={styles['username-input-container']}>
                    <label className={styles['username-input-label']} for='username'><h3>Username</h3></label>
                    <input
                        type='username'
                        placeholder='Enter Username'
                        name='username'
                        value={username}
                        onChange={e =>setUsername(e.target.value)}
                    />
                </div>
                <div className={styles['password-input-container']}>
                    <label className={styles['password-input-label']} for='password'><h3>Password</h3></label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={password}
                        onChange={e =>setPassword(e.target.value)}
                    />
                </div>
                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']} onClick={loginHandler}>Login</button>
                </div>
                <p className={styles['forgot-password']}>
                    Forgot <a href='#'>password?</a>
                </p>

                <p className={styles['create-account']}>
                    Not registered? <a href='/SignUp-Page'>Create an account</a>
                </p>
            </div>
        </form>
    );
}

export default LoginPage;