import { FavoriteBorderOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import './NewestProductsItems.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useLocation } from 'react-router-dom';

const NewestProductsItems = ({item}) => {

    return (
        <div className='newestproductsitems'>
            {item.productImages && item.productImages.length > 0 && (
                <img src={item.productImages[0]} alt="" />
            )}
            <div className="newestproductsitems-info">
                <Link to={`/products/${item._id}`}>
                    <div className="newestproductsitems-info-icon">
                            <VisibilityOutlinedIcon /> VIEW
                    </div>
                </Link>
                <div className="newestproductsitems-info-icon">
                    <FavoriteBorderOutlined /> SAVE
                    
                </div>
            </div>
            <p>{item.productName} <span>$20.00</span></p>
        </div>
    )
}

export default NewestProductsItems