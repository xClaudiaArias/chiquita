// view single product page 

import React from "react"

const Product = () => {
    return (
        <>
            <div className="product-card">

                <div className="product-slideshow">
                    <img src="" alt="img 1"/>
                    <img src="" alt="img 2"/>
                    <img src="" alt="img 3"/>
                </div>

                <div className="mainProductImage">
                    <img src="" alt="main img " />
                </div>

                <div className="product-info">
                    <h1>Product Title</h1>
                    <div className="color-rating">
                        <ul>
                            <li>color 1</li>
                            <li>color 1</li>
                        </ul>
                        <div id="prod-rating">****</div>
                    </div>
                    <div className="product-sizes">
                        <ul>
                            <li>XS</li>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                        </ul>
                    </div>

                    <p>product description here.... hello</p>



                    <div className="quantity">
                        <label for="qty">Quantity:</label>
                        <div className="qty">
                            <button>-</button>
                            <p>0</p>
                            <button>+</button>
                        </div>
                    </div>

                    <p>$ 0.00</p>

                    <button>Add to cart</button>


                </div>
            </div>

        </>
    )
}

export default Product