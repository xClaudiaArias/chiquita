const Cart = require("../models/Cart");
const asyncHandler = require('express-async-handler');

// get all cart products 
const getCart = asyncHandler(async(req, res) => {
    try {
        const customerId = req.customer.customerId
        const cart = await Cart.findOne({ customer: customerId }).populate('items.product')
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

// add item to cart 
const addToCart = asyncHandler(async(req, res) => {
    try {
        const { productId, quantity } = req.body
        const customerId = req.customer.customerId

        let cart = await Cart.findOne({ customer: customerId })
        if (!cart) { // create a new cart if no cart found
            cart = new Cart({ customer: customerId, items: [] })
        }
        const existingItemIndex = cart.items.findIndex(item => {
            item.product.toString() === productId
        })

        if (existingItemIndex !== -1) {
            // if item already exists in cart, update quantity
            cart.items[existingItemIndex].quantity += quantity
        } else {
            // otherwise, add new item to cart
            cart.items.push({ product: productId, quantity })
        }

        await cart.save();
        res.status(201).json({ message: 'Item added to cart successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

// remove item from card 
const removeFromCart = asyncHandler(async(req, res) => {
    try {
        const { productId } = req.params.productId
        const customerId = req.customer.customerId

        const cart = await Cart.findOne({ customer: customerId})
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" })
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId)
        await cart.save()
        res.status(200).json({ message: 'Item removed from cart succesfully' })

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = {
    getCart,
    addToCart,
    removeFromCart
}