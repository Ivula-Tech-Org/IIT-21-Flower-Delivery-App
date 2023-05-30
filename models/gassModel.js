import mongoose from 'mongoose'

const gassModel = mongoose.Schema({
    gasName: {
        type: String,
        required: true,
        ref:'Categories',
    },
    gassStationName:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'GassStation',
        cascade:'delete'
    },
    gasService:{
        type:String,
        required:true
    },
    gasPrice: {
        type: String,
        required: true
    },
    weightRange: {
        type:[{
            base: Number,
            largest: Number
        }],
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    gassImage:{
        type:String,
        required:true
    }

})

const gass = mongoose.model("Gass", gassModel)

export default gass