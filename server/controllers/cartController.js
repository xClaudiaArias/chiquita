const Cart = require("../models/Cart");
const asyncHandler = require('express-async-handler');

// get cart 
const getCart = asyncHandler(async(req, res) => {
    try {
        let carts = await Cart.find()
        res.status(200).json(carts)
    } catch(error) {
        res.status(500).json(error)
    }
});

// get cart by id
const getCartById = asyncHandler(async(req, res) => {
    const { userId } = req.params 

    try {
        const cart = await Cart.findOne({ userId: userId})
        res.status(200).json(cart)
    } catch(error) {
        res.status(500).json(err)
    }
});

// create cart 
const createCart = asyncHandler(async(req, res) => {
    const cart = new Cart(req.body)

    try {
        const savedCart = await cart.save();
        res.status(200).json(savedCart)
    } catch  (err) {
        res.status(500).json(err)
    }
});

// update cart 
const updateCart = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params
        // get the cart by id and update and save cart 
        const cart = await Cart.findByIdAndUpdate(id, 
            {
                // update fields using set 
                $set: req.body
            }, 
            {
                new: true
            }
        )
        // return cart object as json
        res.status(200).json(cart) 
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

//delete cart 
const deleteCart = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        await Cart.findByIdAndDelete(id)
        res.status(200).json("Cart has been deleted")
    } catch(error) {
        res.status(500).json(err)
    }
});

module.exports = {
    getCart,
    getCartById,
    createCart,
    updateCart,
    deleteCart
}