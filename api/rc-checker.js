const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors());

// Endpoint to fetch vehicle details
app.get("/api/rc-details", async (req, res) => {
  const { vehicleno } = req.query;

  if (!vehicleno) {
    return res.status(400).json({ error: "Vehicle number is required." });
  }

  const url = `https://www.carinfo.app/_next/data/yHQkhyU-grJPiMY3jWpzQ/rc-details/${vehicleno}.json?rc=${vehicleno}`;

  try {
    const response = await axios.get(url);

    if (
      response.data &&
      response.data.pageProps &&
      response.data.pageProps.rcDetailsResponse &&
      response.data.pageProps.rcDetailsResponse.data
    ) {
      const webSection =
        response.data.pageProps.rcDetailsResponse.data.webSections[0];

      const ownerName =
        webSection.messages.find((msg) => msg.title === "Owner Name")
          ?.subtitle || "Not available";

      const vehicleNumber =
        webSection.messages.find((msg) => msg.title === "Number")?.subtitle ||
        "Not available";

      const city =
        webSection.messages.find((msg) => msg.title === "City")?.subtitle ||
        "Not available";

      const state =
        webSection.messages.find((msg) => msg.title === "State")?.subtitle ||
        "Not available";

      const vehicleModel = webSection.message.subtitle || "Not available";

      return res.json({
        ownerName,
        vehicleNumber,
        city,
        state,
        vehicleModel,
      });
    }

    res.status(404).json({ error: "Vehicle details not found." });
  } catch (error) {
    console.error("Error fetching data:", error.message);

    res.status(500).json({
      error:
        "Failed to fetch data. Please check the vehicle number or try again later.",
    });
  }
});

// Export the app for Vercel
module.exports = app;
