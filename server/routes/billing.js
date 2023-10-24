const express = require("express")
const router = express.Router()
const billingController = require("../controllers/billingController")

router.route('/')
    .get(billingController.getBilling)
    .post(billingController.createBilling)
    .patch(billingController.updateBilling)
    .delete(billingController.deleteBilling)

module.exports = router