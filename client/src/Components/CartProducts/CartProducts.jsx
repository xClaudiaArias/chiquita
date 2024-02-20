import React, { useContext } from 'react'
import './CartProducts.css'
import { ShopContext } from '../../Context/ShopContext'

const CartProducts = () => {
    const { products, cartProducts } = useContext(ShopContext)
    console.log(cartProducts, " -->> Cart Products List")
    console.log(cartProducts.length)

    return (
        <div className='cartproducts'>
            <h1>CART</h1>
            <p><span>0</span> Items</p>

            <div className='cartproducts-list'>
                {
                    products.map((product, i) => {
                        console.log(product, " -->> all products")
                            for (const prod in cartProducts) {
                                if (product._id === prod) {
                                    return <div className='cartproducts-list-card'>
                                    <p>0</p>
                                    <img src={product.image} alt="" />
                                    <div className="cartproducts-list-card-info">
                                        <p>{product.productName}</p>
                                        <p>{product.productDescription}</p>
                                        <div className="cartproducts-list-card-info-colorsize">
                                            <div className="cartproducts-list-card-info-color">
                                                <p>Color:</p>
                                                <div>{product.color}</div>
                                            </div>
                                            <div className="cartproducts-list-card-info-size">
                                                <p>Size:</p>
                                                <p>XS</p>
                                            </div>
                                        </div>
                                        <div className="cartproducts-info-quantity">
                                            <p>Quantity</p>
                                            <div className="qty">
                                                <button>-</button>
                                                <p>0</p>
                                                <button>+</button>
                                            </div>
                                        </div>
                                        <div className="cartproducts-list-card-info-price">
                                            $15.99
                                        </div>
                                        <div className='add-to-wishlist'>
                                            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/like--v1.png" alt="like--v1"/>
                                            <p>Add to wishlist instead?</p>
                                        </div>
                                    </div>
                                </div> 
                                }
                            }
                    })
                }
                
            </div>
        </div>
    )
}

export default CartProducts