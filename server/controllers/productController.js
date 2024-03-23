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
    const products = await Product.find({})
    let id;

    const { mainCategory, category, productName, productDescription, productImages, color, units_in_stock, size, price } = req.body

    if (products.length > 0) {
        // get last product
        let last_product_num = products.slice(-1)
        let last_product = last_product_num[0] //access one product
        id = last_product.id + 1
    } else {
        id = 1
    }


    if (!mainCategory || !category || !productName || !productDescription || !productImages || !color || !units_in_stock || !size || !price) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const productObj = { id, mainCategory, category, productName, productDescription, productImages, color, units_in_stock, size, price}

    const product = await Product.create(productObj)

    res.json({
        success: true,
        message: `Product with id ${product.id} was created.`
    })
})

const updateProduct = asyncHandler(async(req, res) => {
    const { _id, id, mainCategory, category, productName, productDescription, productImages, color, units_in_stock, size, price } = req.body

    if ( !_id || !id || !mainCategory ||  !category || !productName || !productDescription || !productImages || !color || !units_in_stock || !size || !price  ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const product = await Product.findById(_id)

    if (!product) {
        return res.status(400).json({message: "No product found."})
    }

    product.id = id
    product.productName = productName
    product.productImages = productImages
    product.category = category
    product.mainCategory = mainCategory
    product.productDescription = productDescription
    product.color = color
    product.units_in_stock = units_in_stock
    product.price = price
    product.size = size

    const updatedProduct = await product.save()

    res.json({message: `Product with ID ${updatedProduct.id} updated.`})
})

const deleteProduct = asyncHandler(async(req, res) => {
    const { _id } = req.body

    if ( !_id ) {
        return res.status(400).json({message: "Product ID required"})
    }

    const product = await Product.findById(_id).exec()

    if (!product) {
        return res.status(400).json({message: "Product not found"})
    }

    const deleteproduct = await product.deleteOne()

    res.json({message: `product with ID ${deleteproduct._id} has been deleted.`})
})

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}