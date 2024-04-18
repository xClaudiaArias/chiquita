const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.route("/")
    .get(cartController.getCart)
    .post(cartController.addToCart)

router.route("/:productId")
    .delete(cartController.removeFromCart)


module.exports = router