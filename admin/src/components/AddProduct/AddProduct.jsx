import React, { useState } from 'react'
import './AddProduct.css'


const AddProduct = () => {

    const [productImages, setProductImages] = useState(false)
    
    const [productInfo, setProductInfo] = useState({
        category: "",
        mainCategory: "",
        productName: "",
        productDescription: "",
        size: "XS",
        color: "",
        price: "",
        units_in_stock: "",
        in_stock: true
    })

    const imageHandler = (e) => {
        setProductImages(e.target.files[0])
        console.log(productImages, " -->image")
    }

    const changeHandler = (e) => {
        console.log(e.target, "---> e")
        setProductInfo({...productInfo, [e.target.name] : e.target.value})
    }

    // submit button handler 
    const addProductBtn = async () => {
        console.log(productInfo)
        console.log("I was clicked")

        let responseData;
        let product = productInfo

        let formData = new FormData()

        console.log(product, " -->prroductksksk")

        switch(product.mainCategory) {
            case "Babies":
                product.mainCategory = "65bbe5b0062e04db1ac1b0bd"
                break;
            case "Toddlers":
                product.mainCategory = "65bbe5bd062e04db1ac1b0bf"
                break;
            case "Kids":
                product.mainCategory = "65bbe5c2062e04db1ac1b0c1"
                break;
            case "Accessories":
                product.mainCategory = "65bbe5ca062e04db1ac1b0c3"
                break;
        }

        switch(product.category) {
            case "Bottoms":
                product.category = "6573723586343b42bfcc0ac8"
                break;
            case "Tops":
                product.category = "6573723a86343b42bfcc0aca"
                break;
            case "Dresses":
                product.category = "65aae1bff7ed0db75e9f4474"
                break;
            case "Nightwear":
                product.category = "65aae1def7ed0db75e9f4476"
                break;
            case "Accessories":
                product.category = "65aae1e8f7ed0db75e9f4478"
        }
        


        formData.append('product', productImages)

        await fetch('http://localhost:8000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data })

        console.log(product, " --->product")
        if(responseData.success) {
            product.productImages = responseData.image_url 

            await fetch('http://localhost:8000/product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added") : console.log(data)
            })
        }

        console.log(product, " ---> product")

    }

    console.log(productImages, typeof(productImages), " -->productImages")

    return (
        <div className='addproduct'>

            <div className="addproduct-categories">
                <div className="addproduct-item">
                    <p>Main category</p>
                    <select name="mainCategory" value={productInfo.mainCategory} onChange={changeHandler} id="mainCategory">
                        <option>Babies</option>
                        <option>Toddlers</option>
                        <option>Kids</option>
                        <option>Accessories</option>
                    </select>
                </div>

                <div className="addproduct-item">
                    <p>Category</p>
                    <select name="category" value={productInfo.category} onChange={changeHandler} id="category">
                        <option>Bottoms</option>
                        <option>Tops</option>
                        <option>Dresses</option>
                        <option>Nightwear</option>
                        <option>Accessories</option>
                    </select>
                </div>
            </div>
            <div className='addproduct-addfiles'>
                <label htmlFor="file-input">
                    <img src={productImages ? URL.createObjectURL(productImages) : "https://picsum.photos/seed/picsum/200/300"} alt="" />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="productImages" hidden/>
            </div>
            <div className="addproduct-item">
                <p>Product name</p>
                <input onChange={changeHandler} value={productInfo.productName} name="productName" type="text" />
            </div>
            <div className="addproduct-item">
                <p>Product description</p>
                <textarea onChange={changeHandler} value={productInfo.productDescription} name="productDescription" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="addproduct-item">
                <p>Color</p>
                <input onChange={changeHandler} value={productInfo.color} type="color" id="product-color" name="color" />
            </div>
            <div className="addproduct-item">
                    <p>Sizes</p>
                    <select value={productInfo.size} onChange={changeHandler} name="size" id="size">
                        <option name="size" >XS</option>
                        <option name="size" >S</option>
                        <option name="size" >M</option>
                        <option name="size" >L</option>
                        <option name="size" >XL</option>
                    </select>
                </div>
            <div className="addproduct-item">
                <p>Price</p>
                <input value={productInfo.price} onChange={changeHandler} name="price" type="number" />
            </div>
            <div className="addproduct-item">
                <p>Stock</p>
                <input value={productInfo.units_in_stock} onChange={changeHandler} name="units_in_stock" type="number" />
            </div>

            <button onClick={() => {addProductBtn()}} >Add Product</button>
        </div>
    )
}

export default AddProduct