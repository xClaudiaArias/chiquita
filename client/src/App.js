import  React, { useEffect } from 'react';
import Navbar from './components/partials/navbar';
import Product from './components/product';
import Footer from './components/partials/footer';

const App = () => {
    useEffect(() => {
        document.title = 'Chiquita';
    }, []);

    return (
        <>
            <Navbar />

            <Product />

            <Footer />
        </>
    )
}

export default App