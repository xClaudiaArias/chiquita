// fetches products

import React, { useState, useEffect, useContext } from 'react'
import './Prod.css'
import star_icon from '../Assets/star-icon.png'
import star_icon_full from '../Assets/star-icon-full.png'
import { ShopContext } from '../../Context/ShopContext'


const Prod = (props) => {
    //TODO: add all images
    //FIXME: change size IN CSS file

    const { product } = props;
    const { addToCart } = useContext(ShopContext)
    // console.log(product,  " ---> in prod.jsx")

    const colorStyle = {
        "backgroundColor": `${product.color}`,
        "width": "15px",
        "height": "15px",
        "borderRadius": "50px"
    }

    const [mainImage, setMainImage] = useState("main-image")

    return (
        <div className='prodDisplay'>
            {/* img  */}
            <div className="prodDisplay-left">
                <ul>
                    {
                        product.productImages.map((img, i) => {
                            return <li><img key={i} src={img} alt={product.productName}/></li>
                        })
                    }
                    {/* remove this 👇 */}
                    <img src={product.productImages[0]} alt={product.productName}/>
                    <img src={product.productImages[1]} alt={product.productName}/>
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
                        product.size.map((s) => {
                            return <li><a href="/">{s}</a></li>
                        })
                    }
                </ul>
                <div className="product-price">
                    <p>${product.price}</p>
                </div>
                <button onClick={() => addToCart(product._id)}>ADD TO CART</button>
            </div>
        </div>  
    )
}

export default Prod