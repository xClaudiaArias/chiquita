import React from 'react'
import './Similar.css'
import { similarItems } from '../../Data/data'
import SimilarProducts from '../SimilarProducts/SimilarProducts'

const Similar = () => {
    return (
        <div className='similar-categories'>
            <h1 className='similar-h1'>You may also like</h1>
            <div className='similar'>
                {
                    similarItems.map(item => (
                        <SimilarProducts item={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Similar