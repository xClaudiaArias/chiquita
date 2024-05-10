const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js")


const updateUser = asyncHandler(async (req, res) => {
    // get inputs from req.body 
    const { id } = req.params
    const { firstname, lastname, email, username } = req.body

    // assign user object to to variable user 
    const user = await User.findById(id)

    // return error if there is no user  
    if(!user) {
        return res.status(400).json({message: "user not found"})
    }

    // checks if there are duplicates with same username 
    const duplicate = await User.findOne({ username })

    // if so, return error message 
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate email"})
    }

    // if no duplicate, update user's information
    user.firstname = firstname || user.firstname
    user.lastname = lastname || user.lastname
    user.email = email || user.email
    user.username = username || user.password

    // encrypt password 
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    } // encrypt password

    // save updated user 
    const updatedUser = await user.save()

    res.status(200).json({updatedUser})
})


const deleteUser = asyncHandler(async (req, res) => {
    // get id from body
    const { id } = req.params
    
    // check if is input 
    if (!id) {
        return res.status(400).json({message: "User id is required"})
    }

    // find user with id 
    const user = await User.findById(id)

    // return error message if user does not exist
    if (!user) {
        return res.status(400).json({message: "User not found"})
    } 

    // delete user 
    const deletedUser = await user.deleteOne()

    // return response 
    const response = `User ${deletedUser.firstname} with ID ${deletedUser.id} deleted`

    res.json(response)
})

// find user by id || only admin can use this route
const findUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch(error) {
        res.status(500).json(error)
    }
})

// get all new users
const getUsers = asyncHandler(async (req, res) => {
    const query = req.query.new

    try {
        const users = query ? await User.find().sort({_id: -1}).limit(8) : await User.find().select('-password').lean()
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json(error)
    }
})


// user stats per month 

const userStats = asyncHandler(async (req, res) => {
    // how many users per month 
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    console.log(date, lastYear)
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } }, //condition
            {
                $project: {
                    month: {
                        $month: "$createdAt" //take month number in created at
                    }
                }
            },
            { 
                $group:{
                _id: "$month", // groups by month
                total: {$sum: 1} // sums every register user
                }
            },
        ])

        console.log(data, " data")
        res.status(200).json(data)
    } catch(error) {
        consol.log(error, " error")
        res.status(500).json(error)
    }
})


module.exports = {
    getUsers,
    userStats,
    findUserById,
    updateUser,
    deleteUser
}