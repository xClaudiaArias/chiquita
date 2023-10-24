const Payment = require('../models/Payment')
const asyncHandler = require('express-async-handler')


const getAllPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find().lean()
    if (!payments?.length) {
        return res.status(400).json({message: "No payments found"})
    }
    res.json(payments)
})


const createNewPayment = asyncHandler(async (req, res) => {
    const { customer, card, total, processed } = req.body

    if (!customer || !card || !total || !processed) {
        return res.status(400).json({message: "All fields are required"})
    }

    const paymentObject = { customer, payment, shipment, total }

    const payment = await Payment.create(paymentObject)

    res.json({message: `payment with ID ${payment.id} created.`})

})

const updatePayment = asyncHandler(async (req, res) => {
    const { id, customer, card, total, processed } = req.body


    if (!id || !customer || !card || !total || !processed) {
        return res.status(400).json({message: "All fields are required"})
    }

    const payment = await Payment.findById(id)

    if(!payment) {
        return res.status(400).json({message: "payment Not Found"})
    }

    payment.total = total
    payment.processed = processed


    const updatedPayment = await payment.save()

    res.json({message: `${updatedPayment.id} updated`})
})


const deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({message: "Payment id is required"})
    }

    const payment = await Payment.findById(id)

    if (!payment) {
        return res.status(400).json({message: "payment not found"})
    } 

    const deletedPayment = await payment.deleteOne()

    const response = `payment ${deletedPayment.id} deleted`

    res.json(response)
})

module.exports = {
    getAllPayments,
    createNewPayment,
    updatePayment,
    deletePayment
}