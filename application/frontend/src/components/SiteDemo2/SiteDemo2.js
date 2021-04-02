import React from "react";

import testImg from '../../images/testImages/test.jpg';

import './SiteDemo2.css';


function SiteDemo2() {
  return (
    <div className='site-demo2-container'>
      <div className='site-demo2-box1'>
        <p className='site-demo2-text'> Use our tool to find pets and <br/>resources near you </p>
        <button className='site-demo2-button'>
          <span>Try the Tool</span>
        </button>
      </div>
      <div className='site-demo2-box2'> 
        Map Search UI Image
      </div>
    </div>
  );
}

export default SiteDemo2;