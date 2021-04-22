import {useState} from "react";

import MapSearchPreview from '../../images/MapSearchPreview.png'

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
      <div className={styles['left-side']}>
        <img className={styles['left-side-map']} src={MapSearchPreview} />
      </div>
      <div className={styles['right-side']}>
        <div className={styles['right-side-text']}>
            Use our location search tool to find pets and small businesses near you 
            <button className={styles['site-demo2-button']} onMouseEnter={onMouseover} onMouseLeave={onMouseout}>
            {text}
        </button>
        </div>
      </div>
    </div>
  );
}

export default SiteDemo2;