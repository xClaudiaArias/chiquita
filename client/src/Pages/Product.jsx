import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext.jsx'
import Breadcrums from '../Components/Breadcrums/Breadcrums.jsx'
import Prod from '../Components/Prod/Prod.jsx'

const Product = () => {
    const { products, categories } = useContext(ShopContext)
    const productId = useParams()

    let productCategory = ""

    const product = products.find((e) => 
        {
            productCategory = e.category
            return e._id === productId.productId
        }
    )

    const category = categories.find((e) => 
        e._id === productCategory
        // console.log(e._id === productCategory, " :0")
    )
    return (
        <div className="products">
            <Breadcrums product={product} category={category}/>
            <Prod product={product} category={category}/>
        </div>
    )
}

export default Product