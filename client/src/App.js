import  React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import Account from './Pages/Account';
import Product from './Pages/Product';
import Wishlist from './Pages/Wishlist';
import Search from './Pages/Search';



const App = () => {
    useEffect(() => {
        document.title = 'Chiquita | SHOP';
    }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/babies" element={<ShopCategory category="babies"/>} />
                    <Route path="/toddlers" element={<ShopCategory category="toddlers"/>} />
                    <Route path="/kids" element={<ShopCategory category="kids"/>} />
                    <Route path="/accessories" element={<ShopCategory category="accessories"/>} />

                    <Route path="/product" element={<Product />}>
                        <Route path=":productId" element={<Product />} />
                    </Route>

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/account" element={<Account />} />
                </Routes>
            
            </BrowserRouter>

        </>
    )
}

export default App