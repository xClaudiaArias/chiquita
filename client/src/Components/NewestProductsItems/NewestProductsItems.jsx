import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material';
import React, { useState } from 'react';
import './NewestProductsItems.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from 'react-router-dom';

const NewestProductsItems = ({ item }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <div className='newestproductsitems'>
            {item.productImages && item.productImages.length > 0 && (
                <img src={item.productImages[0]} alt="" />
            )}
            <div className="newestproductsitems-info">
                <Link to={`/products/${item._id}`}>
                    <div className="newestproductsitems-info-icon">
                        <VisibilityOutlinedIcon /> VIEW
                    </div>
                </Link>
                <div className="newestproductsitems-info-icon" onClick={handleFavoriteClick}>
                    {isFavorited ? <Favorite /> : <FavoriteBorderOutlined />} SAVE
                </div>
            </div>
            <p>{item.productName} <span>${item.price}.00</span></p>
        </div>
    );
};

export default NewestProductsItems;
