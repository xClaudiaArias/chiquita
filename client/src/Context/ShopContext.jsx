import React, { createContext, useState, useEffect } from "react";
import axios from "axios"
// import FetchData from "../Data/FetchData";

export const ShopContext = createContext(null);

// get empty cart 
const getDefaultCart = () => {
    let cart = {};
    // let fetchData = FetchData().products

    // for (let i = 1; i < fetchData.length + 1; i++){
    //     cart[i] = 0
    // }

    for (let i = 1; i < 1000 + 1; i++){
        cart[i] = 0
    }

    return cart;
}

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [cartProducts, setCartProducts] =  useState(getDefaultCart()); 

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



    // add product to cart fn
    // add to cart function
    const addToCart = (itemId) => {
        setCartProducts((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
        // setCartProducts(prev => {
        //     console.log(cartProducts, " ----first cartproducts")
        //     console.log({...prev}, prev[itemId], " prev")
        //     return ({...prev, [itemId] : prev[itemId] + 1})
        // })
        console.log(cartProducts)
    }

    const contextValue = {
        products,
        categories,
        mainCategories,
        cartProducts,
        addToCart
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider