import React, { createContext, useState, useEffect } from "react";
import axios from "axios"
// import FetchData from "../Data/FetchData";

export const ShopContext = createContext(null);

// get empty cart 
const getDefaultCart = () => {
    let cart = {};

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
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function fetchData() {
            try {
            axios.all([
                axios.get('http://localhost:8000/product'),
                axios.get('http://localhost:8000/category'),
                axios.get('http://localhost:8000/main-category'),
                axios.get('http://localhost:8000/cart')
            ]).then(axios.spread((d1,d2,d3, d4) => {
                console.log(d4, " -->d4")
                setProducts(d1.data)
                setCategories(d2.data)
                setMainCategories(d3.data)
            }))
            } catch(error) {
                console.log("Failed to get data: ", error.message)
            }
        }
    fetchData()
    }, [])

    // add product to cart fn
    // add to cart function
    const addToCart = (productId) => {
        setCartProducts((prev) => ({...prev, [productId] : prev[productId] + 1}))
        setCount(count + 1)
    }
    // remove from cart fn 
    const removeFromCart = (productId) => {
        setCartProducts((prev) => ({...prev, [productId] : prev[productId] - 1}))
        setCount(count - 1)
    }

    // get TOTAL cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartProducts) {
            //check qty
            if (cartProducts[item] > 0) {
                // storing product data in itemInfo 
                let itemInfo = products.find((product) => product.id === Number(item) )
                totalAmount += itemInfo.price * cartProducts[item]
            }
        }
        return Math.floor(totalAmount)
    }

    const getTotalCartProducts = () => {
        let total = 0
        for (const product in cartProducts) {
            if (cartProducts[product] > 0) {
                total += cartProducts[product]
            }
        }

        return total
    }


    const contextValue = {
        products,
        categories,
        mainCategories,
        cartProducts,
        addToCart, 
        removeFromCart,
        getTotalCartAmount,
        getTotalCartProducts,
        count
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider