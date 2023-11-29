import  React, { useEffect } from 'react';
import Navbar from './components/partials/navbar';
import Product from './components/product';
import Footer from './components/partials/footer';
import Layout from './components/layout';

const App = () => {
    useEffect(() => {
        document.title = 'Chiquita';
    }, []);

    return (
        <>
            <Layout />
            <Footer />
        </>
    )
}

export default App