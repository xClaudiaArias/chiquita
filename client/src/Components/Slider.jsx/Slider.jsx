import './Slider.css'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import React, { useState } from 'react'
import { sliderItems } from '../../Data/data'


const Slider = () => {
    const [slideindex, setSlideIndex] = useState(0)

    const handleClick = (e) => {
        const wrapper = document.querySelector('.wrapper');
        if (e.target.className === 'left-arrow') {
            setSlideIndex(slideindex > 0 ? slideindex - 1 : 2)
        } else if (e.target.className === 'right-arrow') {
            setSlideIndex(slideindex < 2 ? slideindex + 1 : 0)
        }
        wrapper.style.transform = `translateX(${slideindex  * -100}vw)`;
    }
    
    

    return (
        <div className="slider">
            <div className='left-arrow' onClick={handleClick}>
                <ArrowLeft style={{ fill: '#1E1E1E', fontSize: 42, pointerEvents: 'none' }}/>
            </div>

            <div className="wrapper" slideindex={slideindex}>
                { sliderItems.map((item) => (
                    <div className="slide" key={item.id}>
                        <div className="img-container">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="info-container">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <button>START SHOPPING!</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='right-arrow' onClick={handleClick}>
                <ArrowRight style={{ fill: '#1E1E1E', fontSize: 42, pointerEvents: 'none' }}/>
            </div>
        </div>
    )
}

export default Slider