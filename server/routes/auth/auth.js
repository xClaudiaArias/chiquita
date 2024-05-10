const express = require("express")
const User = require('../../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js")
const router = express.Router();


// REGISTER
router.post("/register", asyncHandler(async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if required fields are empty
    if (!firstname || !lastname || !email || !username || !password ) {
        return res.status(400).json({ message: "Fields can not be empty." });
    }

    // Check if username is already taken
    const userUsernameDuplicate = await User.findOne({ username });
    if (userUsernameDuplicate) {
        return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password
    const hashedPwd = await CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString() //secure hashed pswd - encrypt

    // Create a user object
    const userObj = { firstname, lastname, email, username, password: hashedPwd };

    // Add user to database
    const user = await User.create(userObj);

    const responseUser = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username
    };

    res.status(200).json({
        success: true,
        user: responseUser,
        message: `User ${user.firstname} ${user.lastname} has been registered.`,
    });
}));


// LOGIN
router.post("/login", asyncHandler(async (req, res) => {
    try {
        // Check if username or password is missing
        if (!req.body.username || !req.body.password ) {
            return res.status(400).json({ message: "Fields can not be empty." });
        }

        // Find user by username
        const user = await User.findOne({ username: req.body.username });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        // Check if password is correct
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8)
        
        console.log(hashedPassword, " -hashedPassword")
        console.log(req.body.password, " -req.body.password")

        if (hashedPassword !== req.body.password) {
            return res.status(401).json({ error: 'Password is wrong' });
        }
        
        // Get the password from the request body
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, {
            expiresIn: "3d"
        });


        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})
    } catch (error) {
        console.log(error, " error")
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));



module.exports = router;