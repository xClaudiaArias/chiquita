import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import FetchData from "../Data/FetchData";

export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};

//     let fData = FetchData().products;

//     fData.forEach((product) => {
//         cart[product._id] = 0;
//     });

//     console.log(cart, "---> default cart");
//     return cart;
// };

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [cartProducts, setCartProducts] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsRes, categoriesRes, mainCategoriesRes] = await Promise.all([
                    axios.get('http://localhost:8000/product'),
                    axios.get('http://localhost:8000/category'),
                    axios.get('http://localhost:8000/main-category')
                ]);

                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
                setMainCategories(mainCategoriesRes.data);

                const defaultCart = {}
                productsRes.data.forEach(product => {
                    defaultCart[product._id] = 0
                })

                setCartProducts(defaultCart)
            } catch(error) {
                console.log("Failed to get data: ", error.message);
            }
        }
        fetchData();
    }, []);

    const addToCart = (productId, quantity = 1) => {
        setCartProducts(prevCartProducts => ({
            ...prevCartProducts,
            [productId]: prevCartProducts[productId] + quantity
        }));
    };

    const removeFromCart = (productId) => {
        setCartProducts(prevCartProducts => ({
            ...prevCartProducts,
            [productId]: Math.max(prevCartProducts[productId] - 1, 0)
        }));
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const productId in cartProducts) {
            const product = products.find(p => p._id === productId);
            if (product) {
                total += product.price * cartProducts[productId];
            }
        }
        return total;
    };

    const contextValue = {
        products,
        categories,
        mainCategories,
        cartProducts,
        addToCart, 
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
