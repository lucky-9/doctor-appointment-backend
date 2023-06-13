// controllers/doctorController.js
const Doctor = require('../models/doctor');


// controllers/doctorController.js
exports.getDoctorsByClinic = async (req, res) => {
    try {
      const clinicId = req.params.clinicId;
      const doctors = await Doctor.find({ clinic: clinicId });
  
      // Calculate and update the available time slots for each doctor
      doctors.forEach((doctor) => {
        doctor.availableSlots = calculateAvailableSlots(doctor.availability);
      });
  
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
exports.getAvailableSlots = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);

    // Calculate the available time slots
    const availableSlots = calculateAvailableSlots(doctor.availability);

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function calculateAvailableSlots(availability) {
  const availableSlots = [];

  availability.forEach((slot) => {
    const startTime = new Date(`2000-01-01T${slot.startTime}`);
    const endTime = new Date(`2000-01-01T${slot.endTime}`);

    while (startTime < endTime) {
      const timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      availableSlots.push(timeString);

      startTime.setMinutes(startTime.getMinutes() + 20);
    }
  });

  return availableSlots;
}

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.createDoctor = async (req, res) => {
  try {
    const doctor  = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}