import express, { Router } from "express";
import cors from "cors";
import auth_service from "./services/auth_service.js";
import front_end_services from "./services/front_end_services.js";
import update_service from "./services/update_service.js";
import envConfig from "dotenv";
import { logDate } from "./globals/globals.js";
import connectDB from "./globals/dbConnection.js";
import validation from "./globals/validatejwt.js";
import { Server } from "socket.io";
import http from "http";
import { userCount } from "./globals/globals.js";
import chatService from "./services/chat_service.js";
import notifyService from "./services/notification_service.js";
import socketioJwt from "socketio-jwt";
import orderService from "./services/order_service.js";
import bodyParser from "body-parser";
import postLocation from "./services/post_location.js";
let userCounter = 0;

envConfig.config();
const PORT = process.env.PORT;
const app = express();
const router = express.Router();
const chat_service = new chatService();
const notify_service = new notifyService();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const testLog = (served) => {
  console.log(served);
};
//middlewares
app.use(process.env.AUTH_SERVICE_URL, auth_service);
app.use(process.env.FRONT_END_SERVICE, validation, front_end_services);
app.use(process.env.UPDT_SERVICE_URL, validation, update_service);
app.use(process.env.ORDERS_SERVICE_URL, validation, orderService);
app.use(process.env.GET_LOCATION, validation, postLocation);
app.use(process.env.GET_FORGOT, (req, res)=>{
  res.send('handle forgot password in mail')
});

connectDB();

//socket server
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
io.use((socket, next) => {
  console.log("authentication here");
  next();
});

io.on("connection", (socket, data) => {
  userCounter = userCount("connected", userCounter);
  console.log(
    `${logDate} | Server Logs |Chat Service | status : Healthy | connection added, total : ${userCounter}`
  );

  //Chat servicesj
  socket.on("join_room", (room) => {
    console.log('someone joined room')
    socket.join(room);
  });
  socket.on("ret_message", async (data) => {
    try {
      let roomData = await chat_service.getMessage(data);
      io.to(data.room).emit("ret_message", roomData.messages);
    } catch (err) {
      console.log("error : ", err);
    }
  });
  socket.on("send_message", async (data) => {
    const emitData = await chat_service.postMessage(data)
    socket.emit("recieve_message", emitData);
  });

  socket.on("typing",(data)=>{
    console.log('typing')
    io.to(data.room).emit("typing", true)
  })
  //Notification service
  socket.on("notify_room", async (data) => {
    let roomData = await notify_service.getMessage(data);
    socket.join(roomData.roomID);

    socket.emit("all_messages", roomData.messages);
  });
  socket.on("notify_all", (data) => {
    socket.broadcast.emit("notify_all", { notification: data.notification });
  });
  socket.on("disconnect", () => {
    userCounter = userCount("disconnected", userCounter);
    console.log(
      `${logDate} | Server Logs |Chat Service | status : Healthy | connection terminated, total : ${userCounter}`
    );
  });
});

app.get("/liveProb", (req, res) => {
  res.json({ title: "Server Live Prob", status: "live" });
  console.log(
    `${logDate} | Service Request | status ${res.statusCode} : ${res.statusMessage} | live prob`
  );
});
app.use(express.static("pages"));

try {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(
      `${logDate} | Server Logs | Server Connections | Server Listening | PORT ${PORT}`
    );
  });
} catch (err) {
  console.log(
    `${logDate} | Server Logs | Server Connections | Server Could not start | Error :  ${err}`
  );
}
