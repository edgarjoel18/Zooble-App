import React from 'react'

import './AboutMe.css'

import SabrinaJPG from '../../images/Sabrina.jpg'

function Sabrina() {
    return (
        <div className="about-me-container">
        <div className="about-me-card">
            <span className="about-me-header">Hello there. My name is Sabrina Dang.</span><br></br>
            <div className="about-me-body">
                <p>
                    I am a senior at SFSU studying Computer Science and looking forward to learning more with my peers. 
                    I enjoy playing games and chatting with friends online. My cat unfortunately passed a few weeks ago 
                    due to a health issue. I love our website concept and hope it's great for everyone too.
                </p>
            </div>
            <img className="about-me-img" src={SabrinaJPG}/>
        </div>
    </div>
    )
}

export default Sabrina
