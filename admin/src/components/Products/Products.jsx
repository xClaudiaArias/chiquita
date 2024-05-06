import React, { useState, useEffect } from 'react'
import './Products.css'
import ProductHighlight from '../ProductHighlight/ProductHighlight'
import { Link } from 'react-router-dom'

const Products = () => {
    const [allProducts, setAllProducts] = useState([])

    const fetchData = async() => {
        await fetch('http://localhost:8000/product')
        .then((response) => response.json())
        .then((data) => {setAllProducts(data)})
        console.log(allProducts, ' --> allProducts')
    }

    useEffect(() => {
        fetchData()
    }, [])

    // TODO: REMOVE PRODUCTS 

    const removeProduct = async(_id) => {
        await fetch('http://localhost:8000/product', {
            method: 'DELETE',
            headers: {
                Accept: 'appplication/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: _id})
        })
        await fetchData()
    }


    return (
        <div className='chiquitaproducts'>
            <div className="chiquitaproducts-header">
                <h1>Products</h1>
                <Link to="/addproduct">Add new product</Link>
            </div>
            <div className="chiquitaproducts-menu">
                <Link to="/"><p>All Products</p></Link>
                <p className='chiquitaproducts-menu-divider'>|</p>
                <Link to="/"><p>Babies</p></Link>
                <p className='chiquitaproducts-menu-divider'>|</p>
                <Link to="/"><p>Toddlers</p></Link>
                <p className='chiquitaproducts-menu-divider'>|</p>
                <Link to="/"><p>Kids</p></Link>
                <p className='chiquitaproducts-menu-divider'>|</p>
                <Link to="/"><p>Accessories</p></Link>
            </div>
            <div className="chiquitaproducts-products">
            {console.log(allProducts, " --> all products")}
                { allProducts.map((product, i) => {
                    return <div key={i} className="chiquitaproducts-products-card">
                            <img src={product.productImages[0]} alt="product-image" />
                            <p className='products-productName'>{product.productName}</p>
                            <div className="products-stat">
                                <div className="chiquitaproducts-price">${product.price}</div>
                                <div className="chiquitaproducts-stock">
                                    <p>Stock:</p>
                                    <p className="product-stock">{product.units_in_stock}</p>
                                </div>
                            </div>
                            {/* TODO: make an edit page  */}
                            <div className="chiquitaproducts-btns">
                                <button onClick={() => {removeProduct(product._id)}}>edit</button>
                                <button onClick={() => {removeProduct(product._id)}}>remove</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}



export default Products