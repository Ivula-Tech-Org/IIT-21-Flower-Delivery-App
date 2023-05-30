import mongoose from "mongoose";

const gassStationModel = mongoose.Schema({
    stationOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contractors",
        cascade:'delete',
        required:true
    },
    stationName: {
        type: String,
        required: true
    },
    stationRating: {
        type: Number,
        required: true,
        default: 3
    },
    stationLocation: {
        lat:{
            type:String,
            required:true
        }
        ,
        long:{
            type:String,
            required:true
        }
    },
    gasCategories: {
        type: [String],
        required: true,
        default: []
    },
    stationImage: {
        type: String,
        required: true,
        default:''
    }, 
    town:{
        type:String,
        required:true
    },
    estDel:{
        type:String,
        required:true
    }
})

const gassStations = mongoose.model("GassStation", gassStationModel)
export  {gassStations}
