const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");


router.route("/")
    .get(shipmentController.getAllShipments)
    .post(shipmentController.createShipment)
    .patch(shipmentController.updateShipment)
    .delete(shipmentController.deleteShipment)

module.exports = router