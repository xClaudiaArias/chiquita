import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className='layout__navBar'>
                <ul className='layout__navLeft'>
                    <li>
                        <Link to="/wishlist">Wishlist</Link>
                    </li>

                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>

                <ul className='layout__navCenter'>
                    <li className="layout__home-link">
                        <Link to="/">🍒</Link>
                    </li>
                </ul>

                <ul className='layout__navRight'>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>


                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}

export default Layout