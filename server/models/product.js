// order items
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    productName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    units_in_stock: {
        type: Number,
        default: 0
    },
    size: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true,
        currency: "USD",
        get: getPrice, 
        set: setPrice
    },
    in_stock: {
        type: Boolean,
        default: false
    }
})

module.exports =  mongoose.model('Product', productSchema)