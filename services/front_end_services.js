import express from "express";
import { gassStations } from "../models/gassStationModel.js";
import { logDate } from "../globals/globals.js";
import jwt from "jsonwebtoken";
import gass from "../models/gassModel.js";
import json from "body-parser";
import Acc from "../models/accesoriesModel.js";
import gasCategories from "../models/gasCategories.js";
const front_end_service = express.Router();
import { Types } from "mongoose";
import getImages from "../models/imageModel.js";
front_end_service.get("/", async (req, res) => {
  //get gass stations for the home page
  const clientDetails = jwt.decode(req.user.token);
  try {
    const gasStationsData = await gassStations.find();
    res.status(200).json({ token: req.user.token, data: gasStationsData });
    console.log(
      `${logDate} | Front End Service | Gas Station Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | Request stations approved for : ${
        clientDetails.userName || clientDetails.contName
      } : ${clientDetails.userEmail || clientDetails.contEmail}`
    );
  } catch (err) {
    res.status(500).json({ token: "Internal server error, kindly try later" });
    console.log(
      `${logDate} | Front End Service | Gas Station Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | Request failed for : ${
        clientDetails.userName || clientDetails.contName
      } : ${clientDetails.userEmail || clientDetails.contEmail}`
    );
  }
});

front_end_service.get("/categories", async (req, res) => {
  //get gass categories for the home page
  const clientDetails = jwt.decode(req.user.token);
  try {
    const gasCategData = await gasCategories.find();
    res.status(200).json({ token: req.user.token, data: gasCategData });
    console.log(
      `${logDate} | Front End Service | Gas Categories Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | Request stations approved for : ${
        clientDetails.userName || clientDetails.contName
      } : ${clientDetails.userEmail || clientDetails.contEmail}`
    );
  } catch (err) {
    res.status(500).json({ token: "Internal server error, kindly try later" });
    console.log(
      `${logDate} | Front End Service | Gas Categories Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | Request failed for : ${
        clientDetails.userName || clientDetails.contName
      } : ${clientDetails.userEmail || clientDetails.contEmail}`
    );
  }
});

front_end_service.post("/addStation", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  const {
    stationOwner,
    estDel,
    stationName,
    phoneNumber,
    town,
    stationLocation,
    gasCategories,
    stationImage,
  } = req.query;
  if (stationOwner && stationName && stationLocation) {
    const postStation = new gassStations({
      stationOwner: stationOwner,
      stationName: stationName,
      stationLocation: stationLocation,
      gasCategories: gasCategories,
      stationImage: stationImage,
      estDel: estDel,
      town: town,
      phoneNumber: phoneNumber,
    });
    try {
      const savePostStation = (await postStation.save()).toObject();
      const clientDetails = jwt.decode(req.user.token);
      res.status(200).json({ token: req.user.token, data: savePostStation });
      console.log(
        `${logDate} | Front End Service | Gas Station Requests | status ${res.statusCode} : ${res.statusMessage} | Added Station Succesfuly for station name: ${stationName}`
      );
    } catch (err) {
      res.status(500).json({
        token: req.user.token,
        data: "Internal server Error, kindly try later",
      });
      console.error(
        console.log(err)
        `${logDate} | Front End Service | Gas Station Requests | status ${res.statusCode} : ${res.statusMessage} | Request Failed to get DB`
      );
    }
  } else {
    console.log(req.query);
    console.log("fields empty");
  }
});

front_end_service.get("/gasService", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  const { stationId } = req.query;
  console.log("queyr id is ", stationId);
  if (stationId) {
    try {
      const getGasService = await gass.find({ gassStationName: stationId });
      res.status(200).json({ token: req.user.token, data: getGasService });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Request Gass Services approved for : ${
          clientDetails.userName || clientDetails.contName
        }`
      );
    } catch (err) {
      res.status(501).json({
        token: req.user.token,
        data: "An error occured, kindly try again later",
      });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Get Service Failed for station name: ${
          clientDetails.userName || clientDetails.contName
        } : ${err}`
      );
    }
  } else {
    res
      .status(404)
      .json({ token: req.user.token, data: "Kindly provide all the fields" });
    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | User did not provide all the fields : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  }
});

front_end_service.get("/search", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  try {
    const getGasService = await gass.find();
    const getAccService = await Acc.find();

    res.status(200).json({ token: req.user.token, gass: getGasService, acc:getAccService });

    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | Request Gass Services approved for : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  } catch (err) {
    res.status(501).json({
      token: req.user.token,
      data: "An error occured, kindly try again later",
    });
    console.log('here is ithe error',err)
  }
});

front_end_service.get("/gasService/user_service", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  const stationId = clientDetails._id;
  console.log("queyr id is ", stationId);
  if (stationId) {
    try {
      const getGasService = await gassStations.findOne({
        stationOwner: new Types.ObjectId(stationId),
      });
      res.status(200).json({ token: req.user.token, data: getGasService });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Request Gass Services approved for : ${
          clientDetails.userName || clientDetails.contName
        }`
      );
    } catch (err) {
      res.status(501).json({
        token: req.user.token,
        data: "An error occured, kindly try again later",
      });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Get Service Failed for station name: ${
          clientDetails.userName || clientDetails.contName
        } : ${err}`
      );
    }
  } else {
    res
      .status(404)
      .json({ token: req.user.token, data: "Kindly provide all the fields" });
    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | User did not provide all the fields : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  }
});


