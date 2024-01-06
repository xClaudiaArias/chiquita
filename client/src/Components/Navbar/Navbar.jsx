import React, {useState} from 'react'
import './Navbar.css'
//TODO: import logo 
//TODO: import cart icon 
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className='navbar'>
            <ul className='navMenu'>
                <li> <Link style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/wishlist">Wishlist</Link></li>
                <li> <Link style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/account">Account</Link></li>

                <li className='nav-logo'> 
                    <Link style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/">
                        <div>-IMG-</div>
                        <p>Chiquita</p>
                    </Link>
                </li>


                <li> <Link style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/search">Search</Link></li>
                <li>
                    <div className="nav-cart">
                        <Link style={{textDecoration: 'none', textTransform: 'uppercase', color: 'white'}} to="/cart">Cart</Link>
                        <div className="nav-cart-count">0</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar