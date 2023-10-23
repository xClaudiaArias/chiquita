const Card = require('../models/Card');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')

const getCards = asyncHandler( async(req, res) => {
    const cards = await Card.find()

    if (!cards?.length) {
        return res.status(400).json({message: "There are no cards."})
    }

    res.json(cards)
})

const createNewCard = asyncHandler(async(req, res) => {
    const { customer, holderName, cardNum, cvv, exp_date} = req.body

    if (!customer || !holderName || !cardNum || !cvv || !exp_date) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const duplicateCardNum = await Card.findOne({ cardNum }).lean().exec()


    if (duplicateCardNum) {
        return res.status(409).json({message: 'An account with this email already exists'})
    }


    const hashedCvv = await bcrypt.hash(cvv, 10) 

    const cardObj = {  customer, holderName, cardNum, exp_date, "cvv": hashedCvv}

    const card = await Card.create(cardObj)

    res.json({message: `${card} created`})

})

const updateCard = asyncHandler( async(req, res) => {
    const { id, customer, holderName, cardNum, cvv, exp_date} = req.body

    if (!id || !customer || !holderName || !cardNum || !cvv || !exp_date ) {
        return res.status(400).json({message: "Field can't be empty."})
    }

    const card = await Card.findById(id).exec()

    if (!card) {
        return res.status(400).json({message: "Card not found."})
    }

    const hashedCvv = await bcrypt.hash(cvv, 10) 


    card.customer = customer
    card.holderName = holderName
    card.cardNum = cardNum
    card.cvv = hashedCvv
    card.exp_date = exp_date

    const updatedCard = await card.save()

    res.json({message: `Card updated.`})

})

const deleteCard = asyncHandler(async(req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({message: "ID is required to delete"})
    }

    // find card by id
    const card = await Card.findById(id).exec()

    // delete the found card 
    const deleteCard = await card.deleteOne()

    res.json({message: "Card succesfully deleted"})
})

module.exports = {
    getCards,
    createNewCard,
    updateCard,
    deleteCard
}