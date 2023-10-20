import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Card'
    },
    processed: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number,
        required: true,
        get: getPrice, 
        set: setPrice
    },
    },
    { timestamps: true}
)

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

export default mongoose.model('Payment', paymentSchema)