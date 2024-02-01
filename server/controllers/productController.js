const Product = require("../models/Product");
const asyncHandler = require('express-async-handler');

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()

    if (!products?.length) {
        return res.status(400).json({message: "No products found"})
    }

    res.json(products)
})

const createProduct = asyncHandler(async(req, res) => {
    const { mainCategory, category, productName, productImages, color, units_in_stock, size, price } = req.body

    if (!mainCategory || !category || !productName || !productImages || !color || !units_in_stock || !size || !price) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const productObj = { mainCategory, category, productName, productImages, color, units_in_stock, size, price}

    const product = await Product.create(productObj)

    res.json({message: "New product created."})
})

const updateProduct = asyncHandler(async(req, res) => {
    const { id, mainCategory, category, productName, productImages, color, units_in_stock, size, price } = req.body

    if ( !id || !mainCategory ||  !category || !productName || !productImages || !color || !units_in_stock || !size || !price  ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }


    const product = await Product.findById(id)

    if (!product) {
        return res.status(400).json({message: "No product found."})
    }

    product.productName = productName
    product.productImages = productImages
    product.category = category
    product.mainCategory = mainCategory
    product.color = color
    product.units_in_stock = units_in_stock
    product.price = price
    product.size = size

    const updatedProduct = await product.save()

    res.json({message: `Product with ID ${updatedProduct.id} updated.`})
})

const deleteProduct = asyncHandler(async(req, res) => {
    const { id } = req.body

    if ( !id ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const product = await product.findById(id)

    const deleteproduct = product.deleteOne()

    res.json({message: `product with ID ${deleteproduct.id} has been deleted.`})
})

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}