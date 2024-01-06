import React, {useState} from 'react'
import './CategoriesNav.css'
import { Link } from 'react-router-dom'

const CategoriesNav = () => {
    const [menu, setMenu] = useState("home")

    return (
        <div className='categories-nav'>
            <ul className='categories-nav-menu'>
                <li> <Link style={{textDecoration: 'none'}} to="/babies">Babies</Link></li>
                <li> <Link style={{textDecoration: 'none'}} to="/toddlers">Toddlers</Link></li>
                <li> <Link style={{textDecoration: 'none'}} to="/kids">Kids</Link></li>
                <li> <Link style={{textDecoration: 'none'}} to="/accessories">Accessories</Link></li>
            </ul>
        </div>
    )
}

export default CategoriesNav