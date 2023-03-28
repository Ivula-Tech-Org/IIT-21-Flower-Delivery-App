import express from 'express';


const auth_service = express.Router()

auth_service.get('/',async(req,res)=>{
    res.send('Hit the auth_service');
    console.log('Hit hot service too');
})

export default auth_service;