import React, { useEffect, useState } from 'react'
import './NewestProducts.css'
import NewestProductsItems from '../NewestProductsItems/NewestProductsItems'
import axios from 'axios'

const NewestProducts = () => {
    const [newestProducts, setNewestProducts] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProduct = async() => {
            try {
                const res = await axios.get(`http://localhost:8000/products`)
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, []) // fetches whenever product id changes

    useEffect(() => {
        // Sort the products based on their createdAt timestamps to get the newest ones
        const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Take the first 8 newest products
        const newest = sortedProducts.slice(0, 8);
        setNewestProducts(newest);
    }, [products]);


    return (
        <div className='newestproducts'>
            <h1>New Products</h1>
            <div className="newestproducts-container">
                {
                    newestProducts.slice(0,8).map(item => (
                        <NewestProductsItems item={item} key={item._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default NewestProducts