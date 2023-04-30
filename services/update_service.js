import express from "express";
const update_service = express.Router()

update_service.get('/',(req,res)=>{
    console.log('update or delete user account')
    res.send("update or delete user account")
})

export default update_service