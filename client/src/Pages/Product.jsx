// single product parent 

import React, { useEffect, useState } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums.jsx'
import Prod from '../Components/Prod/Prod.jsx'
import Similar from '../Components/Similar/Similar.jsx'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Product = () => {
    const location = useLocation(); // gives us pathname
    const id = location.pathname.split("/")[2] //get category from params
    const [mainCategory, setMainCategory] = useState(null)
    const [category, setCategory] = useState(null)
    const [productName, setProductName] = useState(null)

    // console.log(cat, " --cat")

    useEffect(() => {
        const getProductInfo = async () => {
            const res = await axios.get(`http://localhost:8000/products/find/${id}`)
            console.log(res.data, " resData gurl")
            setMainCategory(res.data.categories[0])
            setCategory(res.data.categories[1])
            setProductName(res.data.productName)
        }

        getProductInfo()
    }, [id])

    return (
        <div className="products">
            <Breadcrums productName={productName} mainCategory={mainCategory} category={category}/>
            <Prod />
            <Similar />
        </div>
    )
}

export default Product

