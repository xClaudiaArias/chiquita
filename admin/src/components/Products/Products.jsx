import React from 'react'
import './Products.css'
import ProductHighlight from '../ProductHighlight/ProductHighlight'
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <div className='chiquitaproducts'>
            <div className="chiquitaproducts-header">
                <h1>Products</h1>
                <Link to="/addproduct">Add new product</Link>
            </div>
            <div className="chiquitaproducts-menu">
                <button>All Products</button>
                <button>Babies</button>
                <button>Toddlers</button>
                <button>Kids</button>
                <button>Accessories</button>
            </div>
            <div className="chiquitaproducts-products">
                <div className="chiquitaproducts-products-card">
                    <img src="https://picsum.photos/200" alt="" />
                    <p>Products title</p>
                    <div className="products-stat">
                        <div className="chiquitaproducts-price">$20.00</div>
                        <div className="chiquitaproducts-stock">
                            <p>Stock:</p>
                            <p product-stock>8</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chiquitaproducts-product-highlight">
                <ProductHighlight />
            </div>
        </div>
    )
}

export default Products