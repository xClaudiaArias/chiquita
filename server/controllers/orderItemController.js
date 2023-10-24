const OrderItem = require('../models/OrderItem')
const asyncHandler = require('express-async-handler')


const getAllOrderItems = asyncHandler(async (req, res) => {
    const orderItems = await OrderItem.find().lean()
    if (!orderItems?.length) {
        return res.status(400).json({message: "No orderItems found"})
    }
    res.json(orderItems)
})


const createNewOrderItem = asyncHandler(async (req, res) => {
    const { quantity, price } = req.body

    if (!customer || !quantity || !price) {
        return res.status(400).json({message: "All fields are required"})
    }

    const orderItemObject = { quantity, price }

    const orderItem = await OrderItem.create(orderItemObject)

    res.json({message: `OrderItem with ID ${orderItem.id} created.`})

})

const updateOrderItem = asyncHandler(async (req, res) => {
    const { id, quantity, price } = req.body


    if (!id || !quantity || !price ) {
        return res.status(400).json({message: "All fields are required"})
    }

    const orderItem = await OrderItem.findById(id)

    if(!orderItem) {
        return res.status(400).json({message: "OrderItem Not Found"})
    }

    orderItem.quantity = quantity
    orderItem.price = price


    const updatedOrderItem = await orderItem.save()

    res.json({message: `${updatedOrderItem.id} updated`})
})


const deleteOrderItem = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({message: "OrderItem id is required"})
    }

    const orderItem = await OrderItem.findById(id)

    if (!orderItem) {
        return res.status(400).json({message: "orderItem not found"})
    } 

    const deletedOrderItem = await orderItem.deleteOne()

    const response = `OrderItem ${deletedOrderItem.id} deleted`

    res.json(response)
})

module.exports = {
    getAllOrderItems,
    createNewOrderItem,
    updateOrderItem,
    deleteOrderItem
}