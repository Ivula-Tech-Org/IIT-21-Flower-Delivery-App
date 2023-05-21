import { postUser } from "../models/userModel";
import express from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const postLocation = express.Router()

postLocation.post('/',async(req,res)=>{
    const clientDetails = jwt.decode(req.user.token)
    delete clientDetails.exp;
    delete clientDetails.iat;
    // console.log('lat',req.query.lat)
    // console.log('lat',clientDetails._id)

    try{
        const userRes = await postUser.updateOne({_id:clientDetails._id},{$set:{location:req.query}})
        clientDetails.location = req.query
        let token = jwt.sign(clientDetails, process.env.JWT_ENC_KEY,{expiresIn:"3d"})
        res.status(200).json({token:token})

    }catch(err){
        res.status(404).json({token:'something went wrong'})
        console.log(err)
    }
})


export default postLocation