import React from "react"

class Register extends React.Component {
    render (){
        return (
        <>

            <p>Welcome to Chiquita</p>
            <h1>Register</h1>

            <form action="" method="">
                <label for="firstName">First name</label>
                <input type="firstName" name="firstName" id="register-firstName"/>

                <label for="lastName">Last name</label>
                <input type="lastName" name="lastName" id="register-lastName"/>

                <label for="email">Email</label>
                <input type="email" name="email" id="register-email"/>

                <label for="password">Password</label>
                <input type="password" name="password" id="register-password"/>

                <div><span>Already have an account? </span><a href="/">Sign in!</a></div>

                <div>
                    <input type="checkbox" name="newsletter" />
                    <label for="checkbox" name="newsletter">Subscribe to our newsletter?</label>
                </div>

                <button>Register</button>

            </form>
        </>
        )
    }
}

export default Register