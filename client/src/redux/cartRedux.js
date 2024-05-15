import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => { // add product to our cart and increase quantity
            state.quantity += 1;
            state.products.push(action.payload); // our new product
            state.total += action.payload.price * action.payload.quantity;
        },
        increaseQuantity: (state, action) => { // increase quantity of a product
            const productId = action.payload;
            const product = state.products.find(item => item._id === productId);
            const existingProduct = state.products.find(product => product._id === productId);
            if (existingProduct) {
                product.quantity += 1;
                state.quantity += 1;
                state.total += product.price;
            }
        },
        decreaseQuantity: (state, action) => { // decrease quantity of a product
            const productId = action.payload;
            const productIndex = state.products.findIndex(item => item._id === productId);
            if (productIndex !== -1) {
                const product = state.products[productIndex];
                if (product.quantity > 1) {
                    product.quantity -= 1;
                    state.quantity -= 1;
                    state.total -= product.price;
                }
            }
        },
        removeProduct: (state, action) => {
            const productId = action.payload;
            const productIndex = state.products.findIndex(item => item._id === productId);
            if (productIndex !== -1) {
                const product = state.products[productIndex];
                state.quantity -= product.quantity;
                state.total -= product.price * product.quantity;
                state.products.splice(productIndex, 1); // removes product from array
            }
        },
        clearCart: (state) => {
            state.products = []; // Clear products array
            state.quantity = 0; // Reset quantity
            state.total = 0; // Reset total
        }
    }
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer; // use inside store
