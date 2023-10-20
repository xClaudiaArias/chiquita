// order items
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Payment'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    total: {
        type: Number,
        required: true,
        get: getPrice, 
        set: setPrice
    }
    },
    {
        timestamps: true
    }
)

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports =  mongoose.model('Order', orderSchema)