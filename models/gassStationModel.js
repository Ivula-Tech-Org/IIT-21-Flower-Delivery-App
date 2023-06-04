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
    },
    phoneNumber:{
        type:String,
        required:true
    }
})

const gassStations = mongoose.model("GassStation", gassStationModel)
export  {gassStations}


// service: selected.service,
// item: selected._id,
// name:selected.name,
// image:selected.image,
// station: station._id,
// client: user._id,
// town: station.town,
// rating: station.stationRating,
// price: price ? price : selected.weightRange[0].price,
// size: size ? size : selected.weightRange[0].price,
// estTime : selected.deliveryTime,
// location : st