const express = require("express")
const Customer = require('../../models/Customer');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


// LOGIN 

router.post("/login", asyncHandler(async(req, res) => {
    const { username, password } = req.body

    // make sure fields are not empty 
    if (!username || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }
    // find username 
    const customer = await Customer.findOne({ username })

    const comparePwd = (ct) => {
        if (!ct) {
            console.log(ct, " i am ct")
            res.status(401).json({message: "Invalid username"})
        } else {
            bcrypt.compare(customer.password, ct.password, (err, result) => {
                console.log(customer.password, ct.password)
                if (err) {
                    console.log(err, " -->err")
                } else {
                    const data = {
                        customer: {
                            _id: customer._id
                        }
                    }
                    console.log(result, " -->result")
                    const token = jwt.sign(data, "chiqui_secret")
                    res.json({
                        success: true,
                        message: "User logged in",
                        token
                    })
                }
            })
        }
    } 

    return comparePwd(customer)
}));

// REGISTER 

router.post("/register", asyncHandler(async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body

    if (!firstname || !lastname || !email || !username || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }

    // check if duplicate username 

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
    const data = {
        customer: {
            _id: customer._id
        }
    }

    const token = jwt.sign(data, "chiqui_secret")

    res.json({
        success: true,
        message: `customer ${customer.firstname} ${customer.lastname} has been added.`,
        token
    })

}));


module.exports = router;