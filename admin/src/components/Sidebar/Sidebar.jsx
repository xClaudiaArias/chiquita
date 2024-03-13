import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <p className='sidebar-main'>Main</p>
            {/* products  */}
            <Link to={'/chiquitaproducts'}>
                <div className="sidebar-link">
                    <img src="https://picsum.photos/200/200" alt="" />
                    <p>Products</p>
                </div>
            </Link>
            {/* customer  */}
            <Link to={'/chiquitacustomers'}>
                <div className="sidebar-link">
                    <img src="https://picsum.photos/200/200" alt="" />
                    <p>Customer</p>
                </div>
            </Link>
            {/* orders */}
            <Link to={'/chiquitaorders'}>
                <div className="sidebar-link">
                    <img src="https://picsum.photos/200/200" alt="" />
                    <p>Orders</p>
                </div>
            </Link>
            {/* settings */}
            <Link to={'/chiquitasettings'}>
                <div className="sidebar-link">
                    <img src="https://picsum.photos/200/200" alt="" />
                    <p>Settings</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar