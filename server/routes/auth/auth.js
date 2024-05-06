const express = require("express")
const Customer = require('../../models/Customer');
const Cart = require('../../models/Cart')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


// REGISTER
router.post("/register", asyncHandler(async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if required fields are empty
    if (!firstname || !lastname || !email || !username || !password ) {
        return res.status(400).json({ message: "Fields can not be empty." });
    }

    // Check if username is already taken
    const customerUsernameDuplicate = await Customer.findOne({ username });
    if (customerUsernameDuplicate) {
        return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create a customer object
    const customerObj = { firstname, lastname, email, username, password: hashedPwd };

    // Add customer to database
    const customer = await Customer.create(customerObj);

    // Generate JWT token
    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });

    // Create a cart for the customer
    // const cart = await Cart.create({ customer: customer._id, items: [] });

    res.json({
        success: true,
        message: `Customer ${customer.firstname} ${customer.lastname} has been registered.`,
        token
    });
}));

// LOGIN
// LOGIN
router.post("/login", asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username or password is missing
        if (!username || !password ) {
            return res.status(400).json({ message: "Fields can not be empty." });
        }

        // Find customer by username
        const customer = await Customer.findOne({ username });

        // Check if customer exists
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        // Find cart items associated with the customer
        // const cart = await Cart.findOne({ customer: customer._id }).populate('items.product');

        // Prepare cart products object
        // const cartProducts = {};
        // cart.items.forEach(item => {
        //     cartProducts[item.product._id] = item.quantity;
        // });

        res.json({
            success: true,
            message: "User logged in",
            token,
            cartProducts
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));



module.exports = router;