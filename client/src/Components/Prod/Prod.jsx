import React, { useState, useEffect } from 'react';
import './Prod.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import { addToWishlist } from '../../redux/wishlistRedux'; 
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material';

const Prod = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showWishlistConfirmation, setShowWishlistConfirmation] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/products/find/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity, color, size }));
        setShowConfirmation(true);
    };

    console.log(product)

    const handleAddToWishlist = () => {
        // checking if product is not null before dispatching the action to avoid err 
        if (product !== null) {
            setIsFavorited(!isFavorited);
            dispatch(addToWishlist({ ...product }));
            setShowWishlistConfirmation(true);
        }
    };
    

    const goToCart = () => {
        setShowConfirmation(false);
        navigate('/cart');
    };

    const goToWishlist = () => {
        navigate('/wishlist');
    };

    return (
        <div className='prodDisplay'>
            {/* img  */}
            <div className="prodDisplay-left">
                <ul className='main-slider'>
                    {/* slide images */}
                    <li className="slider">
                        <ul>
                            {product.productImages && product.productImages.map((img, i) => (
                                <li key={i}><img src={img} onClick={() => { setMainImage(img) }} alt="" /></li>
                            ))}
                        </ul>
                    </li>
                    <li><img className='main-image' src={mainImage === "" ? (product?.productImages?.[0] || "") : mainImage} alt="" /></li>
                </ul>
            </div>

            {/* decription */}
            <div className="prodDisplay-right">
                <h1>{product.productName}</h1>

                {/* Wishlist Confirmation message */}
                {showWishlistConfirmation && (
                    <div className="wishlist-confirmation-message show">
                        <div><p>Product was added to wishlist</p> <button className="dismiss-button" onClick={() => setShowWishlistConfirmation(false)}>X</button></div>
                        
                        <button className="redirect-button" onClick={goToWishlist}>Go to Wishlist</button>
                    </div>
                )}

                <p className="product-description">{product.productDescription}</p>
                <div className="prodDisplay-colors-reviews">
                    <ul className="prodDisplay-product-colors">
                        <li>Colors:</li>
                        {
                            product.color?.map((c, i) => (
                                <li key={i}>
                                    <div
                                        className={`color ${color === c ? 'selected' : ''}`}
                                        style={{ backgroundColor: c }}
                                        onClick={() => setColor(c)}
                                    ></div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="prodDisplay-product-sizes">
                    <p>Sizes:</p>
                    <select onChange={(e) => setSize(e.target.value)}>
                        {
                            product.size?.map((s, i) => (
                                <option key={i}>{s}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="prodDisplay-info-quantity">
                    <p>Quantity:</p>
                    <div className="prodDisplay-qty">
                        <button onClick={() => handleQuantity('dec')}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => handleQuantity('inc')}>+</button>
                    </div>
                </div>
                <div className="prodDisplay-footer">
                    <div className="prodDisplay-product-price">
                        <p>Price:</p>
                        <p className='prodDisplay-price'>${product.price * quantity}.00</p>
                    </div>
                    <button className='prodDisplay-add-to-cart' onClick={handleClick}>ADD TO CART</button>
                </div>
                <div className='prodDisplay-add-to-wishlist' onClick={handleAddToWishlist}>
                        {isFavorited ? <Favorite /> : <FavoriteBorderOutlined />} ADD TO WISHLIST
                </div>
                <p className='productdisplay-right-category'><span>Category:</span> category, productName</p>
                {
                    showConfirmation && (
                        <div className="confirmation-modal-container">
                            <div className="confirmation-modal">
                                <p className='confirm-text'>Product added to cart!</p>
                                <img src={product.productImages[0]} alt={product.productName} />
                                <p className='confirm-productName'>{product.productName}</p>
                                <div className="confirm-color-size">
                                    <p>Color: <span>{color}</span></p>
                                    <p>Size: <span>{size}</span></p>
                                </div>
                                <div className="confirm-btns">
                                    <button className="confirmation-modal-button" onClick={() => setShowConfirmation(false)}>Continue Shopping</button>
                                    <button className="confirmation-modal-button" onClick={goToCart}>Go to Cart</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Prod;
