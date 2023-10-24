const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.route('/')
    .get(categoryController.getAllCategories) // read
    .post(categoryController.createCategory) // create
    .patch(categoryController.updateCategory) // update
    .delete(categoryController.deleteCategory) // delete

module.exports = router