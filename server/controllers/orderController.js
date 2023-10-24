const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')


const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().lean()
    if (!orders?.length) {
        return res.status(400).json({message: "No orders found"})
    }
    res.json(orders)
})


const createNewOrder = asyncHandler(async (req, res) => {
    const { customer, payment, shipment, total } = req.body

    if (!customer || !payment || !shipment || !total) {
        return res.status(400).json({message: "All fields are required"})
    }

    const orderObject = { customer, payment, shipment, total }

    const order = await Order.create(orderObject)

    res.json({message: `Order with ID ${order.id} created.`})

})

const updateOrder = asyncHandler(async (req, res) => {
    const { id, customer, payment, shipment, total } = req.body


    if (!id || !customer || !payment || !shipment || !total ) {
        return res.status(400).json({message: "All fields are required"})
    }

    const order = await Order.findById(id)

    if(!order) {
        return res.status(400).json({message: "Order Not Found"})
    }

    order.total = total


    const updatedOrder = await order.save()

    res.json({message: `${updatedOrder.id} updated`})
})


const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({message: "Order id is required"})
    }

    const order = await Order.findById(id)

    if (!order) {
        return res.status(400).json({message: "order not found"})
    } 

    const deletedOrder = await order.deleteOne()

    const response = `Order ${deletedOrder.id} deleted`

    res.json(response)
})

module.exports = {
    getAllOrders,
    createNewOrder,
    updateOrder,
    deleteOrder
}