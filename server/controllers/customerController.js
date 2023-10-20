import Customer from "./models/customer.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

// @desc get all customers
// @route GET /customers
// @access Private

const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find().select('-password').lean()
    if (!customers?.length) {
        return res.status(400).json({message: "No customers found"})
    }
    res.json(customers)
})

// @desc create newall customers
// @route POST /customers
// @access Private

const createNewCustomer = asyncHandler(async (req, res) => {
    // const { firstname, lastname, username, email, password, phone } = req.body
    const { firstname, lastname, username, email, password } = req.body
    // confirm data 
    // if ( !firstname || !lastname || !username || !email || !password || !phone ) {
    if ( !firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    // check for duplicates 
    const duplicateUsername = await Customer.findOne({ username }).lean().exec()
    const duplicateEmail = await Customer.findOne({ email }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({message: 'An account with this username already exists'})
    }
    if (duplicateEmail) {
        return res.status(409).json({message: 'An account with this email already exists'})
    }

    // Hash password

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // define customer object

    // const customerObject = { firstname, lastname, email, username, "password": hashedPwd, phone }
    const customerObject = { firstname, lastname, email, username, "password": hashedPwd}
    // create and store the new customer

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

// @desc updatecustomers
// @route PATCH /customers
// @access Private

const updateCustomer = asyncHandler(async (req, res) => {
    const { id, firstname, lastname, username, email, password, phone, active } = req.body

    // confirm data
    if (!id || !firstname || !lastname || !username || !email || !phone || typeof active !== 'boolean') {
        return res.status(400).json({message: "All fields are required"})
    }

    const customer = await Customer.findById(id).exec()

    if(!customer) {
        return res.status(400).json({message: "Customer Not Found"})
    }

    const duplicate = await Customer.findOne({ username }).lean().exec()

    // Allow update to original customer
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate username"})
    }

    customer.firstname = firstname
    customer.lastname = lastname
    customer.email = email
    customer.username = username
    customer.phone = phone
    customer.active = active

    if (password) {
        // hash pwd 
        customer.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedCustomer = await customer.save()

    res.json({message: `${updatedCustomer.username} updated`})
})

// @desc PATCH customers
// @route POST /customers
// @access Private

const deleteCustomer = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({message: "Customer id is required"})
    }


    // define customer
    const customer = await Customer.findById(id).exec()

    if (!customer) {
        return res.status(400).json({message: "Customer not found"})
    } 

    const deletedCustomer = await customer.deleteOne()

    const response = `Username ${deletedCustomer.username} with ID ${deletedCustomer.id} deleted`

    res.json(response)
})

export default {
    getAllCustomers,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
}