import React from "react";
import './LoginPage.css';

function LoginPage() {
    return (
        <form>
            <h3>Zooble!</h3>

            <div className='form-group'>
                <label>Email address</label>
                <input 
                    type='email' 
                    className='form-control'
                    placeholder='Enter email' 
                />
            </div>

            <div className='form-group'>
                <label>Password</label>
                <input 
                    type='password' 
                    className='form-control'
                    placeholder='Enter password' 
                />
            </div>

            <button type='submit' className='submit-btn'>Sign Up</button>
            <p className='forgot-password'>
                Forgot <a href='#'>password?</a>
            </p>
        </form>
    );
}

export default LoginPage;