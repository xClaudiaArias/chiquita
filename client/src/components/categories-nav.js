import React from "react";
import { Outlet, Link } from 'react-router-dom';


const CategoriesNav = () => {
    return (
        <>                       
            <div className="layout__top-bar">
                <ul> 
                    <li>
                        <Link to="/categories/babies">Babies</Link>
                    </li>

                    <li>
                        <Link to="/categories/toddlers">Toddlers</Link>
                    </li>

                    <li>
                        <Link to="/categories/kids">Kids</Link>
                    </li>


                    <li>
                        <Link to="/categories/accessories">Accessories</Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}

export default CategoriesNav