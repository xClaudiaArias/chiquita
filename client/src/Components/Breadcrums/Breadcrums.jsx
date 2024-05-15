import React from 'react'
import './Breadcrums.css'
import { Link } from 'react-router-dom'


const Breadcrums = (props) => {
    // const {product, category, mainCategory} = props;

    return (
        <div className='breadcrums'>
            <p>
                <Link to={`/products/${props.mainCategory}`}>
                    <span className='main-cat'>{props.mainCategory}</span>
                </Link>
                <span className='divider'>|</span> 
                <span className='cat'>{props.category}</span>
                <span className='divider'>|</span>
                {props.productName} </p>

                {/* FIXME: CHANGE THIS BACK */}
                {/* hello */}
        </div>
    )
}

export default Breadcrums
