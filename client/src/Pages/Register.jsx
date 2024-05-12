import React from 'react'
import "./CSS/ShopCategory.css"
import { useEffect, useState } from 'react';
import { similarItems } from "../Data/data"
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

const Register = () => {


    const [currentSlide, setCurrentSlide] = useState(0);
        const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === similarItems.length - 1 ? 0 : prevSlide + 1));
        };
    
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval); 
    }, [currentSlide]); 
    



    return (
        <div className='register'>

            <div className="slideshow">
                {similarItems.map((item, index) => (
                    <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${item.img})` }}
                    ></div>
                ))}
            </div>

            <div className="register-info-container">
                <h1>Sign Up</h1>
                <div className="register-inputs-container">
                    <div className="register-ct register-firstname">
                        <PersonIcon />
                        <input type="text" placeholder="First name" />
                    </div>
                    <div className="register-ct register-lastname">
                        <PersonIcon />
                        <input type="text" placeholder="Last name" />
                    </div>
                    <div className="register-ct register-email">
                        <EmailIcon />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="register-ct register-username">
                        <PersonIcon />
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="register-ct register-password">
                        <PasswordIcon />
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="register-ct register-password">
                        <PasswordIcon />
                        <input type="password" placeholder="Confirm password" />
                    </div>
                    <p>Forgot Username?</p>
                    <Link to="/login">Already have an account? LOGIN HERE</Link>

                    <button>
                        register
                    </button>           
                </div>
            </div>
        </div>
    )
}

export default Register