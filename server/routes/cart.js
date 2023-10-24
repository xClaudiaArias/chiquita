const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");


router.route("/")
    .get(cartController.getAllCarts)
    .post(cartController.createCart)
    .patch(cartController.updateCart)
    .delete(cartController.deleteCart)

module.exports = router