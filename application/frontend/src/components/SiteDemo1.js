import React from "react";
import './Home.css';
import testImage from '../images/testImages/vertical-testImage.jpg';


function SiteDemo1() {
  return (
    <div className='site-demo1-container'>
      <div className='site-demo1-leftSideBox'>
        <p className='site-demo1-textBox'> Build a profile and connect 
        <br/>with other pet owners <br/>
        <br/>OR <br/>
        <br/>Find a pet by connecting with
        <br/>a local shelter
        </p>
      </div>


{/* Image Column 1 for site-demo1 */}
      <div className = 'site-demo1-columnContainer'>
        <div className='site-demo1-column'>
          <div className='site-demo1-columnCard'>
          <img className='site-demo2-container-img' src={testImage}/>
          </div>
        </div>
      </div>

{/* Image Column 2 for site-demo1 */}
      <div className = 'site-demo1-columnContainer'>
        <div className='site-demo1-column'>
          <div className='site-demo1-columnCard'>
          <img className='site-demo2-container-img' src={testImage}/>

          </div>


        </div>
      </div>


    </div>
    

    

  );
}


export default SiteDemo1;