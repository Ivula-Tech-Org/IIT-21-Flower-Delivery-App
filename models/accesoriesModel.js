import mongoose from "mongoose";

const AccModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    ref: "Categories",
  },
  gassStationName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GassStation",
  },
  service: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  weightRange: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Acc = mongoose.model("Accesories", AccModel);

export default Acc;
