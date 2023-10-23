const Admin = require('../models/Admin')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await Admin.find().select('-password').lean()
    if (!admins?.length) {
        return res.status(400).json({message: "No admins found"})
    }
    res.json(admins)
})


const createNewAdmin = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body

    if ( !firstname || !lastname || !email || !username || !password) {
        return res.status(400).json({message: "All fields are required"})
    }


    const duplicateEmail = await Admin.findOne({ email }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({message: 'An account with this email already exists'})
    }

    const duplicateUsername = await Admin.findOne({ username }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({message: 'An account with this username already exists'})
    }



    const hashedPwd = await bcrypt.hash(password, 10) 

    const adminObject = { firstname, lastname, email, username, "password": hashedPwd}


    const admin = await Admin.create(adminObject)

    if (admin) {
        const accessToken = jwt.sign(
            {admin_id: admin._id, username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "2h"}
        );
    
        admin.token = accessToken;
    
        res.status(200).json(admin)    
    } else {
        res.status(400).json({message: "Invalid admin data received"})
    }

})

const updateAdmin = asyncHandler(async (req, res) => {
    const { id, firstname, lastname, email, username, password } = req.body


    if (!id || !firstname || !lastname || !username || !email ) {
        return res.status(400).json({message: "All fields are required"})
    }

    const admin = await Admin.findById(id).exec()

    if(!admin) {
        return res.status(400).json({message: "Admin Not Found"})
    }

    const duplicate = await Admin.findOne({ username }).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate username"})
    }

    admin.firstname = firstname
    admin.lastname = lastname
    admin.email = email


    if (password) {
        admin.password = await bcrypt.hash(password, 10) 
    }

    const updatedAdmin = await admin.save()

    res.json({message: `${updatedAdmin.firstname} updated`})
})


const deleteAdmin = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({message: "Admin id is required"})
    }

    const admin = await Admin.findById(id).exec()

    if (!admin) {
        return res.status(400).json({message: "admin not found"})
    } 

    const deletedAdmin = await admin.deleteOne()

    const response = `User ${deletedAdmin.firstname} with ID ${deletedAdmin.id} deleted`

    res.json(response)
})

module.exports = {
    getAllAdmins,
    createNewAdmin,
    updateAdmin,
    deleteAdmin
}