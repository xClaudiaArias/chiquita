// order items
const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        currency: "USD",
        get: getPrice, 
        set: setPrice
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    }
})

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}


module.exports =  mongoose.model('OrderItem', orderItemSchema)