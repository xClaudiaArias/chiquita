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
import baby_banner from './Components/Assets/baby_banner.png';
import kids_banner from './Components/Assets/kids_banner.png';
import toddler_banner from './Components/Assets/toddler_banner.png';
import accessories_banner from './Components/Assets/accessories_banner.png'



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
                    <Route path="/babies" element={<ShopCategory banner={baby_banner} mainCategoryName="babies" mainCategory="65bbe5b0062e04db1ac1b0bd"/>} />
                    <Route path="/toddlers" element={<ShopCategory banner={toddler_banner} mainCategoryName="toddlers"  mainCategory="65bbe5bd062e04db1ac1b0bf"/>} />
                    <Route path="/kids" element={<ShopCategory banner={kids_banner} mainCategoryName="kids"  mainCategory="65bbe5c2062e04db1ac1b0c1"/>} />
                    <Route path="/accessories" element={<ShopCategory banner={accessories_banner} mainCategoryName="accessories"  mainCategory="65bbe5ca062e04db1ac1b0c3"/>} />

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