import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;