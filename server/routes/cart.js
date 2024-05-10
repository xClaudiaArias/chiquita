const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authCheck = require("../middleware/auth-check"); 

router.route("/")
    .post(cartController.getCart);

router.route("/addToCart")
    .post(cartController.addToCart)

router.route("/:productId")
    .delete(cartController.removeFromCart)


module.exports = router






module.exports = router;
