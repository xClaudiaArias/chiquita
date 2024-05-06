import React from 'react'
import './NewestProducts.css'
import { newestProducts } from '../../Data/data'
import NewestProductsItems from '../NewestProductsItems/NewestProductsItems'

const NewestProducts = () => {
    return (
        <div className='newestproducts'>
            <h1>New Products</h1>
            <div className="newestproducts-container">
                {
                    newestProducts.map(item => (
                        <NewestProductsItems item={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default NewestProducts