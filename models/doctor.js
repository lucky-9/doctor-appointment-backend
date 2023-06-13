// models/doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: [{ startTime: String, endTime: String }],
  appointmentPrice: { type: Number, required: true, default: 500 },
  availableSlots: { type: Number, required: true },
  appointmentTime: { type: Number, required: true, default: 20 },
});

module.exports = mongoose.model('Doctor', doctorSchema);
