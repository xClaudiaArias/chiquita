import React, { useEffect, useState } from 'react';
import "./CSS/ShopCategory.css";
import { similarItems } from "../Data/data";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';

const Login = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === similarItems.length - 1 ? 0 : prevSlide + 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const handleClick = (e) => {
        e.preventDefault();
        console.log('I was clicked');
        console.log(username, password);
        login(dispatch, { username, password });
    };

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
                    {/* {error && <span className="error-message">Something went wrong. Please try again.</span>} */}
                </div>
            </div>
        </div>
    );
};

export default Login;
