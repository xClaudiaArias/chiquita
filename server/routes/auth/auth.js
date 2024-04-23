const express = require("express")
const Customer = require('../../models/Customer');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


// LOGIN 

router.post("/login", asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password ) {
            res.status(400).json({message: "Fields can not be empty."})
        }

        const customer = await Customer.findOne({ username })

        if (!customer) {
            return res.status(400).json({error: 'No customer found'})
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: "Invalid credentials"})
        } 

        const token = jwt.sign({customerId: customer._id}, process.env.JWT_SECRET, {
            expiresIn: '2h'})
        
        res.json({
            success: true,
            message: "User logged in",
            token
        })
        
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
}));

// REGISTER 

router.post("/register", asyncHandler(async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body

    if (!firstname || !lastname || !email || !username || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }

    const customerUsernameDuplicate = await Customer.findOne({ username })

    if (customerUsernameDuplicate) {
        res.send("Can't let you in.")
    }

    const hashedPwd = await bcrypt.hash(password, 10) 
    
    // create customer obj
    const customerObj = {firstname, lastname, email, username, "password": hashedPwd}

    // add customer to database 
    const customer = await Customer.create(customerObj)

    // 🔴🔴🔴🔴 send customer to login here 
    const token = jwt.sign({customerId: customer._id}, process.env.JWT_SECRET, {
        expiresIn: '2h'})

    res.json({
        success: true,
        message: `customer ${customer.firstname} ${customer.lastname} has been added.`,
        token
    })

}));


module.exports = router;