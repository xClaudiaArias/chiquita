import React, { createContext, useState } from "react";
import axios from "axios";
import FetchData from "../Data/FetchData";

export const ShopContext = createContext(null);


// get empty cart 
const getDefaultCart = () => {
    let cart = {};

    for (let index = 0; index < FetchData().length+1; index++) {
        cart[index] = 0
    }

    return cart
}

const ShopContextProvider = (props) => {
    const products = [], categories = [], mainCategories = []
    // cart products
    const [cartProducts, setCartProducts] = useState(getDefaultCart())


    // add product to cart fn
    const addToCart = (productId) => {
        setCartProducts((prev, i) => ({...prev, [productId] : i + 1}))
        console.log(cartProducts, " cart products --- addToCart fn")
    }

    const contextValue = {
        products: FetchData().products,
        categories: FetchData().categories,
        mainCategories: FetchData().mainCategories,
        cartProducts,
        addToCart,
        getDefaultCart
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider