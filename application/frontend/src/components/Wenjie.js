import React from 'react';
import './AboutMe.css';
import WenjieJng from '../images/Wenjie.jpg';


function Wenjie() {
    // const hrStyle = {
    //     backgroundColor: 'black',
    //     marginLeft: '0px',
    //     width: '90px'
    // }

    // const headingStyle = {
    //     color: 'black',
    // }

    // const imageStyle = {
    //     marginLeft: '20px',
    //     marginTop: '30px',
    //     width: '400px',
    //     height: '300px'
    // }

    // const containerStyle = {
    //     display: 'grid',
    //     gridTemplateColumns: '490px 290px',
    //     backgroundColor: 'white',
    //     width: '800px',
    //     height: '500px',
    //     border: '1px solid #eee',
    //     boxShadow: '0 2px 2px #ccc',
    //     margin: '50px auto 0 auto',
    //     borderRadius: '15px'
    // }
    

    return (
        // <div >
        //     <div>
        //         <img style={imageStyle} src={WenjieJng}/>
        //     </div>
        //     <div>
        //         <h3 style={headingStyle}>About me</h3>
        //         <hr style={hrStyle}/>
        //         <p>Hello, my name is Wenjie. The picture on the left is my cat Ivy. I am a computer science student at SFSU. In my free time, I like to binge watching Netflix or play vedio games.</p>
        //     </div>
        // </div>
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