import React from 'react'
import "./SimilarProducts.css"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const SimilarProducts = ({item}) => {
    console.log("item: ", item)
    return (
        <div className='similarproducts'>
            <img src={item.img} alt={item.title} />
            <div className="similarproducts-info">
                <h1>{item.title}</h1>
                <div className="similarproducts-info-btns">
                    <button><VisibilityOutlinedIcon style={{marginRight: 2, fontSize: 14, fill: '#414141'}} /> View Item</button>
                    <button><ShoppingBagOutlinedIcon style={{marginRight: 2, fontSize: 14, fill: '#414141'}} /> Add to Cart</button>
                </div>

            </div>
        </div>
    )
}

export default SimilarProducts