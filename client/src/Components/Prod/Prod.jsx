import React, { useState, useEffect, useContext } from 'react'
import './Prod.css'
import star_icon from '../Assets/star-icon.png'
import star_icon_full from '../Assets/star-icon-full.png'
import { ShopContext } from '../../Context/ShopContext'


const Prod = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext)

    const [mainImage, setMainImage] = useState("")

    const colorStyle = {
        "backgroundColor": `${product.color}`,
        "width": "15px",
        "height": "15px",
        "borderRadius": "50px",
        "boxShadow": "2px 2px 2px rgba(147,147,147,.4)"
    }

    return (
        <div className='prodDisplay'>
            {/* img  */}
            <div className="prodDisplay-left">
                <ul className='main-slider'>
                    {/* slide images */}
                    <li className="slider">
                        <ul>
                        {
                            product.productImages.map((img, i) => {
                                return (
                                    <li key={i}><img src={img} onClick={()=> {setMainImage(img)}} alt={product.productName}/></li>
                                )
                            })
                        }
                        </ul>
                    </li>
                    <li><img className='main-image' src={mainImage === "" ? product.productImages[1] : mainImage} alt="" /></li>
                </ul>
            </div>

            {/* decription */}
            <div className="prodDisplay-right">
                <h1>{product.productName}</h1>
                <p className="product-description">{product.productDescription}</p>
                <div className="prodDisplay-colors-reviews">
                    <ul className="product-colors">
                        <li>Colors:</li>
                        <li><div style={colorStyle}></div></li>
                    </ul>
                    <div className="prodDisplay-reviews">
                        <p>Reviews: </p>
                        <div className="prodDisplay-reviews-stars">
                            <img src={star_icon_full} alt="" />
                            <img src={star_icon_full} alt="" />
                            <img src={star_icon_full} alt="" />
                            <img src={star_icon_full} alt="" />
                            <img src={star_icon} alt="" />
                        </div>
                    </div>
                </div>
                <div className="prodDisplay-product-sizes">
                    <p>Sizes:</p>
                    <ul>
                        {    
                            product.size.map((s, i) => {
                                return <li key={i}><a href="/">{s}</a></li>
                            })
                        }
                    </ul>
                </div>
                <div className="prodDisplay-info-quantity">
                    <p>Quantity:</p>
                    <div className="prodDisplay-qty">
                        <button>-</button>
                        <p>0</p>
                        <button>+</button>
                    </div>
                </div>
                <div className="prodDisplay-footer">
                    <div className="prodDisplay-product-price">
                        <p>Price:</p>
                        <p className='prodDisplay-price' >${product.price}</p>
                    </div>
                    <button className='prodDisplay-add-to-cart' onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
                </div>
                <p className='productdisplay-right-category'><span>Category:</span> {product.category}, {product.productName}</p>
            </div>
        </div>  
    )
}

export default Prod


