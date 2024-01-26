import React, { useState, useEffect } from 'react'
import Item from '../Item/Item'
import axios from 'axios'

const Prod = () => {
    const [products, setProducts] = useState([]);

    // TODO: create an objeect here for the response data 

    // let product = axios.get('http://localhost:8000/product')
    //     .then((response) => {

    //         // TODO: add responses to an object 
    //         console.log(response.data[0]._id)
    //         console.log(response.data, " ::response")
    //         res.push(response.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // // console.log(response.json, 'response')

    // // let res = product.response.data
    // console.log(res[0]._id, " --> res")

    // // res.map((item, i) => {
    // //     console.log(item, i, " --> item, i")
    // // })

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