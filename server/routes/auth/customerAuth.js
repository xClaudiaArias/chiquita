const express = require("express")
const Customer = require('../../models/Customer');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const session = require("express-session");



// LOGIN 

router.get("/login", asyncHandler(async(req, res) => {
    // this is the route to get the file to login 
    res.send("This is a test");
}));

router.post("/login", asyncHandler(async(req, res) => {
    const { email, password } = req.body

    // make sure fields are not empty 
    if (!email || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }
    // find email 
    const customer = await Customer.findOne({ email }).lean().exec()
    // make sure password is correct 

    if (password === customer.password) {
        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        res.send("Welcome customer")
    } 

    // jwt token 
    if (customer) {
        const accessToken = jwt.sign(
            {customer_id: customer._id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "2h"}
        );
        customer.token = accessToken;

        // 🔴 SEND USER TO Dashboard
        
        // res.status(200).json(customer) 
        console.log(customer)
        res.send('Welcome customer')   
    } else {
        res.status(400).json({message: "Invalid customer data received"})
    }
}));

// REGISTER 

router.get("/register", asyncHandler(async(req, res) => {
    // this is the route to get the file to register 
    res.send("GET REGISTER FILE")
}));

router.post("/register", asyncHandler(async(req, res) => {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }

    // check if duplicate email 

    const customerEmailDuplicate = await Customer.findOne({ email }).exec.lean()

    if (customerEmailDuplicate) {
        res.send("Can't let you in.")
    }

    const hashedPwd = await bcrypt.hash(password, 10) 
    
    // create customer obj
    const customerObj = {firstname, lastname, email, "password": hashedPwd}

    // add customer to database 
    const customer = await Customer.create(customerObj)

    // 🔴🔴🔴🔴 send customer to login here 

    res.json({"message": `customer ${customer.firstname} ${customer.lastname} has been added.`})

}));




module.exports = router;