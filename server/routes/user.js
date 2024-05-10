const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/auth-check")

router.route('/stats')
    .get(verifyTokenAndAdmin, userController.userStats)   // stats by month


router.route('/')
    .get(verifyTokenAndAdmin, userController.getUsers) // read

router.route('/:id')
    .get(verifyTokenAndAdmin, userController.findUserById) // find by id
    .patch(verifyTokenAndAuthorization, userController.updateUser) // update
    .delete(verifyTokenAndAuthorization, userController.deleteUser) // delete



module.exports = router