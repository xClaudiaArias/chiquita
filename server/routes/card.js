const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");


router.route("/")
    .get(cardController.getCards)
    .post(cardController.createNewCard)
    .patch(cardController.updateCard)
    .delete(cardController.deleteCard)

module.exports = router