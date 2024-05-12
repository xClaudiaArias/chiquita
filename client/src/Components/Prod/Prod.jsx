import React, { useState, useContext } from 'react'
import './Prod.css'
import star_icon from '../Assets/star-icon.png'
import star_icon_full from '../Assets/star-icon-full.png'
import { ShopContext } from '../../Context/ShopContext'


const Prod = ({product}) => {
    const { addToCart } = useContext(ShopContext)
    const [quantity, setQuantity] = useState(1) //initialize quantity with 1

    const handleAddToCart = () => {
        console.log(product._id, " -->HandleCart Prod.js")
        addToCart(product._id, quantity); // Pass product ID and quantity to addToCart function
    };
    
    const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Increase quantity
    };
    
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1); // Decrease quantity if it's greater than 1
        } 
    };
    

    const [mainImage, setMainImage] = useState("")

    // const colorStyle = {
    //     "backgroundColor": `${product.color}`,
    //     "width": "15px",
    //     "height": "15px",
    //     "borderRadius": "50px",
    //     "boxShadow": "2px 2px 2px rgba(147,147,147,.4)"
    // }

    // TEMPORARY IMAGE OBJECT 
    const images = [
        "https://static.zara.net/assets/public/b8c8/c6c3/852e4376a3ae/b494d49fadb4/00673604250-e1/00673604250-e1.jpg?ts=1711036840288&w=850",
        "https://static.zara.net/assets/public/a980/9802/c89640a992ba/2424e1c181f0/00673604250-e2/00673604250-e2.jpg?ts=1711036842866&w=850",
        "https://static.zara.net/assets/public/dd31/184b/90e743489199/52a991a392ab/00673604250-e3/00673604250-e3.jpg?ts=1711036841673&w=850",
        "https://static.zara.net/assets/public/a980/9802/c89640a992ba/2424e1c181f0/00673604250-e2/00673604250-e2.jpg?ts=1711036842866&w=850",
    ]

    return (
        <div className='prodDisplay'>
            {/* img  */}
            <div className="prodDisplay-left">
                <ul className='main-slider'>
                    {/* slide images */}
                    <li className="slider">
                        <ul>
                        {
                            images.map((img, i) => {
                                return (
                                    <li key={i}><img src={img} onClick={()=> {setMainImage(img)}} alt="" /></li>
                                )
                            })
                        }
                        </ul>
                    </li>
                    <li><img className='main-image' src={mainImage === "" ? images[1] : mainImage} alt="" /></li>
                </ul>
            </div>

            {/* decription */}
            <div className="prodDisplay-right">
                <h1>productName</h1>
                <p className="product-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero quae id, eaque iusto ipsum nemo debitis quia tempore totam nostrum non, libero modi corrupti mollitia? Dicta culpa dolorum aut voluptatibus!</p>
                <div className="prodDisplay-colors-reviews">
                    <ul className="product-colors">
                        <li>Colors:</li>
                        <li><div style={{color: 'red'}}></div></li>
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
                        {/* {    
                            product.size.map((s, i) => {
                                return <li key={i}><a href="/">{s}</a></li>
                            })
                        } */}
                        <li>S</li>
                        <li>M</li>
                        <li>L</li>
                    </ul>
                </div>
                <div className="prodDisplay-info-quantity">
                    <p>Quantity:</p>
                    <div className="prodDisplay-qty">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                </div>
                <div className="prodDisplay-footer">
                    <div className="prodDisplay-product-price">
                        <p>Price:</p>
                        <p className='prodDisplay-price'>$12.00</p>
                    </div>
                    <button className='prodDisplay-add-to-cart' onClick={handleAddToCart}>ADD TO CART</button>
                </div>
                <p className='productdisplay-right-category'><span>Category:</span> category, productName</p>
            </div>
        </div>  
    )
}

export default Prod


