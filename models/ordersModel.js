import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Contractors',
        cascade:'delete'
    },
    contID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        cascade:'delete'
    },
    orderStatus :{
        level:{
            type:String,
            required:true,
            default:"Order"
        },
        done:{
            type:Boolean,
            required:true
        },
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        required:true, 
        
    },
    name:{
        type:String, 
        require:true
    }, 
    town:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    estTime:{
        type:String,
        required:true
    },
    location:{
        lat:{
            type:String,
            requried:true
        },
        long:{
            type:String,
            required:true
        }
    },
    image:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

const orders = mongoose.model('Orders',ordersModel)
export default orders
