import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [cartProducts, setCartProducts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes, mainCategoriesRes] = await Promise.all([
                    axios.get('http://localhost:8000/product'),
                    axios.get('http://localhost:8000/category'),
                    axios.get('http://localhost:8000/main-category')
                ]);

                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
                setMainCategories(mainCategoriesRes.data);

                // Check if cartProducts are available in localStorage
                try {
                    const authToken = localStorage.getItem('auth-token');
                    if (authToken) {
                        const response = await axios.post('http://localhost:8000/cart', {
                            headers: {
                                'auth-token': authToken
                            }
                        });

                        console.log(response)
                        setCartProducts(localStorage.getItem('cartProducts'))
                    } else {
                        console.log("No auth token.");
                    }
                } catch (error) {
                    console.log("Failed to add item to cart: ", error.message);
                }
            } catch (error) {
                console.log("Failed to get all data: ", error.message);
            }
        };
        fetchData();
    }, []);

    const addToCart = async (productId, quantity = 1) => {
        setCartProducts(prevCartProducts => ({
            ...prevCartProducts,
            [productId]: (prevCartProducts[productId] || 0)  + quantity
        }));

        try {
            const authToken = localStorage.getItem('auth-token');
            if (authToken) {
                await axios.post('http://localhost:8000/addToCart', {
                    productId,
                    quantity
                }, {
                    headers: {
                        'auth-token': authToken
                    }
                });
            } else {
                console.log("No auth token.");
            }
        } catch (error) {
            console.log("Failed to add item to cart: ", error.message);
        }
    };

    const removeFromCart = async (productId) => {
        setCartProducts(prevCartProducts => {
            const updatedCart = { ...prevCartProducts };
            const newQuantity = Math.max(updatedCart[productId] - 1, 0);
            if (newQuantity === 0) {
                delete updatedCart[productId]; // Remove the item from the cart
            } else {
                updatedCart[productId] = newQuantity;
            }
            return updatedCart;
        });
    };

    useEffect(() => {
        // Save cartProducts to localStorage whenever it changes
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cartProducts]);

    const getTotalCartAmount = () => {
        let total = 0;
        for (const product in cartProducts) {
            products.forEach(p => {
                if (p._id === product) {
                    total += p.price * cartProducts[product];
                }
            });
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
