const mongoose = require("mongoose")

const WishlistProductsSchema = new mongoose.Schema({
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

const WishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [WishlistProductsSchema]

})

module.exports =  mongoose.model('Wishlist', WishlistSchema)