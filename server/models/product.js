// order items
const mongoose = require("mongoose")

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
    productDescription: {
        type: String,
        required: true
    },
    color: [{
        type: String,
        required: true
    }],
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
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    { timestamps : true }
)

function getPrice(num){
    return (num/100).toFixed(2)
}

function setPrice(num){
    console.log(typeof(num), " ::2")
    return num;
}

module.exports =  mongoose.model('Product', productSchema)