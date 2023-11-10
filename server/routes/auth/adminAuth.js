const express = require("express")
const Admin = require('../../models/Admin');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
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
    const { username, password } = req.body

    // make sure fields are not empty 
    if (!username || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }
    // find username 
    const admin = await Admin.findOne({ username }).lean().exec()
    // make sure password is correct 
    if (password === admin.password) {
        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
        }
        res.send("Welcome admin")
    } 

    // jwt token 
    if (admin) {
        const accessToken = jwt.sign(
            {admin_id: admin._id, username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "2h"}
        );
        admin.token = accessToken;

        // 🔴 SEND USER TO Dashboard
        res.send("welcome admin")
        // res.status(200).json(admin)    
    } else {
        res.status(400).json({message: "Invalid admin data received"})
    }
}));

// REGISTER 

router.get("/register", asyncHandler(async(req, res) => {
    // get the register file 
    res.send("GET REGISTER FILE")
}));

router.post("/register", asyncHandler(async(req, res) => {
    const { firstname, lastname, email, username, password } = req.body

    if (!firstname || !lastname || !email || !username || !password ) {
        res.status(400).json({message: "Fields can not be empty."})
    }

    // check if duplicate email / username 

    const adminUsernameDuplicate = await Admin.findOne({ username }).lean().exec()

    if (adminUsernameDuplicate) {
        res.send("Can't let you in.")
    }

    const adminEmailDuplicate = await Admin.findOne({ email }).exec.lean()

    if (adminEmailDuplicate) {
        res.send("Can't let you in.")
    }

    const hashedPwd = await bcrypt.hash(password, 10) 
    // create admin obj
    const adminObj = {firstname, lastname, email, username, "password": hashedPwd}

    // add admin to database 
    const admin = await  Admin.create(adminObj)

    // 🔴🔴🔴🔴 send admin to login here 

    res.json({"message": `Admin ${admin.firstname} ${admin.lastname} has been added.`})

}));




module.exports = router;