import { FavoriteBorderOutlined, Search, ShoppingBagOutlined } from '@mui/icons-material'
import React from 'react'
import './NewestProductsItems.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const NewestProductsItems = ({item}) => {
    return (
        <div className='newestproductsitems'>
            <img src={item.img} alt="" />
            <div className="newestproductsitems-info">
                <div className="newestproductsitems-info-icon">
                    <VisibilityOutlinedIcon /> VIEW
                </div>
                <div className="newestproductsitems-info-icon">
                    <ShoppingBagOutlined /> BUY
                </div>
                <div className="newestproductsitems-info-icon">
                    <FavoriteBorderOutlined /> SAVE
                </div>
            </div>
            <p>Product Name Here <span>$20.00</span></p>
        </div>
    )
}

export default NewestProductsItems