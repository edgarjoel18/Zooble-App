import React from "react";
import styles from './SiteDemo1.module.css';
import siteDemo1Img from '../../images/siteDemo1.png'
import siteDemo2Img from '../../images/siteDemo2.png'


function SiteDemo1() {
  return (
    <div className={styles['site-demo1-container']}>
      <div className={styles['site-demo1-leftSideBox']}>
        <p className={styles['site-demo1-textBox']}> 
        <h2>Build a profile and connect with other pet owners</h2>
        
        <span><br/><h2>OR</h2><br/></span>
        <h2>Find a pet by connecting with a local shelter</h2>
        </p>
      </div>


{/* Image Column 1 for site-demo1 */}
      <div className={styles['site-demo1-columnContainer']}>
        <div className={styles['site-demo1-column']}>
          <div className={styles['site-demo1-columnCard']}>
            <img src={siteDemo1Img}/>
          </div>
        </div>
      </div>

{/* Image Column 2 for site-demo1 */}
      <div className={styles['site-demo1-columnContainer']}>
        <div className={styles['site-demo1-column']}>
          <div className={styles['site-demo1-columnCard']}>
          <img src={siteDemo2Img}/>
          </div>


        </div>
      </div>


    </div>
    

    

  );
}


export default SiteDemo1;