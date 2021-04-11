import React from 'react';
import './AboutMe.css';
import WenjieJng from '../../images/Wenjie.jpg';


function Wenjie() {

    return (
        <div className="about-me-container">
        <div className="about-me-card">
            <span className="about-me-header">Hi! My name is Wenjie</span><br/><br/>
            <div className="about-me-body">
                <p>I am a computer science student at SFSU. The picture on the right is my cat Ivy. She owns my bed now so I have to ask her if she is willing to share her bed with me. In my free time, I like to binge watching Netflix or play vedio games.</p>
                </div>
            <img className="about-me-img" src={WenjieJng}/>
        </div>
    </div>
    )
}

export default Wenjie;