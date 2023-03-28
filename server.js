import express from 'express';
import loginMiddleware from './services/authentication/loginMiddleware.js';
const app = express();


app.get('/',(req,res)=>{
    res.send('This is the Login page ')
})
app.use(loginMiddleware)
app.get('/home',(req,res)=>{
    res.send("This is the home page")
})
app.get('/profile',(req,res)=>{
    res.send("This is the profile page")
})
app.listen(8000, ()=>{
    console.log('The server is listening at a port ')
})
