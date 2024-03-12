import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="logo-img"></div>
                <p className="logo">Chiquita</p>
                <p>Admin Panel</p>
            </div>
            <div className="navbar-right">
                <div className="admin-info">
                    <img src="https://picsum.photos/200/200" alt="" />
                    <p>@Admin123</p>
                </div>
                <div className="logout">
                    <button className="logout-btn">
                        LOGOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar