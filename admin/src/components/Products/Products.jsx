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
                <button>All Products</button>
                <button>Babies</button>
                <button>Toddlers</button>
                <button>Kids</button>
                <button>Accessories</button>
            </div>
            <div className="chiquitaproducts-products">
            {console.log(allProducts, " --> all products")}
                { allProducts.map((product, i) => {
                    return <div key={i} className="chiquitaproducts-products-card">
                            <img src={product.productImages[0]} alt="product-image" />
                            <p>{product.productName}</p>
                            <div className="products-stat">
                                <div className="chiquitaproducts-price">${product.price}</div>
                                <div className="chiquitaproducts-stock">
                                    <p>Stock:</p>
                                    <p className="product-stock">{product.units_in_stock}</p>
                                </div>
                            </div>
                            <button onClick={() => {removeProduct(product._id)}}>remove</button>
                        </div>
                    })
                }
            </div>
            <div className="chiquitaproducts-product-highlight">
                <ProductHighlight />
            </div>
        </div>
    )
}



export default Products