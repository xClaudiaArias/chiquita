import  React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import CategoriesNav from './Components/CategoriesNav/CategoriesNav';


const App = () => {
    useEffect(() => {
        document.title = 'Chiquita';
    }, []);

    return (
        <>
            <Navbar />
            <CategoriesNav />
        </>
    )
}

export default App