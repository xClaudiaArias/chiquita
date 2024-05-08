const mongoose = require("mongoose");

const ProductVariantSchema = new mongoose.Schema({
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1
    },
});

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MainCategory'
    },
    categories: {
        type: Array,
        required: true
    },
    ProductImages: [{
        type: String,
        required: false
    }],
    ProductName: {
        type: String,
        required: true
    },
    ProductDescription: String,
    price: {
        type: Number,
        required: true
    },
    variants: [ProductVariantSchema], // Reference to Product variants
});

module.exports = mongoose.model('Product', ProductSchema);
