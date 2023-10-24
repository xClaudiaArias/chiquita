const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");


router.route("/")
    .get(wishlistController.getAllWishlists)
    .post(wishlistController.createWishlist)
    .patch(wishlistController.updateWishlist)
    .delete(wishlistController.deleteWishlist)

module.exports = router