import React from 'react'
import './AddProduct.css'

const AddProduct = () => {
    return (
        <div className='addproduct'>

            <div className="addproduct-categories">
                <div className="addproduct-item">
                    <p>Main category</p>
                    <select name="main-category" id="main-category">
                        <option value="babies">Babies</option>
                        <option value="toddlers">Toddler</option>
                        <option value="kids">Kids</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>

                <div className="addproduct-item">
                    <p>Category</p>
                    <select name="category" id="category">
                        <option value="dresses">Dresses</option>
                        <option value="tops">Tops</option>
                        <option value="bottoms">Bottoms</option>
                        <option value="one-piece">Onesies</option>
                    </select>
                </div>
            </div>

            <div className='addproduct-addfiles'>
                <p>Select files:</p>
                <input type="file" id="files" name="files" multiple />
                <input type="submit" />
            </div>

            <div className="addproduct-item">
                <p>Product name</p>
                <input type="text" />
            </div>
            <div className="addproduct-item">
                <p>Product description</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="addproduct-item">
                <p>Color</p>
                <input type="color" id="product-color" name="product-color" value="#fff" />
                <input type="color" id="product-color" name="product-color" value="#fff" />
                <input type="color" id="product-color" name="product-color" value="#fff" />
                <input type="color" id="product-color" name="product-color" value="#fff" />
            </div>
            <div className="addproduct-item">
                <p>Price</p>
                <input type="number" />
            </div>
            <div className="addproduct-item">
                <p>Stock</p>
                <input type="number" />
            </div>
        </div>
    )
}

export default AddProduct