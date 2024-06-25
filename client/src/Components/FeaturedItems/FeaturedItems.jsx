import React from 'react'
import './FeaturedItems.css'
import { Link } from 'react-router-dom'

const FeaturedItems = ({item}) => {
    return (
        <div className='featured-items'>
            <img src={item.img} alt={item.title} />
            <div className="featured-items-info">
                <h1>{item.title}</h1>
                <Link to="/products/toddlers"><button>SHOP NOW</button></Link>
            </div>
        </div>
    )
}

export default FeaturedItems