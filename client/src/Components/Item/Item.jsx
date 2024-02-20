import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

const Item = (props) => {

    // console.log(props, " ::props in ITEM")

    const colorStyle = {
        "backgroundColor": `${props.color}`,
        "width": "15px",
        "height": "15px",
        "borderRadius": "50px"
    }

    // console.log(props, " --> props")
    return (
        <div className="item">
            <ul className="product-images">
                <li><Link to={`/product/${props.id}`}><img src={props.productImages[0]} alt={props.productName}/></Link></li>
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