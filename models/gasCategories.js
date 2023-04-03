import mongoose from "mongoose";

const gasCategoriesModel = mongoose.Schema({
    typeName:{
        type:String,
        required:true
    },
    typeImage:{
        type:String,
        required:true
    }
})