front_end_service.get("/gasService/gass_service", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  const {gassId} = req.query
  const stationId = gassId;
  console.log("queyr id is for gas ", stationId);
  if (stationId) {
    try {
      const getGasService = await gassStations.findOne({
        _id: new Types.ObjectId(stationId),
      });
      res.status(200).json({ token: req.user.token, data: getGasService });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Request Gass Services approved for : ${
          clientDetails.userName || clientDetails.contName
        }`
      );
    } catch (err) {
      res.status(501).json({
        token: req.user.token,
        data: "An error occured, kindly try again later",
      });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Get Service Failed for station name: ${
          clientDetails.userName || clientDetails.contName
        } : ${err}`
      );
    }
  } else {
    res
      .status(404)
      .json({ token: req.user.token, data: "Kindly provide all the fields" });
    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | User did not provide all the fields : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  }
});

front_end_service.post("/gasService", async (req, res) => {
  console.log('came from here, gasser')
  const clientDetails = jwt.decode(req.user.token);
  const { name, service, weightRange, deliveryTime, gassStationName, image } =
    req.query;
  if ((name && service && weightRange && deliveryTime, image)) {
    const postGasServices = new gass({
      name: name,
      service: service,
      weightRange: weightRange,
      deliveryTime: deliveryTime,
      gassStationName: gassStationName,
      image: image,
    });

    try {
      const saveGasServices = (await postGasServices.save()).toObject();
      res.status(200).json({ token: req.user.token, data: saveGasServices });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Added Service Succesfuly for station name: ${
          clientDetails.userName || clientDetails.contName
        }`
      );
    } catch (err) {
      res.status(400).json({
        token: req.user.token,
        data: "An error occured, Kindly try again later",
      });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Added Service Failed for station name: ${
          clientDetails.userName || clientDetails.contName
        } : ${err}`
      );
    }
  } else {
    res
      .status(400)
      .json({ token: req.user.token, data: "Kindly provide all the fields" });
    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | User did not provide all the fields : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  }
});

front_end_service.get("/AccService", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  const { stationId } = req.query;

  if (stationId) {
    try {
      const getGasService = await Acc.find({ gassStationName: stationId });
      res.status(200).json({ token: req.user.token, data: getGasService });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Request Gass Services approved for : ${
          clientDetails.userName || clientDetails.contName
        }`
      );
    } catch (err) {
      res.status(500).json({
        token: req.user.token,
        data: "An error occured try again later",
      });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Get Service Failed for station name: ${
          clientDetails.userName || clientDetails.contName
        } : ${err}`
      );
    }
  } else {
    res
      .status(400)
      .json({ token: req.user.token, data: "Kindly provide all the fields" });
    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | User did not provide all the fields : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  }
});
front_end_service.post("/AccService", async (req, res) => {
  const clientDetails = jwt.decode(req.user.token);
  console.log('came from here, Accservice')
  const { name, service, weightRange, deliveryTime, gassStationName, image } =
    req.query;
  if ((name && service && weightRange && deliveryTime, image)) {
    const postGasServices = new Acc({
      name: name,
      service: service,
      weightRange: weightRange,
      deliveryTime: deliveryTime,
      gassStationName: gassStationName,
      image: image,
    });

    try {
      const saveGasServices = (await postGasServices.save()).toObject();
      res.status(200).json({ token: req.user.token, data: saveGasServices });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Added Service Succesfuly for station name: ${
          clientDetails.userName || clientDetails.contName
        }`
      );
    } catch (err) {
      res.status(404).json({
        token: req.user.token,
        data: "An error occured, kindly try again later",
      });
      console.log(
        `${logDate} | Front End Service | Gas Services Requests | status ${
          res.statusCode
        } : ${res.statusMessage} | Added Service Failed for station name: ${
          clientDetails.userName || clientDetails.contName
        } : ${err}`
      );
    }
  } else {
    res
      .status(404)
      .json({ token: req.user.token, data: "Kindly provide all the fields" });
    console.log(
      `${logDate} | Front End Service | Gas Services Requests | status ${
        res.statusCode
      } : ${res.statusMessage} | User did not provide all the fields : ${
        clientDetails.userName || clientDetails.contName
      }`
    );
  }
});

front_end_service.get("/images", async (req, res) => {
  try {
    const images = await getImages.find();
    res.status(200).json({ token: req.user.token, images: images });
    console.log("got messages here, ", images);
  } catch (err) {
    res
      .status(400)
      .json({ token: req.user.token, message: "something went wrong" });
    console.log("could not get images, reason, ", err.message);
  }
});
export default front_end_service;
