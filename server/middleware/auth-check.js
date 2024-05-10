const jwt = require("jsonwebtoken")

// verifies our token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    console.log(authHeader, " :authHeader")
    if (authHeader) {
        const token = authHeader.split(" ")[1] // get token after the word Bearer
        console.log(token, " :token")
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log(err, " --> err")
                res.status(403).json("Token is not valid")
            } 
            req.user = user
            next()
        })
    } else {
        console.log("No authHeader")
        return res.status(401).json("You are not authenticated")
    }
}


// only users and admins are authorized
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) { 
            console.log(req.user.id === req.params.id, " req.user.id === req.params.id verify&auth")
            console.log(req.user.id, req.params.id, " req.user.id, req.params.id verify&auth")
            next()
        } else {
            console.log("This is the error")
            res.status(403).json("You have not been authorized to make any changes.")
        }
    })
}

// only admins are authorized
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) { //check if user is admin
            console.log('User is admin')
            next() // proceed with the function
        } else {
            console.log(req.user, " :user is not admin")
            res.status(403).json("You are not an admin. You are not allowed to make changes.")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }