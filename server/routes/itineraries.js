import express from "express";
import mongoose from "mongoose";
import Itinerary from "../models/Itinerary.js";

const router = express.Router();

// GET itineraries by city
router.get("/:cityId", async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ message: "Invalid city ID" });
    }

    const itineraries = await Itinerary.find({ city: cityId }).populate("city", "name country");
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving itineraries", error: error.message });
  }
});

// POST new itinerary
router.post("/", async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: "Invalid itinerary data", error: error.message });
    }
    res.status(500).json({ message: "Error creating itinerary", error: error.message });
  }
});

export default router;