const Customer = require('../models/Customer')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find().select('-password').lean()
    if (!customers?.length) {
        return res.status(400).json({message: "No customers found"})
    }
    res.json(customers)
})


const createNewCustomer = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body

    if ( !firstname || !lastname || !email || !username || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const duplicateUsername = await Customer.findOne({ username })

    if (duplicateUsername) {
        return res.status(409).json({message: 'An account with this username already exists'})
    }

    const hashedPwd = await bcrypt.hash(password, 10) 

    const customerObject = { firstname, lastname, email, username, "password": hashedPwd}

    const customer = await Customer.create(customerObject)

    if (customer) {
        const accessToken = jwt.sign(
            {customer_id: customer._id, username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "2h"}
        );
    
        customer.token = accessToken;
    
        res.status(200).json(customer)    
    } else {
        res.status(400).json({message: "Invalid customer data received"})
    }

})

const updateCustomer = asyncHandler(async (req, res) => {
    const { id, firstname, lastname, email, username, password } = req.body


    if (!id || !firstname || !lastname || !username || !email ) {
        return res.status(400).json({message: "All fields are required"})
    }

    const customer = await Customer.findById(id)

    if(!customer) {
        return res.status(400).json({message: "Customer Not Found"})
    }

    const duplicate = await Customer.findOne({ username })

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate email"})
    }

    customer.firstname = firstname
    customer.lastname = lastname
    customer.email = email
    customer.username = username


    if (password) {
        customer.password = await bcrypt.hash(password, 10) 
    }

    const updatedCustomer = await customer.save()

    res.json({message: `${updatedCustomer.firstname} updated`})
})


const deleteCustomer = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({message: "Customer id is required"})
    }

    const customer = await Customer.findById(id)

    if (!customer) {
        return res.status(400).json({message: "Customer not found"})
    } 

    const deletedCustomer = await customer.deleteOne()

    const response = `User ${deletedCustomer.firstname} with ID ${deletedCustomer.id} deleted`

    res.json(response)
})

module.exports = {
    getAllCustomers,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
}