// models/clinic.js
const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
});

clinicSchema.path('doctors').default([]);
module.exports = mongoose.model('Clinic', clinicSchema);
