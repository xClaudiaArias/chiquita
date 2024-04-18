const jwt = require('jsonwebtoken')

const authCheck = async(req, res, next) => {
    const token = req.header('auth-token')

    if(!token) {
        res.status(401).send({errors: "Error: No token found."})
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            req.customer = data.customer
            // console.log(req.customer, data, 'req.customer data')
            next()
        } catch (error) {
            res.status(401).send({message: "Error: please use valid token." })
        }
    }


}

module.exports = authCheck