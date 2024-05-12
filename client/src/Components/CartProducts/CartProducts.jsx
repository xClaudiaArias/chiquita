import React, { useContext } from 'react';
import './CartProducts.css';
import { ShopContext } from '../../Context/ShopContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CartProducts = () => {
    const { products, cartProducts, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    // const colorStyle = (color) => {
    //     return {
    //         backgroundColor: color,
    //         width: '15px',
    //         height: '15px',
    //         borderRadius: '50px',
    //         boxShadow: '2px 2px 2px rgba(146, 147, 147, .4)'
    //     };
    // };

    // DO NOT DELETE ⚠️ for the items 👇
    // let i = 0

    return (
        <div className='cartproducts'>
            <div className='cartproducts-list'>
                <h1>YOUR SHOPPING BAG</h1>
                <p className='cartproducts-itemcount'>
                    <span> 4 </span> items
                </p>

                <div className="cartproducts-card">  {/* START CART CONTAINER */}

                    <div className='cartproducts-list-card'>
                        <p className='cartproducts-list-card-index'>1</p>
                        <img className='cartproducts-list-card-image' src="https://static.zara.net/assets/public/4ae2/eaf5/b10f4b37bbce/7c36455e3302/01605785712-e1/01605785712-e1.jpg?ts=1715242793951&w=850" alt="cute dress" />

                        <div className="cartproducts-list-card-info">
                            <p className='cartproducts-list-card-info-productName'>Cute Dress Floral</p>
                            <p className='cartproducts-list-card-info-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis debitis eos exercitationem quod culpa.</p>
                            <div className="cartproducts-list-card-info-colorsize">
                                <div className="cartproducts-list-card-info-color">
                                    <p>Color:</p>
                                    <div style={{"color": "blue"}}></div>
                                </div>
                                <div className="cartproducts-list-card-info-size">
                                    <p>Size:</p>
                                    <p>XS</p>
                                </div>
                            </div>
                            <div className="cartproducts-info-quantity">
                                <p>Quantity</p>
                                <div className="qty">
                                    <RemoveIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                    <p>2</p>
                                    <AddIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                </div>
                            </div>
                            <div className="cartproducts-list-card-info-price">
                                <p>$20.00</p>
                            </div>
                            <div className='add-to-wishlist'>
                                <button><FavoriteBorderIcon style={{ fill: '#1E1E1E', fontSize: 14 }} /> Add to wishlist instead?</button>
                            </div>
                        </div>
                    </div>

                    {/* --------  */}

                    <div className='cartproducts-list-card'>
                        <p className='cartproducts-list-card-index'>2</p>
                        <img className='cartproducts-list-card-image' src="https://static.zara.net/assets/public/a3c8/7fcd/e0434d2ebf58/8c164a00aa1e/04441579400-e1/04441579400-e1.jpg?ts=1712158714340&w=850" alt="cute dress" />

                        <div className="cartproducts-list-card-info">
                            <p className='cartproducts-list-card-info-productName'>Jean Dress Casual</p>
                            <p className='cartproducts-list-card-info-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis debitis eos exercitationem quod culpa.</p>
                            <div className="cartproducts-list-card-info-colorsize">
                                <div className="cartproducts-list-card-info-color">
                                    <p>Color:</p>
                                    <div style={{"color": "blue"}}></div>
                                    <div style={{"color": "pink"}}></div>
                                </div>
                                <div className="cartproducts-list-card-info-size">
                                    <p>Size:</p>
                                    <p>XS</p>
                                </div>
                            </div>
                            <div className="cartproducts-info-quantity">
                                <p>Quantity</p>
                                <div className="qty">
                                    <RemoveIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                    <p>1</p>
                                    <AddIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                </div>
                            </div>
                            <div className="cartproducts-list-card-info-price">
                                <p>$30.00</p>
                            </div>
                            <div className='add-to-wishlist'>
                                <button><FavoriteBorderIcon style={{ fill: '#1E1E1E', fontSize: 14 }} /> Add to wishlist instead?</button>
                            </div>
                        </div>
                    </div>

                    <div className='cartproducts-list-card'>
                        <p className='cartproducts-list-card-index'>3</p>
                        <img className='cartproducts-list-card-image' src="https://static.zara.net/assets/public/f25f/0aca/36a5424989db/de500d5c92c6/01561494615-e1/01561494615-e1.jpg?ts=1712917013926&w=850" alt="cute dress" />

                        <div className="cartproducts-list-card-info">
                            <p className='cartproducts-list-card-info-productName'>Yellow A line dress</p>
                            <p className='cartproducts-list-card-info-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis debitis eos exercitationem quod culpa.</p>
                            <div className="cartproducts-list-card-info-colorsize">
                                <div className="cartproducts-list-card-info-color">
                                    <p>Color:</p>
                                    <div style={{"color": "yellow"}}></div>
                                </div>
                                <div className="cartproducts-list-card-info-size">
                                    <p>Size:</p>
                                    <p>XS</p>
                                </div>
                            </div>
                            <div className="cartproducts-info-quantity">
                                <p>Quantity</p>
                                <div className="qty">
                                    <RemoveIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                    <p>2</p>
                                    <AddIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                </div>
                            </div>
                            <div className="cartproducts-list-card-info-price">
                                <p>$30.00</p>
                            </div>
                            <div className='add-to-wishlist'>
                                <button><FavoriteBorderIcon style={{ fill: '#1E1E1E', fontSize: 14 }} /> Add to wishlist instead?</button>
                            </div>
                        </div>
                    </div>
                    <div className='cartproducts-list-card'>
                        <p className='cartproducts-list-card-index'>4</p>
                        <img className='cartproducts-list-card-image' src="https://static.zara.net/assets/public/b8c8/c6c3/852e4376a3ae/b494d49fadb4/00673604250-e1/00673604250-e1.jpg?ts=1711036840288&w=850" alt="cute dress" />

                        <div className="cartproducts-list-card-info">
                            <p className='cartproducts-list-card-info-productName'>TECHNICAL FABRIC PLEATED TEXT DRESS</p>
                            <p className='cartproducts-list-card-info-description'>consectetur adipisicing elit. Blanditiis debitis eos exercitationem quod culpa.</p>
                            <div className="cartproducts-list-card-info-colorsize">
                                <div className="cartproducts-list-card-info-color">
                                    <p>Color:</p>
                                    <div style={{"color": "blue"}}></div>
                                </div>
                                <div className="cartproducts-list-card-info-size">
                                    <p>Size:</p>
                                    <p>XS</p>
                                </div>
                            </div>
                            <div className="cartproducts-info-quantity">
                                <p>Quantity</p>
                                <div className="qty">
                                    <RemoveIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                    <p>2</p>
                                    <AddIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} />
                                </div>
                            </div>
                            <div className="cartproducts-list-card-info-price">
                                <p>$20.00</p>
                            </div>
                            <div className='add-to-wishlist'>
                                <button><FavoriteBorderIcon style={{ fill: '#1E1E1E', fontSize: 14 }} /> Add to wishlist instead?</button>
                            </div>
                        </div>
                    </div>
                       {/* -------------  */}
                    </div> {/* END CARD container div DO NOT DELETE  */}
                    
            </div>

            {/* TODO: get total cart amount  */}

            <div className="cardVertical"></div>
            <div className="cartProducts-side">
                <div className="cartProducts-total">
                    <h1>ORDER SUMMARY</h1>
                    <div>
                        <div className="cartProducts-total-item">
                            <p>Subtotal:</p>
                            <div className="line-div"></div>
                            <p>$123.00</p>
                        </div>
                        <div className="cartProducts-total-item">
                            <p>Shipping:</p>
                            <div className="line-div"></div>
                            <p>$5.00</p>
                        </div>
                        <div className="cartProducts-total-item">
                            <p>Discount:</p>
                            <div className="line-div"></div>
                            <p>$5.00</p>
                        </div>
                        <div className="cartProducts-total-item mainCartProducts-total-item">
                            <p>TOTAL:</p>
                            <div className="line-div"></div>
                            <p>$128.00</p>
                        </div>
                    </div>
                    <div className="cartProducts-total-item">
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartProducts;
