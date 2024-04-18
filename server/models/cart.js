// order items
const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }, 
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [cartItemSchema]
})

module.exports =  mongoose.model('Cart', cartSchema)