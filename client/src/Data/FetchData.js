import React, { useEffect, useState } from "react";
import axios from "axios";


const FetchData = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8000/product');
                const res2 = await axios.get('http://localhost:8000/category');
                const res3 = await axios.get('http://localhost:8000/main-category')
                setProducts(res.data)
                setCategories(res2.data)
                setMainCategories(res3.data)
            } catch (err) {
                console.log("Failed to get data: ", err.message)
            }
        }
        fetchData();
    }, [])

    const shopData = {products, categories, mainCategories}
    
    return shopData
}

export default FetchData

// import axios from "axios";

// const FetchData = async () => {
//     const products = []

//         try {
//             const res = await axios.get('http://localhost:8000/product');
//             products.push(res.data)
//         } catch (err) {
//             console.log(err)
//         }

//     return products
// }

// export default FetchData

