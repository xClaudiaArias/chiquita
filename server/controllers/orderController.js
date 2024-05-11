const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')

// GET ALL ORDERS  
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    if (!orders?.length) {
        return res.status(400).json({message: "No orders found"})
    }
    res.status(200).json(orders)
})

// GET ORDER BY USER ID
const getOrderByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params
    try {
        const order = await Order.find({ userId: userId })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE ORDER 
const createNewOrder = asyncHandler(async (req, res) => {
    const { user, products, amount, address } = req.body

    if (!user || !products || products.length === 0 || !amount || !address) {
        return res.status(400).json({message: "All fields are required"})
    }

    const orderObject = { user, products, amount, address }

    const order = await Order.create(orderObject)

    res.json({message: `Order with ID ${order._id} created.`})

})

const updateOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        // get the order by id and update and save order 
        const order = await Order.findByIdAndUpdate(id, 
            {
                // update fields using set 
                $set: req.body
            }, 
            {
                new: true
            }
        )
        // return order object as json
        res.status(200).json(order) 
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Order.findByIdAndDelete(id)
        res.status(200).json("Order has been deleted")
    } catch(error) {
        res.status(500).json(err)
    }
})

// get income 
const getIncome = asyncHandler( async(req, res) => {
    // get current date 
    const date = new Date();
    // get last month (one month before current month)
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    // get month before last month
    const prevMonth = new Date( new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([ 
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month", 
                    total: {
                        $sum: "$sales"
                    }
                }
            }
        ])

        res.status(200).json(income)
    } catch(error) {
        res.status(500).json(error)
    }
})

module.exports = {
    getAllOrders,
    getOrderByUserId,
    createNewOrder,
    updateOrder,
    deleteOrder,
    getIncome 
}