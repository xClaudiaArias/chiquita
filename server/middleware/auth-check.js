const authCheck = (req, res, next) => {
    console.log(req.session, " :req.session")
    next()


    // if(req.session && req.session.user) {
    //     res.redirect('/')
    // } else {
    //     next()
    // }
}

module.exports = authCheck