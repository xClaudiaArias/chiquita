import React from 'react'
import "./SimilarProducts.css"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from 'react-router-dom';

const SimilarProducts = ({item}) => {
    return (
        <div className='similarproducts'>
            <img src={item.productImages[0]} alt={item.productName} />
            <div className="similarproducts-info">
                <h1>{item.productName}</h1>
                <div className="similarproducts-info-btns">
                <Link to={`/products/${item._id}`}><VisibilityOutlinedIcon style={{marginRight: 2, fontSize: 14, fill: '#414141'}} /> View Item</Link>
                </div>

            </div>
        </div>
    )
}

export default SimilarProducts