const Billing = require('../models/Billing');
const asyncHandler = require('express-async-handler');

const getBilling = asyncHandler(async(req, res) => {
    const billings = await Billing.find()

    if (!billings?.length) {
        return res.status(400).json({message: "No billings found"})
    }

    res.json(billings)
})

const createBilling = asyncHandler(async(req, res) => {
    const {street, street2, city, state, zipcode, customer} = req.body

    if (!street || !street2 || !city || !state || !zipcode || !customer) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const billingObj = {street, street2, city, state, zipcode, customer}

    const billing = Billing.create(billingObj)

    res.json({message: "New billing created."})
})

const updateBilling = asyncHandler(async(req, res) => {
    const {id, street, street2, city, state, zipcode, customer} = req.body

    if (!id || !street || !street2 || !city || !state || !zipcode || !customer) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const billing = await Billing.findById(id).exec()

    if (!billing) {
        return res.status(400).json({message: "No billing found."})
    }

    billing.street = street
    billing.street2 = street2
    billing.city = city
    billing.state = state
    billing.zipcode = zipcode


    const updatedBilling = await billing.save()

    res.json({message: `${updatedBilling.customer}'s billing updated.`})
})

const deleteBilling = asyncHandler(async(req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({message: "Billing id is required"})
    }

    const  billing = await Billing.findById(id).exec()

    if (!billing) {
        return res.status(400).json({message: "No billing found."})
    }

    const deletedBilling = await billing.deleteOne()

    res.json({message: "Billing deleted."})
})


module.exports = {
    getBilling,
    createBilling,
    updateBilling,
    deleteBilling
}
