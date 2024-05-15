const mongoose = require("mongoose");

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
    size: Array,
    color: Array,
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
