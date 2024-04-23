import React, { useState } from 'react'
import './Auth.css'

const Auth = () => {
    const [state, setState] = useState("Login")
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    })

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // login handler 
    const login = async() => {
        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response, " response")

            const responseData = await response.json()
            console.log(responseData, " --->responseData, authlogin")

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token)
                window.location.replace("/")
            } else {
                console.log(responseData.errors, " -->responseData")
                // alert(responseData.errors)
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const register = async () => {
        let responseData;

        await fetch('http://localhost:8000/auth/register', {
            method: "POST",
            headers: {
                Accept: 'application/fomr-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data)

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/auth")
        } else {
            alert("Error") 
        }

        console.log(formData, " --->Customer registered")
    }

    return (
        <div className='auth'>
            <div className="auth-container">
                <div className="auth-hero">
                    <img src="https://picsum.photos/200" alt="" />
                </div>


                <div className="auth-form">
                    <h1>{state}</h1>


                    {/* register extra fields  */}
                    {state === "Register" 
                    ? 
                        <>
                            <input type="text" name="firstname" value={formData.firstname} onChange={changeHandler} placeholder="First name" />
                            <input type="text" name="lastname" value={formData.lastname} onChange={changeHandler} placeholder="Last name" />
                            <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email" />
                        </>
                    :
                        <></>
                    }

                    <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="Username" />
                    <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="password" />
                    <div className="auth-form-agree">
                        <input type="checkbox" name="" />
                        <p>I agree to the <a href="/">terms of use</a> and <a href="/">privacy policy</a> </p>
                    </div>

                    {state === "Register" ? <p className="auth-redirect"> Already have an account? <span onClick={() => {setState("Login")}}>Login!</span> </p>: <></>}

                    {state === "Login" ? <p className="auth-redirect"> Don't have an account? <span onClick={() => {setState("Register")}}>Register now!</span></p>: <></>}

                    <button onClick={() => state === "Login" ? login() : register()}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Auth