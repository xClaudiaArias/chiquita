import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    holderName: {
        type: String,
        required: true
    },
    cardNum: {
        type: String,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    },
    exp_date: {
        type: Date,
        required: true
    },
    processed: {
        type: Boolean,
        default: false
    }
    },
    {timestamps : true}
)

export default mongoose.model('Card', cardSchema)