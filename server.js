import express from 'express';
import cors from 'cors'
import auth_service from './services/auth_service.js'
import front_end_services from './services/front_end_services.js';
import envConfig from 'dotenv'
import { logDate } from './globals/globals.js';
import connectDB from './globals/dbConnection.js';
import validation from './globals/validatejwt.js';
import {Server} from 'socket.io'
import http from 'http'

envConfig.config()

const PORT = process.env.PORT
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:"http://localhost:8000",
        methods:["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
console.log("connection ID : ", socket.id)

socket.on("disconnected", ()=>{
    console.log("disconnected : " + socket.io)
})
})


app.use(cors())
app.use(process.env.AUTH_SERVICE_URL,auth_service)
app.use(process.env.FRONT_END_SERVICE,front_end_services)


connectDB()


app.get('/liveProb',(req,res)=>{
    res.status(200).json({title:"Server Live Prob", status:"live"})
    console.log(`${logDate} | Service Request | status ${res.statusCode} : ${res.statusMessage} | live prob` )
})
app.use(express.static('pages'))

try{
server.listen(PORT, ()=>{
    console.log(`${logDate} | Server Logs | Server Connections | Server Listening | PORT ${PORT}`)
})
}catch(err){
    console.log(`${logDate} | Server Logs | Server Connections | Server Could not start | Error :  ${err}`)
}