import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Products from '../../components/Products/Products'
import Customers from '../../components/Customers/Customers'
import Orders from '../../components/Orders/Orders'
import Settings from '../../components/Settings/Settings'
import AddProduct from '../../components/AddProduct/AddProduct'

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/chiquitaproducts' element={<Products />} />
                <Route path='/chiquitacustomers' element={<Customers />} />
                <Route path='/chiquitaorders' element={<Orders />} />
                <Route path='/chiquitasettings' element={<Settings />} />
                <Route path='/addproduct' element={<AddProduct />} />
            </Routes>
        </div>
    )
}

export default Admin