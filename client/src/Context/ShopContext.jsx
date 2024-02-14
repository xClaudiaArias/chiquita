import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
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

    const contextValue = {
        products: products,
        categories: categories,
        mainCategories: mainCategories
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider