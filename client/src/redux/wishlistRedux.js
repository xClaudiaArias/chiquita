import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: []
    },
    reducers: {
        addToWishlist: (state, action) => {
            if (action.payload !== null) {
                state.products.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        clearWishlist: (state) => {
            state.products = [];
        }
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
