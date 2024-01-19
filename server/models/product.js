// order items
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
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

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports =  mongoose.model('Product', productSchema)