const express = require("express");
const router = express.Router();
const Incident = require("../models/incidentSchema");

router.post("/create", async (req, res) => {
  try {
    const { location, vehicleType, description } = req.body;
    const user = req.user; // Assuming you have user authentication middleware
    const newIncident = await Incident.create({
      user,
      location,
      vehicleType,
      description,
    });
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: "Error creating incident" });
  }
});

module.exports = router;
