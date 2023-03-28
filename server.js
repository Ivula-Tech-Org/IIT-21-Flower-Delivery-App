import express from 'express';
import auth_service from './services/auth_service.js'
import front_end_services from './services/front_end_services.js';
const app = express();

app.use('/auth_service',auth_service)
app.use('/front_end_service',front_end_services)
app.get('/',(req,res)=>{
    res.send('This is the Login page ')
})


app.listen(8000, ()=>{
    console.log('The server is listening at a port ')
})
