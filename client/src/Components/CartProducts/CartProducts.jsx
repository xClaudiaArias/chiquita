import React, { useContext } from 'react'
import './CartProducts.css'
import { ShopContext } from '../../Context/ShopContext'

const CartProducts = () => {
    const { products } = useContext(ShopContext)

    return (
        <div className='cartproducts'>
            <h1>CART</h1>
            <p><span>0</span> Items</p>

            <div className='cartproducts-list'>
                {/* {
                    products.map((e) => {
                        
                    })
                } */}
                <div className='cartproducts-list-card'>
                    <p>1</p>
                    <img src="https://picsum.photos/200" alt="" />
                    <div className="cartproducts-list-card-info">
                        <p>Title</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure modi vero dolor sunt doloremque nobis odio vel aut, vitae quod assumenda, perferendis atque numquam blanditiis ad neque consequuntur. Earum, repellat.</p>
                        <div className="cartproducts-list-card-info-colorsize">
                            <div className="cartproducts-list-card-info-color">
                                <p>Color:</p>
                                <div></div>
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
            </div>
        </div>
    )
}

export default CartProducts