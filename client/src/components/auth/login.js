import React from "react"

const Login = () => {
    return (
        <div className="login-container">

            <div className="login-container__image">
                <img src="" alt="--" />
            </div>

            <div className="login-container__form">
                <p>Welcome to Chiquita</p>
                <h1>Login</h1>

                <form action="" method="">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="login-email"/>

                    <label for="password">Password</label>
                    <input type="password" name="password" id="login-password"/>

                    <div><span>Don't have an account? </span><a href="/">Register here</a></div>
                    <div><a href="/">Forgot your email or password?</a></div>

                    <button>Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login