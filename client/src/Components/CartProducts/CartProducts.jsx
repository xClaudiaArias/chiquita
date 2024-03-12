import React, { useContext } from 'react'
import './CartProducts.css'
import { ShopContext } from '../../Context/ShopContext'

const CartProducts = () => {
    const { products, cartProducts, count, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext)

    let sum = 0

    const colorStyle = (e) => {
        return {
            "backgroundColor": `${e}`,
            "width": "15px",
            "height": "15px",
            "borderRadius": "50px",
            "boxShadow": "2px 2px 2px rgba(146, 147, 147, .4)"
        }
    }

    return (
        <div className='cartproducts'>
            <div className='cartproducts-list'>
                <h1>CART</h1>
                <p className='cartproducts-itemcount'><span>{count}</span> items</p>
                <div className="cartproducts-card">
                {
                    products.map((e, i) => {
                            if(cartProducts[e.id] > 0){
                                return <div key={i} className='cartproducts-list-card'>
                                    <p className='cartproducts-list-card-index'>
                                        {sum += 1}
                                    </p>
                                    <img className='cartproducts-list-card-image' src={e.productImages[0]} alt="" />
                                    <div className="cartproducts-list-card-info">
                                        <p className='cartproducts-list-card-info-productName'>{e.productName}</p>
                                        <p className='cartproducts-list-card-info-description'>{e.productDescription}</p>
                                        <div className="cartproducts-list-card-info-colorsize">
                                            <div className="cartproducts-list-card-info-color">
                                                <p>Color:</p>
                                                <div style={colorStyle(e.color)}></div>
                                            </div>
                                            <div className="cartproducts-list-card-info-size">
                                                <p>Size:</p>
                                                <p>XS</p>
                                            </div>
                                        </div>
                                        <div className="cartproducts-info-quantity">
                                            <p>Quantity</p>
                                            <div className="qty">
                                                <button onClick={() => {removeFromCart(e.id)}}>-</button>
                                                <p>{cartProducts[e.id]}</p> 
                                                <button onClick={() => {addToCart(e.id)}}>+</button>
                                            </div>
                                        </div>
                                        <div className="cartproducts-list-card-info-price">
                                            <p>${e.price*cartProducts[e.id]}.00</p>
                                        </div>
                                        <div className='add-to-wishlist'>
                                            <a href="/">Add to wishlist instead?</a>
                                        </div>
                                    </div>
                                </div> 
                                
                            }
                        return null;
                    })
                }
                </div>
                
            </div>

            <div className="cardVertical"></div>

            <div className="cartProducts-side">
                <div className="cartProducts-total">
                    <h1>TOTAL</h1>
                    <div>
                        <div className="cartProducts-total-item">
                            <p>Subtotal:</p>
                            <hr />
                            <p>${getTotalCartAmount()}.00</p>
                        </div>
                        {/* <hr /> */}
                        <div className="cartProducts-total-item">
                            <p>Shipping:</p>
                            <hr />
                            <p>Free</p>
                        </div>
                        {/* <hr /> */}
                        <div className="cartProducts-total-item mainCartProducts-total-item">
                            <p>Total:</p>
                            <hr />
                            <p>${getTotalCartAmount()}.00</p>
                        </div>
                    </div>
                    <div className="cartProducts-total-item">
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartProducts

