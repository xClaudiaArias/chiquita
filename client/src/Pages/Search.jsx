import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/ShopCategory.css'

const Search = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchProducts = async (query) => {
        try {
            const response = await fetch(`http://localhost:8000/products?search=${query}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');
        if (query) {
            fetchProducts(query);
        } else {
            setLoading(false);
            setError('No search query provided');
        }
    }, [location.search]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='search-cont'>
            <h1>Search Results</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li>
                            {/* TODO: style this: */}
                            <Link to={`/products/${product._id}`}>
                                <img src={product.productImages} alt={product.productName} />
                            </Link>
                            <p key={product._id}>{product.productName}</p>
                            <div className="search-desc">
                                <p>${product.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No products found</div>
            )}
        </div>
    );
};

export default Search;
