import React, { useState } from 'react'
import './AddProduct.css'


const AddProduct = () => {

    const [productImages, setProductImages] = useState([])
    const [productColor, setProductColor] = useState([])
    const [productSize, setProductSize] = useState([])
    
    const [productInfo, setProductInfo] = useState({
        category: "",
        mainCategory: "",
        productName: "",
        productDescription: "",
        productImages: [],
        size: [],
        color: [],
        price: "",
        units_in_stock: "",
        in_stock: true
    })

    const imageHandler = (e) => {
        const images = Array.prototype.slice.call(e.target.files)
        handleUploadImgs(images)
    }

    const handleUploadImgs = files => {
        const uploaded = [...productImages];
        files.some((file) => {
            uploaded.push(file)
        })
        setProductImages(uploaded)
        console.log(uploaded, productImages, " -->uploaded, productImages")
    }

    const changeHandler = (e) => {
        setProductInfo({...productInfo, [e.target.name] : e.target.value})
    }

    const addColor = (e) => {
        console.log(e.target.value)
        let colors = productColor
        colors.push(e.target.value)
        
        setProductColor(colors)
        console.log(productColor, " -->productColor")
    }

    const addSize = (e) => {
        console.log(e.target.value)
        let sizes = productSize
        sizes.push(e.target.value)
        
        setProductSize(sizes)
        console.log(productSize, " -->productSize")
    }

    // submit button handler 
    const addProductBtn = async () => {
        console.log(productInfo, " -->productInfo")
        // console.log("I was clicked")

        let responseData;
        let product = productInfo

        let formData = new FormData()

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

        for (let i = 0; i < productImages.length; i++) {
            console.log(productImages[i])
            formData.append('product', productImages[i])
        }

        // console.log(productImages, ' -->productImages')

        await fetch('http://localhost:8000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { 
            console.log(data, " -->data")
            return responseData = data
        })

        // if image response is true 
        if(responseData.success) {
            // console.log(responseData, ' -->productImages')
            product.productImages = responseData.image_url
            product.color = productColor
            product.size = productSize

            await fetch('http://localhost:8000/product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            }).then((resp) => resp.json()).then((data) => {
                console.log(data, " -->data")
                return data.success ? console.log("Product Added: ", data) : console.log("Failed: ", data)
            })
        }
        console.log(product, " -->product")
    }

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
            <div className="uploaded-imgs-list">
                {
                    productImages.map(file => {
                        <div>{file.name}</div>
                    })
                }
            </div>
            <div className='addproduct-item'>
                <label htmlFor="file-input">
                    <a>Upload Files</a>
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="productImages" accept="image/png" multiple hidden /> 
            </div>
            <div className="addproduct-item">
                <p>Product name</p>
                <input onChange={changeHandler} value={productInfo.productName} name="productName" type="text" />
            </div>
            <div className="addproduct-item">
                <p>Product description</p>
                <textarea onChange={changeHandler} value={productInfo.productDescription} name="productDescription" id="" cols="30" rows="10"></textarea>
            </div>
            {/* <div className="addproduct-item">
                <p>Color</p>
                <input onChange={changeHandler} value={productInfo.color} type="color" id="product-color" name="color" />
            </div> */}
            <div className="addproduct-item">
                <p>Color</p>
                <button onClick={addColor} value="red">red</button>
                <button onClick={addColor} value="orange">orange</button>
                <button onClick={addColor} value="yellow">yellow</button>
                <button onClick={addColor} value="green">green</button>
                <button onClick={addColor} value="blue">blue</button>
                <button onClick={addColor} value="purple">purple</button>
                <button onClick={addColor} value="black">black</button>
                <button onClick={addColor} value="white">white</button>
                <button onClick={addColor} value="brown">brown</button>
                <button onClick={addColor} value="beige">beige</button>
                <button onClick={addColor} value="pink">pink</button>
            </div>
            <div className="addproduct-item">
                <p>Sizes</p>
                <button onClick={addSize} value="xs">xs</button>
                <button onClick={addSize} value="S">S</button>
                <button onClick={addSize} value="M">M</button>
                <button onClick={addSize} value="L">L</button>
                <button onClick={addSize} value="XL">XL</button>
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