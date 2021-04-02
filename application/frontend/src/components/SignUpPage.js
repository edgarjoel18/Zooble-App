import React from "react";
import './SignUpPage.css';

function SignUpPage() {
    return (
        <form>
            <div className='container'>
                <h3>Sign Up</h3>

                <label for='email'>Email</label>
                <input
                    type='email'
                    placeholder='Enter email'
                    name='email'
                />

                <label for='fname'>First name</label>
                <input
                    type='text'
                    placeholder='First name'
                    name='fname'
                />

                <label for='uname'>Username</label>
                <input
                    type='text'
                    placeholder='Enter username'
                    name='uname'
                />

                <label for='Lname'>Last name</label>
                <input
                    type='text'
                    placeholder='Last name'
                    name='lname'
                />

                <label for='psw'>Password</label>
                <input
                    type='password'
                    placeholder='Enter password'
                    name='psw'
                />
                <label for='psw-repeat'>Password</label>
                <input
                    type='password'
                    placeholder='Repeat password'
                    name='psw-repeat'
                />

                <label>
                    <input
                        type='checkbox'
                        checked='checked'
                        name='remember'
                    />
                </label>
                <p>By creating an account you agree to our <a href='#'>Terms & Privacy</a>.</p>

                <button type='submit' className='submit-btn'>Sign Up</button>
            </div>
        </form>
    );
}

export default SignUpPage;