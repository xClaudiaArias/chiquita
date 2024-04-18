import React, { useContext } from 'react';
import './CartProducts.css';
import { ShopContext } from '../../Context/ShopContext';

const CartProducts = () => {
    const { products, cartProducts, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    const colorStyle = (color) => {
        return {
            backgroundColor: color,
            width: '15px',
            height: '15px',
            borderRadius: '50px',
            boxShadow: '2px 2px 2px rgba(146, 147, 147, .4)'
        };
    };

    let i = 0

    return (
        <div className='cartproducts'>
            <div className='cartproducts-list'>
                <h1>CART</h1>
                <p className='cartproducts-itemcount'>
                    <span>{Object.values(cartProducts).reduce((acc, curr) => acc + curr, 0)}</span> items
                </p>
                <div className="cartproducts-card">
                    {Object.keys(cartProducts).map((productId, index) => {
                        const quantity = cartProducts[productId];
                        const product = products.find((p) => p._id === productId);

                        if (quantity > 0 && product) {
                            return (
                                <div key={index} className='cartproducts-list-card'>

                                    
                                    <p className='cartproducts-list-card-index'>{i += 1}</p>


                                    <img className='cartproducts-list-card-image' src={product.productImages[0]} alt={product.productName} />
                                    <div className="cartproducts-list-card-info">
                                        <p className='cartproducts-list-card-info-productName'>{product.productName}</p>
                                        <p className='cartproducts-list-card-info-description'>{product.productDescription}</p>
                                        <div className="cartproducts-list-card-info-colorsize">
                                            <div className="cartproducts-list-card-info-color">
                                                <p>Color:</p>
                                                <div style={colorStyle(product.color)}></div>
                                            </div>
                                            <div className="cartproducts-list-card-info-size">
                                                <p>Size:</p>
                                                <p>XS</p>
                                            </div>
                                        </div>
                                        <div className="cartproducts-info-quantity">
                                            <p>Quantity</p>
                                            <div className="qty">
                                                <button onClick={() => removeFromCart(productId)}>-</button>
                                                <p>{quantity}</p>
                                                <button onClick={() => addToCart(productId, 1)}>+</button>
                                            </div>
                                        </div>
                                        <div className="cartproducts-list-card-info-price">
                                            <p>${product.price * quantity}</p>
                                        </div>
                                        <div className='add-to-wishlist'>
                                            <a href="/">Add to wishlist instead?</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
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
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <div className="cartProducts-total-item">
                            <p>Shipping:</p>
                            <hr />
                            <p>Free</p>
                        </div>
                        <div className="cartProducts-total-item mainCartProducts-total-item">
                            <p>Total:</p>
                            <hr />
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <div className="cartProducts-total-item">
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProducts;
