import React from 'react'
import "./Item.css"

const Item = (props) => {

    console.log(props, " --> props")
    return (
        <div className="item">
            <p>{props.productName}</p>
            <ul className="product-images">
                <li><img src={props.productImages[0]} alt="" /></li>
                <li><img src={props.productImages[1]} alt="" /></li>
                <li><img src={props.productImages[2]} alt="" /></li>
                <li><img src={props.productImages[3]} alt="" /></li>
            </ul>
            <ul className="product-colors">
                <li>{props.color}</li>
            </ul>
            <div className="product-price">
                    ${props.price}
            </div>
            <div className="product-sizes">
                <li>{props.size[0]}</li>
                <li>{props.size[1]}</li>
                <li>{props.size[2]}</li>
                <li>{props.size[3]}</li>
                <li>{props.size[4]}</li>
            </div>
        </div>
    )
}

export default Item