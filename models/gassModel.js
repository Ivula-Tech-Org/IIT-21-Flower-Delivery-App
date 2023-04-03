import mongoose from 'mongoose'

const gassModel = mongoose.Schema({
    gasName: {
        type: String,
        required: true,
    },
    gasPrice: {
        type: String,
        required: true
    },
    weightRange: {
        type: {
            base: Number,
            largest: Number
        },
        default: { base: 0, largest: 0 },
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    }

})

const gass = mongoose.model("Gas", gassModel)

export default gass