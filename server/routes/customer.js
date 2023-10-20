const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.route('/')
    .get(customerController.getAllCustomers) // read
    .post(customerController.createNewCustomer) // create
    .patch(customerController.updateCustomer) // update
    .delete(customerController.deleteCustomer) // delete

module.exports = router