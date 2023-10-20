import express from 'express';
const router = express.Router();
import customerController from "../controllers/customerController.js";


router.route('/')
    .get(customerController.getAllCustomers) // read
    .post(customerController.createNewCustomer) // create
    .patch(customerController.updateCustomer) // update
    .delete(customerController.deleteCustomer) // delete

module.exports = router