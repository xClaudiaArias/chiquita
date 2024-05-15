import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistRedux';

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.products);
    const dispatch = useDispatch();
    

    return (
        <div className='wishlist'>
            <h1>WISHLIST</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-items">
                    {wishlist.map(product => (
                        <div className="wishlist-item" key={product._id}>
                            {product.productImages && product.productImages.length > 0 && (
                            <img src={product.productImages[0]} alt="" />
                            )}
                            <div className="wishlist-item-details">
                                <p>{product.productName}</p>
                                <p>${product.price}</p>
                                <button onClick={() => dispatch(removeFromWishlist(product._id))}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
