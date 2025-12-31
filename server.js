const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/eventDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ---------------- CONTACT ----------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// contact route
app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ message: "Contact saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving contact" });
  }
});

// ---------------- BOOKING ----------------
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  eventType: String,
  date: String,
  message: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// booking route
app.post("/book", async (req, res) => {
  console.log("Booking received:", req.body);

  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving booking" });
  }
});

// GET all bookings (Admin)
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
