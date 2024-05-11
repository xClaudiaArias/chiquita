const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middleware/auth-check")

router.route("/income")
    .get(verifyTokenAndAdmin, orderController.getIncome);

router.route("/find/:userId")
    .get(verifyTokenAndAuthorization, orderController.getOrderByUserId)

router.route("/:id")
    .patch(verifyTokenAndAdmin, orderController.updateOrder)
    .delete(verifyTokenAndAdmin, orderController.deleteOrder)

router.route("/")
    .get(verifyTokenAndAdmin, orderController.getAllOrders)
    .post(verifyToken, orderController.createNewOrder)


module.exports = router