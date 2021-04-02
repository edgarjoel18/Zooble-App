import React from "react";
import './SiteDemo1.css';
import testImage from '../images/testImages/vertical-testImage.jpg';
import siteDemo1Img from '../images/siteDemo1.png'
import siteDemo2Img from '../images/siteDemo2.png'


function SiteDemo1() {
  return (
    <div className='site-demo1-container'>
      <div className='site-demo1-leftSideBox'>
        <p className='site-demo1-textBox'> 
        Build a profile and connect with other pet owners
        <br/>OR<br/>
        Find a pet by connecting with a local shelter
        </p>
      </div>


{/* Image Column 1 for site-demo1 */}
      <div className = 'site-demo1-columnContainer'>
        <div className='site-demo1-column'>
          <div className='site-demo1-columnCard'>
            <img src={siteDemo1Img}/>
          </div>
        </div>
      </div>

{/* Image Column 2 for site-demo1 */}
      <div className = 'site-demo1-columnContainer'>
        <div className='site-demo1-column'>
          <div className='site-demo1-columnCard'>
          <img src={siteDemo2Img}/>
          </div>


        </div>
      </div>


    </div>
    

    

  );
}


export default SiteDemo1;