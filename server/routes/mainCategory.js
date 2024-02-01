const express = require('express');
const router = express.Router();
const mainCategoryController = require('../controllers/mainCategoryController');


router.route('/')
    .get(mainCategoryController.getAllMainCategories) // read
    .post(mainCategoryController.createMainCategory) // create
    .patch(mainCategoryController.updateMainCategory) // update
    .delete(mainCategoryController.deleteMainCategory) // delete

module.exports = router