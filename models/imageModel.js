import mongoose  from "mongoose";

const imageModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

const getImages = mongoose.model('Image', imageModel)
export default getImages