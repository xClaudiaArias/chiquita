import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { similarItems } from '../Data/data.js'
import Item from '../Components/Item/Item.jsx'
import './CSS/ShopCategory.css'

const ShopCategory = (props) => {
    console.log(props, " i am props")
    // const {products, mainCategories, categories} = useContext(ShopContext);

    // let productLength = 0

    // products.map((item) => {
    //     if (props.mainCategory === item.mainCategory) {
    //         return productLength += 1;
    //     }
    // })
    

    return (
        <div className='shop-category'>
            <h1 style={{marginLeft: 30, textTransform: "capitalize"}}>{props.mainCategoryName}</h1>


            <div className="filter-sort">
                <p>Filter By:</p>
                <div className="shop-filter-sort-items">
                    <span>Size: </span>
                    <select className="filter-size">
                        <option value="">XS</option>
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                    </select>
                </div>
                <div className="shop-filter-sort-items">
                    <div className="filter-color">
                    <span>Color: </span>
                        <select className="filter-size">
                            <option value="">red</option>
                            <option value="">blue</option>
                            <option value="">yellow</option>
                            <option value="">pink</option>
                            <option value="">green</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* <div className='shopcategory-indexSort'>       
            <p className="shop-show"><span>Showing 1-{productLength}</span> out of {productLength} products</p>
                <div className="shopcategory-sort">
                    Sort by
                </div>
            </div> */}
            <div className="shopcategory-products">
                {
                    similarItems.map((item, i) => {
                        // console.log(props.mainCategory, item.mainCategory, " tired ")
                        // if (props.mainCategory === item.mainCategory) {
                        return <Item key={i} id={item.id} _id={item._id} productName={item.productName} productImages={item.img} size={item.size} color={item.color} price={item.price} />
                        // } else {
                        //     return null;
                        // }
                    })
                }
            </div>
        </div>

    )
}

export default ShopCategory


