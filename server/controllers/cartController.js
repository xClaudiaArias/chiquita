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

        console.log(cart, " in getCard in cartController")
        res.status(200).json(cart)
    } catch (error) {
        console.log("This is what's giving the error")
        res.status(500).json({ error: 'Internal server error' })
    }
})

// addToCart function
const addToCart = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log(req.customer)
        const { customerId } = req.customer;

        console.log(customerId, " customerIdin cartConroller")
        console.log(productId, quantity, " --> productId, quantity in cartController")

        let cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            cart = new Cart({ customer: customerId, items: [] });
        }

        console.log(cart, " cart iin vcardcontroller addtocart route")

        const existingItemIndex = await cart.items.findIndex(item => item.product.toString() === productId);

        console.log(existingItemIndex, " existingItemIndex in cartcontroller addtocart")
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity; // Update existing item quantity
        } else {
            cart.items.push({ product: productId, quantity }); // Add new item to cart
        }

        console.log(cart, " in addtoCart, new Cart saved")
        await cart.save();
        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.log("This is what's giving the error")
        res.status(500).json({ error: 'Internal server error' });
    }
});

// removeFromCart function
const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const customerId = req.customer.customerId;

        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId); // Remove item from cart
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    getCart,
    addToCart,
    removeFromCart
}