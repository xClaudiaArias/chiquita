import React, { useContext } from 'react'
import './CartProducts.css'
import { ShopContext } from '../../Context/ShopContext'

const CartProducts = () => {
    const { products, cartProducts } = useContext(ShopContext)
    // console.log(cartProducts.length, " --> cartProducts.length")

    return (
        <div className='cartproducts'>
            <h1>CART</h1>
            <p><span>0</span> Products</p>

            <div className='cartproducts-list'>
                {
                    products.map((e, i) => {
                            // console.log(cartProducts, cartProducts[e.id], " --->cartProducts")
                            // console.log(e.id, " ---> e.id")
                            if(cartProducts[e.id] > 0){
                                return <div key={i} className='cartproducts-list-card'>
                                    <img src={e.image} alt="" />
                                    <div className="cartproducts-list-card-info">
                                        <p>{e.productName}</p>
                                        <p>{e.productDescription}</p>
                                        <div className="cartproducts-list-card-info-colorsize">
                                            <div className="cartproducts-list-card-info-color">
                                                <p>Color:</p>
                                                <div>{e.color}</div>
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
                                            {e.price}
                                        </div>
                                        <div className='add-to-wishlist'>
                                            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/like--v1.png" alt="like--v1"/>
                                            <p>Add to wishlist instead?</p>
                                        </div>
                                    </div>
                                </div> 
                                
                            }
                        return null;
                    })
                }
            </div>
        </div>
    )
}

export default CartProducts

