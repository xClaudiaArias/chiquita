const Wishlist = require("../models/Wishlist");
const asyncHandler = require('express-async-handler');

const getAllWishlists = asyncHandler(async(req, res) => {
    const wishlists = Wishlist.find()

    if (!wishlists.length) {
        return res.status(400).json({message: "No wishlists found"})
    }

    res.json(wishlists)
})

const createWishlist = asyncHandler(async(req, res) => {
    const { customer, product } = req.body

    if (!customer || !product) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const wishlistObj = { customer, product }

    const wishlist = Wishlist.create(wishlistObj)

    res.json({message: "New wishlist created."})
})

const updateWishlist = asyncHandler(async(req, res) => {
    const { id, customer, product } = req.body

    if ( !id || !customer || !product ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }


    const wishlist = await Wishlist.findById(id).lean().exec()

    if (!wishlist) {
        return res.status(400).json({message: "No wishlist found."})
    }

    wishlist.product = product

    const updatedProduct = await product.save()

    res.json({message: `${updatedProduct} updated`})
})

const deleteWishlist = asyncHandler(async(req, res) => {
    const { id } = req.body

    if ( !id ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const wishlist = await Wishlist.findById(id)

    const deleteWishlist = wishlist.deleteOne()

    res.json({message: `Wishlist with ID ${deleteWishlist.id} has been deleted.`})
})

module.exports = {
    getAllWishlists,
    createWishlist,
    updateWishlist,
    deleteWishlist
}