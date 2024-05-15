import React, { useEffect, useState, useCallback } from 'react';
import './CartProducts.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, clearCart, removeProduct } from '../../redux/cartRedux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_51PF6Q9RqtddZ7Hs3UaCbOYqwAXgiQK7Nf7ywYMJdzYiolPw1XK9g6vMuoXY2LE9QpZIXhSFStN7zgxQp7I1CwXeA00xS8s27uX'
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2E5ZTRhNzAxOTVhMjI1Y2I4YmY1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTU2MDkzMSwiZXhwIjoxNzE1ODIwMTMxfQ.SATVnT9wxN2fYubIyetQ-MBo_GNFzyJDUtS6OYVPw64";
console.log(KEY, " KEY");

const CartProducts = () => {


    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const totalQuantity = cart.products.reduce((total, product) => total + product.quantity, 0);

    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate();

    const makePayment = useCallback(
        async (token) => {
            try {
                const res = await axios.post(
                'http://localhost:8000/payment',
                {
                    tokenId: token.id,
                    amount: cart.total * 100,
                },
                {
                    headers: {
                    token: `Bearer ${TOKEN}`,
                    },
                }
                );
                console.log(res.data);
                navigate('/', { data: res.data });
            } catch (error) {
                console.error(error);
            }
        },
        [navigate, cart.total]
    );


    const onToken = useCallback(
        (token) => {
            setStripeToken(token);
            makePayment(token);
        },
        [makePayment]
    );

    useEffect(() => {
    if (stripeToken && cart.total >= 1) {
        makePayment(stripeToken);
    }
    }, [stripeToken, cart.total, makePayment]);
    

    useEffect(() => {
        const makePayment = async () => {
            try {
                const res = await axios.post('http://localhost:8000/checkout/payment',
                    {
                        tokenId: stripeToken.id,
                        amount: cart.total * 100
                    },
                    {
                        headers: {
                            token: `Bearer ${TOKEN}`
                        }
                    }
                );
                console.log(res.data); 
                dispatch(clearCart());
                navigate('/success', {data: res.data});
            } catch (error) {
                console.error(error); 
            }
        };
    
        if (stripeToken && cart.total >= 1) {
            makePayment();
        }
    }, [stripeToken, cart.total, navigate, dispatch]);

    console.log(stripeToken, " stripeToken")

    // DO NOT DELETE ⚠️ for the items 👇
    let i = 0

    return (
        <div className='cartproducts'>
            <div className='cartproducts-list'>
                <h1>YOUR SHOPPING BAG</h1>
                <p className='cartproducts-itemcount'>
                    <span> {totalQuantity} </span> item(s)
                </p>

                <div className="cartproducts-card">  {/* START CART CONTAINER */}

                    { cart.products.map(product => (
                    <div className='cartproducts-list-card'>
                        
                        <p className='cartproducts-list-card-index'>{i += 1}</p>
                        <img className='cartproducts-list-card-image' src={product.productImages[0]} alt="cute dress" />

                        <div className="cartproducts-list-card-info">
                            <p className='cartproducts-list-card-info-productName'>{product.productName}</p>
                            <p className='cartproducts-list-card-info-description'>{product.productDescription}</p>
                            <div className="cartproducts-list-card-info-colorsize">
                                <div className="cartproducts-list-card-info-color">
                                    <p>Color:</p>
                                    <div style={{backgroundColor: product.color, width: 15, height: 15, border: '1px solid lightgrey', borderRadius: '50px' }}></div>
                                </div>
                                <div className="cartproducts-list-card-info-size">
                                    <p>Size:</p>
                                    <p>{product.size}</p>
                                </div>
                            </div>
                            <div className="cartproducts-info-quantity">
                                <p>Quantity</p>
                                <div className="qty">
                                    {console.log(product._id, " product.Id")}
                                    <RemoveIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} 
                                    onClick={() => dispatch(decreaseQuantity(product._id))} />
                                    <p>{product.quantity}</p>
                                    <AddIcon style={{ fill: '#1E1E1E', fontSize: 18, cursor: 'pointer' }} onClick={() => dispatch(increaseQuantity(product._id))} />
                                </div>
                            </div>
                            <div className="cartproducts-list-card-info-price">
                                <p>${product.price * product.quantity}</p>
                            </div>
                            <div className='add-to-wishlist'>
                                <button><FavoriteBorderIcon style={{ fill: '#1E1E1E', fontSize: 14 }} /> Add to wishlist instead?</button>
                            </div>
                        </div>
                        <button className='removeProduct-btn' onClick={() => dispatch(removeProduct(product._id))}>x</button>
                    </div>
                    ))
                    }

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
                            <p>${cart.total}</p>
                        </div>
                        <div className="cartProducts-total-item">
                            <p>Shipping:</p>
                            <div className="line-div"></div>
                            <p>$0.00</p>
                        </div>
                        <div className="cartProducts-total-item">
                            <p>Discount:</p>
                            <div className="line-div"></div>
                            <p>$0.00</p>
                        </div>
                        <div className="cartProducts-total-item mainCartProducts-total-item">
                            <p>TOTAL:</p>
                            <div className="line-div"></div>
                            <p>${cart.total}</p>
                        </div>
                    </div>
                    <div className="cartProducts-total-item">
                        
                        <StripeCheckout
                            name="CHIQUITA" // the pop-in header title
                            description={`Your total is ${cart.total}.00`} // the pop-in header subtitle
                            image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" 
                            amount={cart.total * 100} // cents
                            currency="USD"
                            stripeKey={KEY}
                            shippingAddress
                            billingAddress={false}
                            zipCode={false}
                            alipay
                            allowRememberMe 
                            token={onToken}
                            >
                                <button>PROCEED TO CHECKOUT</button>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartProducts;
