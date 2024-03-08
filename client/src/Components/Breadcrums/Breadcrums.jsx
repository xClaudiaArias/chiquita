import React from 'react'
import './Breadcrums.css'


const Breadcrums = (props) => {
    const {product, category, mainCategory} = props;
    return (
        <div className='breadcrums'>
            <p>
                <span className='main-cat'>{mainCategory.mainCategoryName}</span>
                <span className='divider'>|</span> 
                <span className='cat'>{category.categoryName}</span>
                <span className='divider'>|</span>
                {product.productName} </p>
        </div>
    )
}

export default Breadcrums
