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
    categories: {
        type: Array,
        required: true
    },
    productImages: [{
        type: String,
        required: false
    }],
    productName: {
        type: String,
        required: true
    },
    productDescription: String,
    price: {
        type: Number,
        required: true
    },
    variants: [ProductVariantSchema], // Reference to Product variants
});

module.exports = mongoose.model('Product', ProductSchema);
