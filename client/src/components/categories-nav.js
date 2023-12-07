import React from "react";
import { Outlet, Link } from 'react-router-dom';


const CategoriesNav = () => {
    return (
        <>                       
            <div className="layout__top-bar">
                <ul> 
                    <li>
                        {/* <Link to="/gallery/babies">Babies</Link> */}
                        <a href="/">Babies</a>
                    </li>

                    <li>
                        {/* <Link to="/gallery/toddlers">Toddlers</Link> */}
                        <a href="/">Toddlers</a>
                    </li>

                    <li>
                        {/* <Link to="/gallery/kids">Kids</Link> */}
                        <a href="/">Kids</a>
                    </li>


                    <li>
                        {/* <Link to="/gallery/accessories">Accessories</Link> */}
                        <a href="/">Accessories</a>
                    </li>
                </ul>
            </div>
            {/* <Outlet /> */}
        </>
    )
}

export default CategoriesNav