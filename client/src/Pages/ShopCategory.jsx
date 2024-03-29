import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item.jsx'
import './CSS/ShopCategory.css'

const ShopCategory = (props) => {
    const {products, mainCategories, categories} = useContext(ShopContext);

    let productLength = 0

    products.map((item) => {
        if (props.mainCategory === item.mainCategory) {
            return productLength += 1;
        }
    })
    

    return (
        <div className='shop-category'>
            <h1>{props.mainCategoryName}</h1>
            <div className='shopcategory-indexSort'>       
            <p className="shop-show"><span>Showing 1-{productLength}</span> out of {productLength} products</p>
                <div className="shopcategory-sort">
                    Sort by
                </div>
            </div>
            <div className="shopcategory-products">
                {
                    products.map((item, i) => {
                        // console.log(props.mainCategory, item.mainCategory, " tired ")
                        if (props.mainCategory === item.mainCategory) {
                        return <Item key={i} id={item.id} _id={item._id} productName={item.productName} productImages={item.productImages} size={item.size} color={item.color} price={item.price} />
                        } else {
                            return null;
                        }
                    })
                }
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>

    )
}

export default ShopCategory


