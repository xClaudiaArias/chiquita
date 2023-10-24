const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");


router.route("/")
    .get(orderItemController.getAllOrderItems)
    .post(orderItemController.createNewOrderItem)
    .patch(orderItemController.updateOrderItem)
    .delete(orderItemController.deleteOrderItem)

module.exports = router