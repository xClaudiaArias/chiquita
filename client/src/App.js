import  React, { useEffect } from 'react';
import Footer from './components/partials/footer';
import Home from './components/home';
import Layout from './components/layout';

const App = () => {
    useEffect(() => {
        document.title = 'Chiquita';
    }, []);

    return (
        <>
            <Layout />
            <Home />
            <Footer />
        </>
    )
}

export default App