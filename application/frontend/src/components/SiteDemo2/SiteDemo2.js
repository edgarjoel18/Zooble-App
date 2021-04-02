import React,{useState} from "react";

import testImg from '../../images/testImages/test.jpg';

import './SiteDemo2.css';


function SiteDemo2() {
  const [text, setText] = useState('Try the Tool');


  function onMouseover(e){
    setText('Coming Soon');
  }

  function onMouseout(e){
    setText('Try the Tool');
  }

  return (
    <div className='site-demo2-container'>
      <div className='site-demo2-box1'>
        <p className='site-demo2-text'> Use our tool to find pets and <br/>resources near you </p>
        <button className='site-demo2-button' onMouseEnter={onMouseover} onMouseLeave={onMouseout}>
            <span>{text}</span>
        </button>
      </div>
      <div className='site-demo2-box2'>
      </div>
    </div>
  );
}

export default SiteDemo2;