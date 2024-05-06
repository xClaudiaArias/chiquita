import React from 'react'
import Slider from '../Components/Slider.jsx/Slider'
import Featured from '../Components/Featured/Featured'
// import OurPicks from '../Components/OurPicks/OurPicks'
import NewestProducts from '../Components/NewestProducts/NewestProducts'
import Newsletter from '../Components/Newsletter/Newsletter'


const Home = () => {

    return (
        <div className='home'>
            <Slider />
            <Featured />
            <NewestProducts />
            {/* <OurPicks /> */}
            <Newsletter />
        </div>
    )
}

export default Home