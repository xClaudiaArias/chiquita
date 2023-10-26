const Shipment = require("../models/Shipment");
const asyncHandler = require('express-async-handler');

const getAllShipments = asyncHandler(async(req, res) => {
    const shipments = await Shipment.find()

    if (!shipments?.length) {
        return res.status(400).json({message: "There are no shipments."})
    }

    res.json(shipments)
})

const createShipment = asyncHandler(async(req, res) => {
    const { customer, street, street2,  city,  state, zipcode} = req.body

    if (!customer || !street || !street2 || !city || !state || !zipcode) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const shipmentObj = {  customer, street, street2, city, state, zipcode}

    const shipment = await Shipment.create(shipmentObj)

    res.json({message: `Shipment created`})
})

const updateShipment = asyncHandler(async(req, res) => {
    const {id, street, street2, city, state, zipcode, customer} = req.body

    if (!id || !street || !street2 || !city || !state || !zipcode || !customer) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const shipment = await Shipment.findById(id).lean().exec()

    if (!shipment) {
        return res.status(400).json({message: "No shipment found."})
    }

    shipment.street = street
    shipment.street2 = street2
    shipment.city = city
    shipment.state = state
    shipment.zipcode = zipcode


    const updatedShipment = await shipment.save()

    res.json({message: `${updatedShipment.customer}'s shipment updated.`})
})

const deleteShipment = asyncHandler(async(req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({message: "Shipment id is required"})
    }

    const  shipment = await Shipment.findById(id).exec()

    if (!shipment) {
        return res.status(400).json({message: "No shipment found."})
    }

    const deletedShipment = await shipment.deleteOne()

    res.json({message: `Shipment with ID ${deleteShipment.id} deleted.`})
})

module.exports = {
    getAllShipments,
    createShipment,
    updateShipment,
    deleteShipment
}