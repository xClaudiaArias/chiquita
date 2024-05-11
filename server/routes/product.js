const { verifyTokenAndAdmin } = require("../middleware/auth-check")
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/")
    .get(productController.getAllProducts)
    .post(verifyTokenAndAdmin, productController.createProduct)

router.route("/:id") 
    .patch(verifyTokenAndAdmin, productController.updateProduct)
    .delete(verifyTokenAndAdmin, productController.deleteProduct)

router.route("/find/:id")
    .get(productController.getProductById)

module.exports = router