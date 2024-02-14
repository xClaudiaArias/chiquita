// fetches products

import React, { useState, useEffect } from 'react'
import Item from '../Item/Item'

const Prod = (props) => {
    // console.log(props, " --> props in product")
    //TODO: add all images
    //FIXME: change size IN CSS file
    const { product } = props;

    return (
        <div className='prodDisplay'>
            {/* img  */}
            <div className="prodDisplay-left">

                <img src={product.productImages[0]} alt={product.productName} width="400px" height="500px"/>
            </div>

            {/* decription */}
            <div className="prodDisplay-right">
                <h1>{product.productName}</h1>
                <div className="product-price">
                    <p>${product.price}</p>
                </div>
            </div>
        </div>  
    )
}

export default Prod