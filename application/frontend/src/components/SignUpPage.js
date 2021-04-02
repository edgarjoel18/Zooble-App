import React from "react";
import './SignUpPage.css';

function SignUpPage() {
    return (
        <form>
            <div className='container'>
                <h1>Sign Up</h1>

                <label for='email'>Email</label>
                <input
                    type='email'
                    placeholder='Enter email'
                    name='email'
                />

                <label for='uname'>Username</label>
                <input
                    type='text'
                    placeholder='Enter username'
                    name='uname'
                />

                <label for='fname'>First name</label>
                <input
                    type='text'
                    placeholder='First name'
                    name='fname'
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
                <label for='psw-repeat'>Repeat password</label>
                <input
                    type='password'
                    placeholder='Repeat password'
                    name='psw-repeat'
                />

                <p>By creating an account you agree to our <a href='#'>Terms & Privacy</a>
                    <label>
                        <input
                            type='checkbox'
                            name='remember'
                        />
                    </label>
                </p>


                <button type='submit' className='submit-btn'>Sign Up</button>
            </div>
        </form>
    );
}

export default SignUpPage;