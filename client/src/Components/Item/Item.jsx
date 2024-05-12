// This is the individual product card that goes in shop category 

import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

const Item = (props) => {
    console.log(props, " -->props")

    const colorStyle = {
        "backgroundColor": `${props.color}`,
        "width": "15px",
        "height": "15px",
        "borderRadius": "50px"
    }


    return (
        <div className="item">
            <ul className="product-images">
                {/* NOTE: change this back to id  */}
                <li><Link to={`/products/${props._id}`}><img src={props.productImages} alt={props.productName}/></Link></li>
            </ul>
            <ul className="product-colors">
                <li><div style={colorStyle}></div></li>
            </ul>
            <p className="product-name">{props.productName}</p>
            <div className="product-price">
                <p>${props.price}</p>
            </div>
        </div>
    )
}

export default Item

