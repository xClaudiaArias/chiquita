import React, { useState, useEffect } from 'react'
import Item from '../Item/Item'
import axios from 'axios'

const Babies = () => {
    const [babies, setBabies] = useState([]);

    // TODO: create an objeect here for the response data 
    // TODO: FETCH BY MAIN CATEGORY 
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8000/product');
                setBabies(res.data)
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
                babies.map((item, i) => {
                    return <Item key={i} id={item._id} mainCategory={item.mainCategory} category={item.category} productName={item.productName} productImages={item.productImages} size={item.size} color={item.color} price={item.price} />
                })
            }
        </div>
    )
}

export default Babies