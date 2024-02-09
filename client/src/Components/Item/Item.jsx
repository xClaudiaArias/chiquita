import React from 'react'
import "./Item.css"

const Item = (props) => {

    const colorStyle = {
        "backgroundColor": `${props.color}`,
        "width": "15px",
        "height": "15px",
        "borderRadius": "50px"
    }

    console.log(props, " --> props")
    return (
        <div className="item">
            <ul className="product-images">
                {/* {
                    props.productImages.map((imge) => {
                        return <li><img src={imge} alt="" /></li>
                    })
                } */}
                <li><img src={props.productImages[0]} alt={props.productName} /></li>
            </ul>
            <ul className="product-colors">
                <li><div style={colorStyle}></div></li>
            </ul>
            <p className="product-name">{props.productName}</p>
            {/* <div className="product-sizes">
                <p>Sizes:</p>
                <ul>
                    {
                        props.size.map((sz) => {
                            return  <li> {sz} </li>
                        })
                    }
                </ul>
            </div> */}
            <div className="product-price">
                <p>${props.price}</p>
            </div>
        </div>
    )
}

export default Item