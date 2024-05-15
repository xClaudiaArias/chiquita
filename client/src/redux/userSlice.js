import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null, // at the beginning
        isFetching: false,
        isAuthenticated: false,
        error: false
    },
    reducers: {
        // create three reducers (login, success and failuer )
        loginStart: (state) => {
            state.isFetching = true
        },// at beginning we dont need actin since we won't send anything
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
            state.isAuthenticated = true;
        }, //async fn makes api req if succ, take actionpayload and update curr user
        loginFailure: (state) => {
            state.isFetching = false; // if smething is wrong with out api
            state.error = true
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
        },
    }
});

export const LOGOUT = "user/logout";

export const logout = () => ({
    type: LOGOUT,
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer; // use inside store
