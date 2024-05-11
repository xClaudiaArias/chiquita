const Product = require("../models/Product");
const asyncHandler = require('express-async-handler');

// 🛍️ get all products 
const getAllProducts = asyncHandler(async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category

    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if (qCategory) {
            products = await Product.find({categories : {
                $in: [qCategory]
            }})
        } else {
            products = await Product.find()
        }
        

        res.status(200).json(products)
    } catch(error) {
        res.status(500).json(error)
    }
})

// 🛍️ get ONE product by id
const getProductById = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({error: 'Product Not Found'})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Internal server error"})
    }
})

// create product 
const createProduct = asyncHandler(async(req, res) => {
    const { categories, productName, productDescription, productImages, variants, price } = req.body;

    if (!productName || !productDescription || !productImages || productImages.length === 0 || !price || !variants || variants.length === 0 || !categories || categories.length === 0) {
        return res.status(400).json({ message: "Fields can't be empty and at least one variant/category must be provided." });
    }

    const productObj = {
        categories,
        productName,
        productDescription,
        productImages,
        variants, // Assign variants directly
        price
    };

    // Create product in the database
    const product = await Product.create(productObj);

    res.json({
        success: true,
        message: `Product with id ${product._id} was created.`
    });
});

// 🛍️ UPDATE product 
const updateProduct = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { productName, productDescription, productImages, variants, categories, price } = req.body

    if ( !id || !categories || !productName || !productDescription || !productImages || !variants || !price  ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(400).json({message: "No product found."})
    }

    product.productName = productName || product.productName 
    product.productImages = productImages || product.productImages
    product.categories = categories || product.categories
    product.productDescription = productDescription || product.productDescription
    product.variants = variants || product.variants
    product.price = price || product.price

    const updatedProduct = await product.save()

    res.json({message: `Product with ID ${updatedProduct._id} updated.`})
})

// 🛍️ DELETE product
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)
        res.status(200).json("Product has been deleted")
    } catch(error) {
        res.status(500).json(err)
    }
})

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}