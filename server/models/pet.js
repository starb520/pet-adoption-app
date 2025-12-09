const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // dog, cat, rabbit, etc.
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  weight: { type: Number }, // weight in pounds
  breed: { type: String },
  facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: false}, // optional for now
  description: { type: String },
  adopted: { type: Boolean, default: false },
  imageUrl: { type: String },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pet', petSchema);
