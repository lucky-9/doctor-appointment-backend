const express = require("express");
const { getAllClinics, createClinic } = require('../controllers/clinic');
const router = express.Router();

router.get("/", getAllClinics);

router.post("/", createClinic);

module.exports = router;