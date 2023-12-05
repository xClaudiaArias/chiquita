import  React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/partials/footer';
import Home from './components/home';
import Gallery from "./components/gallery";
import Search from "./components/search";
import Layout from './components/layout';

const App = () => {
    useEffect(() => {
        document.title = 'Chiquita';
    }, []);

    return (
        <>
            <Layout />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App