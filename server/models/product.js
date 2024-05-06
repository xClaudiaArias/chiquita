const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 0
    },
});

const productSchema = new mongoose.Schema({
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
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
    variants: [productVariantSchema], // Reference to product variants
});

module.exports = mongoose.model('Product', productSchema);
