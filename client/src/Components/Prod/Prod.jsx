// fetches products

import React, { useState, useEffect } from 'react'
import Item from '../Item/Item'
import axios from 'axios'

const Prod = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8000/product');
                setProducts(res.data)
                console.log(res.data)
            } catch (err) {
                console.log("Failed to get data: ", err.message)
            }
        }
        fetchData();
    }, [])


    return (
        <div>
            {
                products.map((item, i) => {
                    return <Item key={i} id={item._id} productName={item.productName} productImages={item.productImages} size={item.size} color={item.color} price={item.price} />
                })
            }
        </div>
    )
}

export default Prod