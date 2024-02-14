import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext.jsx'
import Breadcrums from '../Components/Breadcrums/Breadcrums.jsx'
import Prod from '../Components/Prod/Prod.jsx'

const Product = () => {
    const { products, categories, mainCategories } = useContext(ShopContext)
    const productId = useParams()

    let productCategory = ""
    let productMainCategory = ""

    const product = products.find((e) => 
        {
            productCategory = e.category
            productMainCategory = e.mainCategory
            return e._id === productId.productId
        }
    )

    const category = categories.find((e) => 
        e._id === productCategory
    )

    const mainCategory = mainCategories.find((e) => 
        e._id === productMainCategory
    )

    return (
        <div className="products">
            <Breadcrums product={product} category={category} mainCategory={mainCategory}/>
            <Prod product={product} category={category}/>
        </div>
    )
}

export default Product