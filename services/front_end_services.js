import express from 'express'


const front_end_service = express.Router();

export default front_end_service.get('/', async(req,res)=>{
    res.send('This is the front end services');
})
