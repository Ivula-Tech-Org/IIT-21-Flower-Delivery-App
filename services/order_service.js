import express, { query } from "express";
import orders from "./../models/ordersModel.js";
import { logDate } from "./../globals/globals.js";
const orderService = express.Router();

orderService.get("/", async (req, res) => {
    console.log('get request', req.query)
  try {
    const { requester,forWho } = req.query;
    if (requester) {
        
      if (forWho == "contractor") {
        const getOrders = await orders.find({ contID: requester._id });
        res.status(200).json(getOrders);
        console.log(getOrders)
      } else if (forWho == "user") {
        const getOrders = await orders.find({ clientID: requester._id });
        res.status(200).json(getOrders);
        console.log(getOrders)
      } else {
        res
          .status(404)
          .json({ message: "Sorry, your request could not be handled" });
      }
    } else {

      res
        .status(404)
        .json({ message: "Sorry server could not action your request" });
    }
    } catch (error) {
    res.status(404).json({ message: "invalid request" });
  }
});
orderService.post("/", async (req, res) => {
    console.log('this is a request',req.query.cartItems)
  try {
    const cartList = req.query.cartItems;
    try {
      cartList.forEach(async (elem) => {
        const castOrder = new orders({
          clientID: elem.client,
          contID: elem.station,
          orderStatus: {
            level: "Order",
            done: true,
          },
          item: elem.item,
          name: elem.name,
          town: elem.town,
          price: elem.price,
          size: elem.size,
          estTime: elem.estTime,
          location: {
            lat: elem.location.lat,
            long: elem.location.long,
          },
          image: elem.image,
          service: elem.service,
        });
        // console.log(elem.location.long)
        const castedOrder = await castOrder.save();
      });
      console.log('here msee')
      res.status(200).json({message:'success'})
      console.log('here bro, we wacah')

    } catch (err) {
      res
        .status(200)
        .json({
          message: "an error occured saving your order, try gain later",
        });
    }
  } catch (err) {
    console.log("im hrer ea", err);
    res.status(404).json({ message: "not found" });
  }
});

export default orderService;
