import mongoose from "mongoose";

const gassStationModeel = mongoose.Schema({
    stationName: {
        type: String,
        required: true
    },
    stationRating: {
        type: Number,
        required: true,
        default: 0
    },
    stationLocation: {
        type: {
            city: String,
            town: String
        },
        required: true
    },
    gasCategories: {
        type: [String],
        required: true,
        default: []
    },
    stationImage: {
        type: String,
        required: true
    }
})

const gassStations = mongoose.model("GassStation", gassStationModeel)
export default gassStations
