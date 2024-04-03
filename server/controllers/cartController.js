const Cart = require("../models/Cart");
const Customer = require("../models/Customer");
const authCheck = require('../middleware/auth-check');
const asyncHandler = require('express-async-handler');

//NOTE: authcheck should eventually be added for the token to work and login/signout

const getAllCarts = asyncHandler(async(req, res) => {
    const carts = await Cart.find()

    if (!carts?.length) {
        return res.status(400).json({message: "No cart found"})
    }

    res.json(carts)
})

const createCart = asyncHandler(async(req, res) => {
    const { products, quantity} = req.body
    const customer = await Customer.findOne({_id: req.user._id})

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