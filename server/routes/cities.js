 import express from "express";
import City from "../models/City.js";

const router = express.Router();

// GET all cities
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cities", error: error.message });
  }
});

// POST new city
router.post("/", async (req, res) => {
  try {
    const newCity = new City(req.body);
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid city data", error: error.message });
    }
    res.status(500).json({ message: "Error creating city", error: error.message });
  }
});

export default router; 