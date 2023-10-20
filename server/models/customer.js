import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        address: {
            street1: {
                type: String,
                required: false
            },
            street2: {
                type: String,
                required: false
            },
            town_city: {
                type: String,
                required: false
            },
            state: {
                type: String,
                required: false
            },
            zipcode: {
                type: String,
                required: false
            },
            country: {
                type: String,
                required: false
            }
        },
        active: {
            type: Boolean,
            default: true
        },
        phone: {
            type: String,
            required: false
        }
    },
    { timestamps : true }
)

export default mongoose.model('Customer', customerSchema)