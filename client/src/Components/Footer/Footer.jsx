import React from 'react'
import './Footer.css'
import { EmailOutlined, Facebook, Instagram, LocationOnOutlined, PhoneIphoneOutlined, Pinterest } from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    return (
        <div className='footer'>

            <div className="footer-left">
                <div className="logo">CHIQUITA</div>
                <p>CHIQUITA is a small-scale business founded by Isel with a focus on crafting unique and personalized clothing items for young girls. Being inspired by her two daughters and with a passion to create beautiful designs, Isel has garnered a loyal customer base within the local community. 🛍️
                </p>
            </div>


            <div className="footer-center">
                <h1>Find more...</h1>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>FAQ</li>
                    <li>Terms of Service</li>

                    <li>Privacy Policy</li>
                    <li>Size guide</li>
                    <li>Site map</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div className="footer-right">
                <h1>Contact us</h1>
                <div> <EmailOutlined  style={{marginRight: 10}}/>  CHIQUITACOUTURE8@GMAIL.COM</div>
                <div> <PhoneIphoneOutlined  style={{marginRight: 10}}/> +1 347 910 2003</div>
                <div> <LocationOnOutlined style={{marginRight: 10}}/> BRONX, NEW YORK, USA</div>
                <div className="socials">
                    <div className="facebook socials-links"><Facebook/></div>
                    <div className="instagram socials-links"><Instagram/></div>
                    <div className="x-icon socials-links"><XIcon/></div>
                    <div className="pinterest socials-links"><Pinterest/></div>
                </div>
            </div>
        </div>
    )
}

export default Footer