import express from "express";
import jwt from "jsonwebtoken";
import contractors from "../models/contractorModel.js";
import { postUser } from "../models/userModel.js";
import { logDate } from "./../globals/globals.js";
import dotenv from "dotenv";
import { Types } from "mongoose";
import orders from "../models/ordersModel.js";

dotenv.config();
const accountUpdateService = express.Router();

const jwtConfig = (payload, key) => {
  let token = jwt.sign(payload, key);
  return token;
};

// Endpoint to update a user and orders
accountUpdateService.post("/", async (req, res, next) => {
  try {
    const { userName, password, userEmail, phoneNumber, type } = req.query;

    // Check if required parameters are provided
    if (userName && password && userEmail && phoneNumber && type) {
      // Check if user exists in the database
      let userExists;
      if (type === "contractor") {
        userExists = await contractors.findOne({ contEmail: userEmail });
      } else {
        userExists = await postUser.findOne({ userEmail: userEmail });
      }

      if (userExists) {
        // User already exists in the database, update their details
        const userID = jwt.decode(req.user.token)._id;
        const update = await postUser.updateOne(
          { _id: ObjectId(userID) },
          {
            $set: {
              userName: userName,
              password: password,
              userEmail: userEmail,
              phoneNumber: phoneNumber,
            },
          }
        );

        let token = jwt.sign(update.toObject(), process.env.JWT_ENC_KEY, {
          expiresIn: "3d",
        });
        res.status(200).json({ token: token });
        console.log(
          `${logDate} | Authentication Service | User Update Request | status ${
            res.statusCode
          } : ${(res.statusMessage = 200
            ? "Success"
            : res.statusMessage)} | userName : ${userName} userEmail ${userEmail} userPhone : ${phoneNumber}`
        );
      }
    } else {
      res
        .status(400)
        .json({ token: "Request failed: please provide all required fields" });
      console.error(
        `${logDate} | Authentication Service | User Creation/Update Request | status ${res.statusCode} : ${res.statusMessage} | User did not provide all required parameters`
      );
    }
  } catch (err) {
    res.status(500).json({ token: "Something went wrong, please try again" });
    console.error(
      `${logDate} | Authentication Service | User Creation/Update Request | status ${res.statusCode} : ${res.statusMessage} | ${err.message}`
    );
  }
});

accountUpdateService.post("/update_order", async (req, res) => {
  const { cartItems, method, to } = req.body;
  const OrderId = cartItems[0] ? cartItems[0]._id : cartItems._id;

  if (method == "update") {
    try {
      console.log("here is the car titems", OrderId);
      //now update here
      const filter = { _id: new Types.ObjectId(OrderId) };
      const update = { $set: { "orderStatus.level": to } };

      const updateOrder = await orders.updateOne(filter, update);
      console.log("heyo", updateOrder);
      res.status(200).json({ message: "update successful" });
    } catch (err) {
      console.log(err);
      res
        .status(404)
        .json({ message: "Something went wrong could not update" });
    }
  } else if (method == "cancel") {
    try {
      console.log("here is the car titems", OrderId);
      //now update here
      const filter = { _id: new Types.ObjectId(OrderId) };
      const update = {
        $set: { "orderStatus.level": to, "orderStatus.done": true },
      };

      const updateOrder = await orders.updateOne(filter, update);
      console.log("heyo", updateOrder);
      res.status(200).json({ message: "update successful" });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "" });
    }
  } else if ("done") {
    try {
      console.log("here is the car titems", OrderId);
      //now update here
      const filter = { _id: new Types.ObjectId(OrderId) };
      const update = {
        $set: { "orderStatus.level": to, "orderStatus.done": true },
      };

      const updateOrder = await orders.updateOne(filter, update);
      console.log("heyo", updateOrder);
      res.status(200).json({ message: "update successful" });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "" });
    }
  }
});

accountUpdateService.get("/", () => {
  console.log("hello_world");
});

//mike can you see what i'm tryping?
//yes babu
//try doing a get request, that is on postman
//or share the tab
//I dont know how to share that tab

export default accountUpdateService;

//anything?
