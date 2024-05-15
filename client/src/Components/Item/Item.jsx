// This is the individual product card that goes in shop category 

import React, { useEffect, useState } from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Item = ({cat, sort, filters}) => {
    console.log(cat, " cat")
    console.log(filters, " filters")
    // define products with UseState 
    const [ products, setProducts ] = useState([])
    const [ filteredProducts, setFilteredProducts ] = useState([]) // this will change with our filters

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `http://localhost:8000/products?category=${cat}` : "http://localhost:8000/products")

                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getProducts()
    }, [cat])


    // get filtered products 
    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item => 
                Object.entries(filters).every(([key, value]) => item[key].includes(value))
            )
        )
    }, [products, cat, filters])

    console.log(filteredProducts)

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.price - b.price)
            )
        } else {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);


    return (
        <>
        { cat 
            ? filteredProducts.map((item) => (
            <div className="item" key={item.id}>
                <ul className="product-images">
                    {/* NOTE: change this back to id  */}
                    <li><Link to={`/products/${item._id}`}><img src={item.productImages} alt={item.productName}/></Link></li>
                </ul>
                <ul className="product-colors">
                    <li><div style={{color: "blue"}}></div></li>
                </ul>
                <p className="product-name">{item.productName}</p>
                <div className="product-price">
                    <p>${item.price}</p>
                </div>
            </div>
        ))
        : 
        products.map((item) => (
            <div className="item" key={item.id}>
                <ul className="product-images">
                    {/* NOTE: change this back to id  */}
                    <li><Link to={`/products/${item._id}`}><img src={item.productImages} alt={item.productName}/></Link></li>
                </ul>
                <ul className="product-colors">
                    <li><div style={{color: "blue"}}></div></li>
                </ul>
                <p className="product-name">{item.productName}</p>
                <div className="product-price">
                    <p>${item.price}</p>
                </div>
            </div>
        ))
    }
    </>

    )
}

export default Item

