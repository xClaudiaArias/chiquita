import React, { useState } from 'react'
import './AddProduct.css'


const AddProduct = () => {

    const [productImages, setProductImages] = useState([])
    const [productColor, setProductColor] = useState([])
    const [productSize, setProductSize] = useState([])
    const [categories, setCategories] = useState([])
    
    const [productInfo, setProductInfo] = useState({
        categories: [],
        productName: "",
        productDescription: "",
        productImages: [],
        size: [],
        color: [],
        price: "",
        units_in_stock: "1",
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

    const addColor = (color) => {
        setProductInfo({ ...productInfo, color: [...productInfo.color, color] });
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

        const categoriesArray = productInfo.categories.split(",").map(category => category.trim());
        setProductInfo({ ...productInfo, categories: categoriesArray });


        for (let i = 0; i < productImages.length; i++) {
            console.log(productImages[i])
            formData.append('product', productImages[i])
        }

        console.log(productImages, ' -->productImages')

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

            await fetch('http://localhost:8000/products', {
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
                    <p>Categories</p>
                    <input onChange={changeHandler} value={productInfo.categories} name="categories" type="text" /> 
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
            <div className="addproduct-item">
                <p>Color</p>
                <button onClick={() => addColor("red")}>red</button>
                <button onClick={() => addColor("orange")}>orange</button>
                <button onClick={() => addColor("yellow")}>yellow</button>
                <button onClick={() => addColor("green")}>green</button>
                <button onClick={() => addColor("blue")}>blue</button>
                <button onClick={() => addColor("purple")}>purple</button>
                <button onClick={() => addColor("black")}>black</button>
                <button onClick={() => addColor("white")}>white</button>
                <button onClick={() => addColor("brown")}>brown</button>
                <button onClick={() => addColor("beige")}>beige</button>
                <button onClick={() => addColor("pink")}>pink</button>
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
                    {productInfo.color.map((color, index) => (
                        <span key={index} style={{ backgroundColor: color }}>{color}</span>
                    ))}
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