import React from 'react'

import './AboutMe.css'

import EmJPG from '../../images/Em.jpg'

function Em() {
    return (
        <div className="about-me-container">
        <div className="about-me-card">
            <span className="about-me-header">Self-Introduction.</span><br></br>
            <div className="about-me-body">
                <p>
                    I am a senior in my last semester at San Francisco State studying Computer Science.
		    I enjoy designing useful software and teaching computer science. In my spare time, I
		    hike, learn about history, and write.
                </p>
            </div>
            <img className="about-me-img" src={EmJPG}/>
        </div>
    </div>
    )
}

export default Em
