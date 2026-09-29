const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Visitor = require("./models/Visitor");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Employee Visitor Management System Backend is Running!");
});

// Add Visitor
app.post("/api/visitors", async (req, res) => {
  try {
    const visitor = new Visitor(req.body);

    const savedVisitor = await visitor.save();

    res.status(201).json(savedVisitor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add visitor",
      error: error.message,
    });
  }
});

// Get All Visitors
app.get("/api/visitors", async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ dateTime: -1 });

    res.json(visitors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
});
// Delete Visitor
app.delete("/api/visitors/:id", async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Visitor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete visitor",
      error: error.message,
    });
  }
});

const PORT = 5000;
// Update Visitor
app.put("/api/visitors/:id", async (req, res) => {
  try {
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedVisitor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update visitor",
      error: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:");
    console.log(error.message);
  });