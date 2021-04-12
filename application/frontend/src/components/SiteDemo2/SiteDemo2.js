import React,{useState} from "react";

import testImg from '../../images/testImages/test.jpg';
import mapSearchDemo from '../../images/testImages/homepageSideDemo2.png'

import styles from './SiteDemo2.module.css';


function SiteDemo2() {
  const [text, setText] = useState('Try the Tool');


  function onMouseover(e){
    setText('Coming Soon');
  }

  function onMouseout(e){
    setText('Try the Tool');
  }

  return (
    <div className={styles['site-demo2-container']}>
      <div className={styles['site-demo2-box1']}>
        <p className={styles['site-demo2-text']}> <h2>Use our tool to find pets and <br/>resources near you</h2> </p>
        <button className={styles['site-demo2-button']} onMouseEnter={onMouseover} onMouseLeave={onMouseout}>
            <span><h3>{text}</h3></span>
        </button>
      </div>
      <img className={styles['site-demo2-box2']} src={mapSearchDemo} />
    </div>
  );
}

export default SiteDemo2;