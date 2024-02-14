import React, {useState} from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = () => {

    const [menu, setMenu] = useState("home")
    const [empty, setEmpty] = useState("0")

    return (
        <>

            <div className='navbar'>
                <ul className='navMenu'>
                    <li> <Link className={menu === "wishlist" ? '' : ''} onClick={() => setMenu("wishlist")} style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/wishlist">Wishlist</Link></li>
                    <li> <Link className={menu === "account" ? '' : ''} onClick={() => setMenu("account")} style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/account">Account</Link></li>

                    <li className='nav-logo'> 
                        <Link className={menu === "home" ? '' : ''} onClick={() => setMenu("home")} style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/">
                            <div>-IMG-</div>
                            <p>Chiquita</p>
                        </Link>
                    </li>


                    <li> <Link className={menu === "search" ? '' : ''} onClick={() => setMenu("search")} style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/search">Search</Link></li>
                    <li>
                        <div className="nav-cart">
                            <Link className={menu === "cart" ? '' : ''} onClick={() => setMenu("cart")} style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/cart">Cart</Link>
                            <div className={empty === "0" ? 'empty' : 'nav-cart-count'} onLoad={() => setEmpty("0")}></div>
                        </div>
                    </li>
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