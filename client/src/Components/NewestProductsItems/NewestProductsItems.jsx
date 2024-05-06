import { FavoriteBorderOutlined, Search, ShoppingBagOutlined } from '@mui/icons-material'
import React from 'react'
import './NewestProductsItems.css'

const NewestProductsItems = ({item}) => {
    return (
        <div className='newestproductsitems'>
            <img src={item.img} alt="" />
            <div className="newestproductsitems-info">
                <div className="newestproductsitems-info-icon">
                    <Search />
                </div>
                <div className="newestproductsitems-info-icon">
                    <ShoppingBagOutlined />
                </div>
                <div className="newestproductsitems-info-icon">
                    <FavoriteBorderOutlined />
                </div>
            </div>
        </div>
    )
}

export default NewestProductsItems