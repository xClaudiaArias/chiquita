import React, { useEffect, useState } from 'react';
import axios from "axios";


const FetchData = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8000/product');
                setProducts(res.data)
            } catch (err) {
                console.log("Failed to get data: ", err.message)
            }
        }
        fetchData();
    }, [])

    const shopData = {products}
    
    return shopData
}

export default FetchData


