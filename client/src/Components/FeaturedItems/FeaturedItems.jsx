import React from 'react'
import './FeaturedItems.css'

const FeaturedItems = ({item}) => {
    return (
        <div className='featured-items'>
            <img src={item.img} alt={item.title} />
            <div className="featured-items-info">
                <h1>{item.title}</h1>
                <button>SHOP NOW</button>
            </div>
        </div>
    )
}

export default FeaturedItems