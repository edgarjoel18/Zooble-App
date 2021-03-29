import React from 'react'
import HeroContainer from './HeroContainer.js'
import SiteDemo1 from './SiteDemo1.js'
import SiteDemo2 from './SiteDemo2.js'
import Footer from './Footer.js'

import "./Home.css"

function Home() {
    return (
        <div>
            <HeroContainer/>
            <SiteDemo1/>
            <SiteDemo2/>
            <Footer/>
        </div>
    )
}

export default Home;
