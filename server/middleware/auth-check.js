const jwt = require('jsonwebtoken')

const authCheck = async(req, res, next) => {
    const token = req.header('auth-token')
    console.log(token, ' tokn')
    if(!token) {
        res.status(401).send({errors: "No token found."})
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            console.log(data, ' --data middlware')
            req.customer = { customerId: data.customerId }
            console.log(req.customer, " ---req.customer")
            next()
        } catch (error) {
            console.log("Error verifying token: ", error)
            res.status(401).send({message: "Error: please use valid token." })
        }
    }


}

module.exports = authCheck