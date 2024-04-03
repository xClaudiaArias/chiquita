// order items
const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    //FIXME: this should be an array or work around to make it order items 
    products: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    //FIXME: what is this? 
    quantity: {
        type: Number,
        required: true
    },
})

module.exports =  mongoose.model('Cart', cartSchema)