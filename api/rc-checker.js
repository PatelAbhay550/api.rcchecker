const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();


// Middleware
app.use(cors());

// Endpoint to fetch vehicle details
app.get("/rc-details", async (req, res) => {
  const { vehicleno } = req.query;

  if (!vehicleno) {
    return res.status(400).json({ error: "Vehicle number is required." });
  }

  const url = `https://www.carinfo.app/_next/data/ZGm7SzTcPSKEGOoFIYsN0/rc-details/${vehicleno}.json?rc=${vehicleno}`;

  try {
    // Fetch data from the external API
    const response = await axios.get(url);

    // Return the fetched data to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);

    // Handle errors (e.g., vehicle number not found or external API issue)
    res.status(500).json({
      error:
        "Failed to fetch data. Please check the vehicle number or try again later.",
    });
  }
});

// Export the app for Vercel serverless deployment
module.exports = app;
