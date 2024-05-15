import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "./userSlice"

export const login = async (dispatch, user) => {
    dispatch(loginStart()) // fetching will be true
    try {
        const response = await axios.post('http://localhost:8000/auth/login', user) // take this from login page
        dispatch(loginSuccess(response.data)) //sending our action and payload (usr info)
    } catch (err) {
        console.log(err)
        dispatch(loginFailure())
    }
} 