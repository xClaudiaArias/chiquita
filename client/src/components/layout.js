import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className='layout__navBar'>
                <ul className='layout__navLeft'>
                    <li>
                        {/* <Link to="/wishlist">Wishlist</Link> */}
                        <a href="/">wishlist</a>
                    </li>

                    <li>
                        {/* <Link to="/account">Account</Link> */}
                        <a href="/">Account</a>
                    </li>
                </ul>

                <ul className='layout__navCenter'>
                    <li className="layout__home-link">
                        {/* <Link to="/">CHIQUITA</Link> */}
                        <a href="/">Chiquitas</a>
                    </li>
                </ul>

                <ul className='layout__navRight'>
                    <li>
                        {/* <Link to="/search">Search</Link> */}
                        <a href="/">Search</a>
                    </li>


                    <li>
                        {/* <Link to="/cart">Cart</Link> */}
                        <a href="/">Cart</a>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}

export default Layout