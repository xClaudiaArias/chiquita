import React from 'react'
import './Breadcrums.css'


const Breadcrums = (props) => {
    const {product, category} = props;

    console.log(category.categoryName, "category")
    return (
        <div className='breadcrums'>
            HOME | SHOP | {category.categoryName}  |
        </div>
    )
}

export default Breadcrums