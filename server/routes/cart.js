const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middleware/auth-check")

router.route("/")
    .get(verifyTokenAndAdmin, cartController.getCart)
    .post(verifyToken, cartController.createCart);

router.route("/:id")
    .patch(verifyTokenAndAuthorization, cartController.updateCart)
    .delete(verifyTokenAndAuthorization, cartController.deleteCart);

router.route("/find/:userId")
    .get(verifyTokenAndAuthorization, cartController.getCartById);

module.exports = router






module.exports = router;
