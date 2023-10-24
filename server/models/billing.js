// order items
const mongoose = require("mongoose")

const billingSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    street2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    },
    { timestamps: true }
)

module.exports =  mongoose.model('Billing', billingSchema)