import React from "react";
import './LoginPage.css';

function LoginPage() {
    return (
        <form>
            <h3>Zooble!</h3>

            <div className='container'>
                <label for='email'>Email address</label>
                <input
                    type='email'
                    placeholder='Enter Username'
                    name='email'
                />

                <label for='psw'>Password</label>
                <input
                    type='password'
                    placeholder='Enter password'
                    name='psw'
                />
                <button type='submit' className='submit-btn'>Login</button>
                <p className='forgot-password'>
                    Forgot <a href='#'>password?</a>
                </p>
            </div>
        </form>
    );
}

export default LoginPage;