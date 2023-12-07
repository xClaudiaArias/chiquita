import React, { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();

    // form state 
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    // function to update submission 
    const updateForm = (value)  => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // function that will handle the submission 

    const onSubmit = async (e) => {
        e.preventDefault()

        // create a new customer 
        const newCustomer = {...form}
        await fetch("http://localhost:8000/customers",{
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomer),
        }) 
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        })
        navigate("/")
    }

    return (
        <div className="register-container">

            <div className="register-container__image">
                <img src="" alt="--" />
            </div>

            <div className="login-container__form">
                <p>Welcome to Chiquita</p>
                <h1>Register</h1>

                <form onSubmit={onSubmit}>
                    <label for="firstname">First name</label>
                    <input type="firstname" name="firstname" value={form.firstname} id="register-firstname" onChange={(e) => updateForm({firstname : e.target.value})}/>

                    <label for="lastname">Last name</label>
                    <input type="lastname" name="lastname" value={form.lastname}  id="register-lastname" onChange={(e) => updateForm({lastname : e.target.value})}/>

                    <label for="email">Email</label>
                    <input type="email" name="email" value={form.email}  id="register-email" onChange={(e) => updateForm({email : e.target.value})}/>

                    <label for="password">Password</label>
                    <input type="password" name="password" value={form.password} id="register-password" onChange={(e) => updateForm({password : e.target.value})}/>

                    <div><span>Already have an account? </span><a href="/">Sign in!</a></div>

                    <div>
                        <input type="checkbox" name="newsletter" />
                        <label for="checkbox" name="newsletter">Subscribe to our newsletter?</label>
                    </div>

                    <button type="submit">Register</button>

                </form>
                </div>
        </div>
    )
}

export default Register