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
    cascade: "delete",
  },
  service: {
    type: String,
    required: true,
  },
  weightRange: {
    type: [
      {
        size: String,
        price: String,
      },
    ],
  },
  deliveryTime: {
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
