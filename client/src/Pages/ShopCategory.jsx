import React, { useState } from 'react'
import Item from '../Components/Item/Item.jsx'
import './CSS/ShopCategory.css'
import { useLocation } from 'react-router-dom'

const ShopCategory = (props) => {
      // GET CAT NAME 
    const location = useLocation(); // gives us pathname
    const cat = location.pathname.split("/")[2] //get category from params

    // use state hook to change to values in filter 
    const [filters, setFilters] = useState({}) // whenever I change color or size, this will be updated
    const [sort, setSort] = useState("newest") // sort by PRICE -- beginning shows newest items as default

    const handleFilters = (e) => {
        const value = e.target.value 
        console.log(value, " value")
        setFilters({
        ...filters,
        [e.target.name] : value
        })
    }
    
    return (
        <div className='shop-category'>
            <h1 style={{marginLeft: 30, textTransform: "capitalize"}}>{props.mainCategoryName}</h1>


            <div className="filter-sort">

                <p>Filter By:</p>

                <div className="shop-filter-sort-items">
                    <select name="size" className="filter-size" onChange={handleFilters}>
                        <option disabled>Size:</option>
                        <option value="2T">2T</option>
                        <option value="3T">3T</option>
                        <option value="4T">4T</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div className="shop-filter-sort-items">
                    <div className="filter-color">
                        <select name="color" className="filter-size" onChange={handleFilters}>
                            <option diabled>Color:</option>
                            <option value="red">red</option>
                            <option value="blue">blue</option>
                            <option value="yellow">yellow</option>
                            <option value="pink">pink</option>
                            <option value="green">green</option>
                            <option value="purple">purple</option>
                            <option value="white">white</option>
                            <option value="beige">beige</option>
                            <option value="black">black</option>
                        </select>
                    </div>
                </div>

                <p>Sort By:</p>
                <div className="shop-filter-sort-items">
                    <div className="sort">
                        <select onChange={e => setSort(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="shopcategory-products">
                {
                    // sending my props to Item 
                    <Item cat={cat} filters={filters} sort={sort} />
                }
            </div>
        </div>

    )
}

export default ShopCategory


