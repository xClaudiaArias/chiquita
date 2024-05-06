import React, {useContext, useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Navbar = () => {

    const [menu, setMenu] = useState("home")
    const [empty, setEmpty] = useState(0)

    const {count} = useContext(ShopContext)

    return (
        <>

            <div className='navbar'>
                <ul className='navMenu'>
                    <li> <Link className={menu === "wishlist" ? '' : ''} onClick={() => setMenu("wishlist")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/wishlist"> <FavoriteBorderIcon/>  Wishlist </Link></li>

                    <li>
                    {localStorage.getItem('auth-token') ? <Link style={{textDecoration: 'none', textTransform: 'uppercase'}} onClick={() => {localStorage.removeItem('auth-token'); window.location.replace("/")}}> <PersonOutlineIcon/> Logout </Link> : <Link className={menu === "account" ? '' : ''} onClick={() => setMenu("account")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/auth"> <PersonOutlineIcon/> Login</Link>}
                    </li>


                    <li className='nav-logo'> 
                        <Link className={menu === "home" ? '' : ''} onClick={() => setMenu("home")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/">
                            <p>Chiquita</p>
                        </Link>
                    </li>


                    <li className="search-container"><SearchIcon/> <input type="text"  /></li>

                    {/* CART */}
                    <li>
                        <div className="nav-cart">
                            <Link className={menu === "cart" ? '' : ''} onClick={() => setMenu("cart")} style={{textDecoration: 'none', textTransform: 'uppercase'}} to="/cart"> <ShoppingBagOutlinedIcon/> Cart</Link>
                            <div className={count <= 0 ? 'empty' : 'nav-cart-count'} onLoad={() => setEmpty("empty")}>{count}</div>
                        </div>
                    </li>
                    {/* CART end  */}
                </ul>
            </div>


            <div className='categories-nav'>
                <ul className='categories-nav-menu'>
                    <li> <Link className={menu === "babies" ? 'categories-nav-item' : ''} onClick={() => setMenu("babies")} style={{textDecoration: 'none'}} to="/babies">Babies</Link></li>



                    <li> <Link  className={menu === "toddlers" ? 'categories-nav-item' : ''} onClick={() => setMenu("toddlers")} style={{textDecoration: 'none'}} to="/toddlers">Toddlers</Link></li>
                    <li> <Link className={menu === "kids" ? 'categories-nav-item' : ''} onClick={() => setMenu("kids")} style={{textDecoration: 'none'}} to="/kids">Kids</Link></li>
                    <li> <Link className={menu === "accessories" ? 'categories-nav-item' : ''} onClick={() => setMenu("accessories")} style={{textDecoration: 'none'}} to="/accessories">Accessories</Link></li>
                </ul>
            </div>
        </>
        
    )
}

export default Navbar