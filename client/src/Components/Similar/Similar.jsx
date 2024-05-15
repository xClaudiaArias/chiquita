import React, { useEffect, useState } from 'react'
import './Similar.css'
import SimilarProducts from '../SimilarProducts/SimilarProducts'
import axios from 'axios'

const Similar = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('http://localhost:8000/products')
            setProducts(res.data)
        }
        getProducts()
    }, [])

    return (
        <div className='similar-categories'>
            <h1 className='similar-h1'>You may also like</h1>
            <div className='similar'>
                {
                    products.slice(0,4).map(item => (
                        <SimilarProducts item={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Similar