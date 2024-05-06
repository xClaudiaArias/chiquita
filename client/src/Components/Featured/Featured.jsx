import React from 'react'
import './Featured.css'
import { categories } from '../../Data/data'
import FeaturedItems from '../FeaturedItems/FeaturedItems'

const Featured = () => {
    return (
        <div className='featured-categories'>
            <h1 className='featured-h1'>Featured Categories</h1>
            <div className='featured'>
                {
                    categories.map(item => (
                        <FeaturedItems item={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Featured