import React, { createContext, useState } from "react";
import axios from "axios";
import FetchData from "../Data/FetchData";

export const ShopContext = createContext(null);

const shopData = []


const ShopContextProvider = (props) => {
    const products = [], categories = [], mainCategories = []

    const contextValue = {
        products: FetchData().products,
        categories: FetchData().categories,
        mainCategories: FetchData().mainCategories
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider