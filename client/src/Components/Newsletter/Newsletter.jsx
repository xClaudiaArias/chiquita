import React, { useEffect, useState } from 'react'
import  { newestProducts } from '../../Data/data'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';

import './Newsletter.css'

const Newsletter = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
        const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === newestProducts.length - 1 ? 0 : prevSlide + 1));
        };
    
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval); 
    }, [currentSlide]); 
    



    return (
        <div className='newsletter'>

        <div className="slideshow">
            {newestProducts.map((item, index) => (
                <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${item.img})` }}
                ></div>
            ))}
        </div>

        <h1>Subscribe to our newsletter</h1>
        <p>Get updates from your favorite products and our new arrivals.</p>
        <div className="newsletter-input-container">
            <MailOutlineIcon />
            <input type="text" placeholder="Your email" />
            <button>
                <SendIcon fontSize={'16px'} />
            </button>           
        </div>


        </div>
    )
}

export default Newsletter