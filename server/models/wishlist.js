const mongoose = require("mongoose")

const wishListSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
})

module.exports =  mongoose.model('Wishlist', wishListSchema)