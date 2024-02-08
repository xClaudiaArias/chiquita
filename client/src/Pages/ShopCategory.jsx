import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item.jsx'

const ShopCategory = (props) => {
    const {products} = useContext(ShopContext);

    return (
        <div className='shop-category'>
        <img src={props.banner} alt=""/>
        <div className='shopcategory-indexSort'>
            <p>
            <span>Showing 1-12</span> out of 36 products
            </p>
        </div>
        <div className="shopcategory-sort">
            Sort by v
        </div>
        <div className="shopcategory-products">
            {
                products.map((item, i) => {
                    if (props.mainCategory === item.mainCategory) {
                    return <Item key={i} id={item._id} productName={item.productName} productImages={item.productImages} size={item.size} color={item.color} price={item.price} />
                    }
                })
            }
        </div>
        </div>

    )
}

export default ShopCategory