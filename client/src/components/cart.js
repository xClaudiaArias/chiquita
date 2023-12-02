import React from "react"

const Cart = () => {
    return (
        <div className="cart-container">
            <div id="cart-container__ITEMS">
                <h1>CART</h1>
                <p className="items-sent"> <span className="items-count">6</span> Items</p>

                <div className="cart-items">
                    <div className="cart-item">
                        <div className="cart-item__number">1</div>
                        <div className="cart-item-img">
                            <img src="" alt="..."></img>
                        </div>
                        <div className="cart-item__info">
                            <div className="cart-item__title-close">
                                <p className="cart-item-title">Item Title</p>
                                <button className="cart-item-close">x</button>
                            </div>
                            <div cart-item__description>
                                <p>Let your imagination be your guide. Let all these things just sort of happen. You create the dream - then you bring it into your world.</p>
                            </div>
                            <div className="cart-item__color-size">
                                <div className="cart-item-colors">
                                    <div>color1</div><div>color2</div><div>color3</div>
                                </div>
                                <div className="cart-item-sizes">
                                    <div>xs</div><div>s</div><div>m</div><div>l</div><div>xl</div>
                                </div>
                            </div>
                            <div className="cart-item-amount">
                                <p>Amount:</p>
                                <button>-</button>
                                <p>0</p>
                                <button>+</button>
                            </div>
                            <div className="cart-item-price">
                                <p>$15.99</p>
                            </div>
                            <div className="cart-item-wishlist">
                                <p>🩵</p>
                                <a href="/">Add item to wishlist instead?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ---------- */}

            <div className="cart__price-shipping">
                <div className="cart-price">
                    <p>Total <span>Before shipping</span></p>
                    <p>$15.00</p>
                </div>
                <div className="cart-shipping-info">
                    <p>Shipping Information</p>
                    <div className="cart-shipping">
                        <p>Shipping cost</p>
                        <div>-------------</div>
                        <p>$5.00</p>
                    </div>
                    <div className="cart-total">
                    <p>TOTAL</p>
                        <div>-------------</div>
                        <p>$20.00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart