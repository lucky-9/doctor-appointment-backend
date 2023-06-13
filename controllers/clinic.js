// controllers/clinicController.js
const Clinic = require('../models/clinic');
exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().populate('doctors');
    res.json(clinics);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.createClinic = async (req, res) => {
  try {
    const clinic  = new Clinic(req.body);
    await clinic.save();
    res.json(clinic)
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}