import React, { useState} from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { clearWishlist } from '../../redux/wishlistRedux'

const Navbar = () => {
    const [menu, setMenu] = useState("home")
    const cart = useSelector(state => state.cart);
    const totalQuantity = cart.products.reduce((total, product) => total + product.quantity, 0);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleClear = () => {
        dispatch(clearWishlist())
    }




    console.log(isAuthenticated, " isAuthenticated?")
    return (
        <>

            <div className='navbar'>
                <ul className='navMenu'>
                    <li> <Link className={menu === "wishlist" ? '' : ''} onClick={() => setMenu("wishlist")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/wishlist"> <FavoriteBorderIcon/>  Wishlist </Link></li>

                    <li>
                        {
                        isAuthenticated ? (
                            <Link to="/" onClick={handleLogout} style={{textDecoration: 'none', textTransform: 'uppercase'}}> <PersonOutlineIcon/> Logout</Link>
                        ) : (
                            <Link to="/login" style={{textDecoration: 'none', textTransform: 'uppercase'}}> <PersonOutlineIcon/> Login </Link>
                        )}
                        
                    </li>

                    {/* <Link style={{color: 'transparent'}} to="/" onClick={handleClear}>Clear</Link> */}


                    <li className='nav-logo'> 
                        <Link className={menu === "home" ? '' : ''} onClick={() => setMenu("home")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/">
                            <p>Chiquita</p>
                        </Link>
                    </li>


                    <li className="search-container">
                        <SearchIcon />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search products..." 
                        />
                    </li>

                    {/* CART */}
                    <li>
                        <Badge badgeContent={totalQuantity} color="secondary">
                            <div className="nav-cart">
                                <Link className={menu === "cart" ? '' : ''} onClick={() => setMenu("cart")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/cart"> <ShoppingBagOutlinedIcon/> Cart</Link>
                            </div>
                        </Badge>
                    </li>
                    {/* CART end  */}
                </ul>
            </div>


            <div className='categories-nav'>
                <ul className='categories-nav-menu'>
                    <li> <Link className={menu === "babies" ? 'categories-nav-item' : ''} onClick={() => setMenu("babies")} style={{textDecoration: 'none'}} to="products/babies">Babies</Link></li>



                    <li> <Link  className={menu === "toddlers" ? 'categories-nav-item' : ''} onClick={() => setMenu("toddlers")} style={{textDecoration: 'none'}} to="products/toddlers">Toddlers</Link></li>
                    <li> <Link className={menu === "kids" ? 'categories-nav-item' : ''} onClick={() => setMenu("kids")} style={{textDecoration: 'none'}} to="products/kids">Kids</Link></li>
                    <li> <Link className={menu === "accessories" ? 'categories-nav-item' : ''} onClick={() => setMenu("accessories")} style={{textDecoration: 'none'}} to="products/accessories">Accessories</Link></li>
                </ul>
            </div>
        </>
        
    )
}

export default Navbar