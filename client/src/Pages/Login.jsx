import React from 'react'
import "./CSS/ShopCategory.css"
import { useEffect, useState } from 'react';
import { similarItems } from "../Data/data"
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { Link } from 'react-router-dom';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {


    const [currentSlide, setCurrentSlide] = useState(0);
        const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === similarItems.length - 1 ? 0 : prevSlide + 1));
        };
    
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval); 
    }, [currentSlide]); 
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    // handle errors 
    const { isFetching, error } = useSelector((state) => state.user)

    const handleClick = (e) => {
        e.preventDefault() //prevent pg from refresging 
        console.log('I was clicked')
        login(dispatch, { username, password })
    }

    return (
        <div className='login'>

            <div className="slideshow">
                {similarItems.map((item, index) => (
                    <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${item.img})` }}
                    ></div>
                ))}
            </div>

            <div className="login-info-container">
                <h1>Login</h1>
                <p className='login-slogan'>Get to experience our homemade creations.</p>
                <div className="login-inputs-container">
                    <div className="login-ct login-username">
                        <PersonIcon />
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="login-ct login-password">
                        <PasswordIcon />
                        <input type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p>Forgot Username?</p>
                    <Link to="/register">Don't have an account? REGISTER HERE</Link>

                    <button onClick={handleClick} disabled={isFetching}>
                        Login
                    </button>   
                    {error && <div className="error-container">Something went wrong</div>   }     
                </div>
            </div>
        </div>
    )
}

export default Login