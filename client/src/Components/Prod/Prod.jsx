import React, { useState, useEffect, useContext } from 'react'
import './Prod.css'
import star_icon from '../Assets/star-icon.png'
import star_icon_full from '../Assets/star-icon-full.png'
import { ShopContext } from '../../Context/ShopContext'


const Prod = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext)

    const colorStyle = {
        "backgroundColor": `${product.color}`,
        "width": "15px",
        "height": "15px",
        "borderRadius": "50px"
    }

    return (
        <div className='prodDisplay'>
            {/* img  */}
            <div className="prodDisplay-left">
                <ul>
                        {
                            product.productImages.map((img, i) => {
                                return <li key={i}><img src={img} alt={product.productName}/></li>
                            })
                        }
                </ul>
            </div>

            {/* decription */}
            <div className="prodDisplay-right">
                <h1>{product.productName}</h1>
                <div className="prodDisplay-colors-reviews">
                    <ul className="product-colors">
                        <li>Colors:</li>
                        <li><div style={colorStyle}></div></li>
                    </ul>
                    <div className="prodDisplay-reviews">
                        <p>Reviews: </p>
                        <img src={star_icon_full} alt="" />
                        <img src={star_icon_full} alt="" />
                        <img src={star_icon_full} alt="" />
                        <img src={star_icon_full} alt="" />
                        <img src={star_icon} alt="" />
                    </div>
                </div>
                
                <p className="product-description">{product.productDescription}</p>
                <ul className="product-sizes">
                    <li>Sizes:</li>
                    {    
                        product.size.map((s, i) => {
                            return <li key={i}><a href="/">{s}</a></li>
                        })
                    }
                </ul>
                <div className="product-price">
                    <p>${product.price}</p>
                </div>
                <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category:</span> {product.category}, {product.productName}</p>
            </div>
        </div>  
    )
}

export default Prod


