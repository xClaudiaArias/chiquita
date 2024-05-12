import  React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Wishlist from './Pages/Wishlist';
import Search from './Pages/Search';
import baby_banner from './Components/Assets/baby_banner.png';
import toddler_banner from './Components/Assets/toddler_banner.png';
import accessories_banner from './Components/Assets/accessories_banner.png'
import Announcements from './Components/Announcements/Announcements'
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';



const App = () => {
    useEffect(() => {
        document.title = 'Chiquita | SHOP';
    }, []);

    return (
        <>
            <Announcements />
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/babies" element={<ShopCategory banner={baby_banner} mainCategoryName="babies" mainCategory="65bbe5b0062e04db1ac1b0bd"/>} />
                    <Route path="/toddlers" element={<ShopCategory banner={toddler_banner} mainCategoryName="toddlers"  mainCategory="65bbe5bd062e04db1ac1b0bf"/>} />
                    <Route path="/kids" element={<ShopCategory mainCategoryName="kids"  mainCategory="65bbe5c2062e04db1ac1b0c1"/>} />
                    <Route path="/accessories" element={<ShopCategory banner={accessories_banner} mainCategoryName="accessories"  mainCategory="65bbe5ca062e04db1ac1b0c3"/>} />

                    <Route path="/products" element={<Product />}>
                        <Route path=":productId" element={<Product />} />
                    </Route>

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            
                <Footer />
            </BrowserRouter>

        </>
    )
}

export default App