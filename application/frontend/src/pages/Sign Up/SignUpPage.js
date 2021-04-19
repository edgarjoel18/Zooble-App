import React, {useState} from "react";
import Axios from "axios";
import styles from './SignUpPage.module.css';

function SignUpPage() {
    const [email, setEmail] = useState('')
    const [uname, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [redonePassword, setRedonePassword] = useState('')

    function OnClickHandler(e){
        console.log(email)
        console.log(uname)
        console.log(firstName)
        console.log(lastName)
        console.log(password)
        console.log(redonePassword)
         Axios.get('/sign-up',{
           params: {
             email: email,
             firstName:firstName,
             lastName: lastName,
             uname: uname,
             password: password,
             redonePassword: redonePassword
             }})
           .then(response =>{
           console.log(response)
           console.log(response.data)
           console.log(response.data.searchResults)
        })
      }

    return (
        <div className={styles['sign-up-container']}>
            <div className={styles['sign-up-header']}>Sign Up</div>
            <div className={styles['email-input-container']}>
                <label for='email'>Email</label>
                <input
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    onChange= {e => setEmail(e.target.value)}
                />
            </div>
            <div className={styles['username-input-container']}>
                <label for='uname'>Username</label>
                <input
                    type='text'
                    placeholder='Enter username'
                    name='uname'
                    onChange= {e => setUname(e.target.value)}
                />
            </div>
            <div className={styles['first-name-input-container']}>
                <label for='fname'>First name</label>
                <input
                    type='text'
                    placeholder='First name'
                    name='fname'
                    onChange= {e => setFirstName(e.target.value)}
                />
            </div>
            <div className={styles['last-name-input-container']}>
                <label for='Lname'>Last name</label>
                <input
                    type='text'
                    placeholder='Last name'
                    name='lname'
                    onChange= {e => setLastName(e.target.value)}
                />
            </div>
            <div className={styles['password-input-container']}>
                <label for='psw'>Password</label>
                <input
                    type='password'
                    placeholder='Enter password'
                    name='psw'
                    onChange= {e => setPassword(e.target.value)}
                />
            </div>
            <div className={styles['rpt-password-input-container']}>
                <label for='psw-repeat'>Confirm password</label>
                <input
                    type='password'
                    placeholder='Confirm password'
                    name='psw-repeat'
                    onChange= {e => setRedonePassword(e.target.value)}
                />
            </div>
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
            <div className={styles['signup-btn-container']}>
                <button onClick={OnClickHandler} className={styles['sign-up-btn']}>Sign Up</button>
            </div>
        </div>
    );
}

export default SignUpPage;