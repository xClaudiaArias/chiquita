const Cart = require("../models/Cart");
const asyncHandler = require('express-async-handler');

const getAllCarts = asyncHandler(async(req, res) => {
    const carts = await Cart.find()

    if (!carts?.length) {
        return res.status(400).json({message: "No cart found"})
    }

    res.json(carts)
})

const createCart = asyncHandler(async(req, res) => {
    const {customer, products, quantity} = req.body

    if (!customer || !products || !quantity) {
        return res.status(400).json({message: "Fields can not be empty."})
    }

    const cartObj = {customer, products, quantity}

    const cart = await Cart.create(cartObj)

    res.json({message: `Cart with id ${cart.id} created`})
})

const updateCart = asyncHandler(async(req, res) => {
    const {id, customer, products, quantity} = req.body

    if (!id || !customer || !products || !quantity) {
        return res.status(400).json({message: "Fields can not be empty."})
    }

    const cart = await Cart.findById(id)

    if (!cart) {
        return res.status(400).json({message: "Cart doesn't exist"})
    }

    cart.products = products
    cart.quantity = quantity

    const updatedCart = cart.save()

    res.json({message: `Cart with ID ${cart.id} has been updated.`})
})

const deleteCart = asyncHandler(async(req, res) => {
    const { id } = req.body

    if (!id ) {
        return res.status(400).json({message: "Needs cart ID."})
    }

    const cart = cart.findById(id).lean().exec()

    const deletedCart = cart.deleteOne()

    res.json({message: `Cart with ID ${card.id} has been deleted`})
})

module.exports = {
    getAllCarts,
    createCart,
    updateCart,
    deleteCart
}